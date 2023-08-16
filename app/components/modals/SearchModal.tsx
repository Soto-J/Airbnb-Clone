"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import { CountrySelectValue } from "../inputs/CountrySelect";

import Modal from "./Modal";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import Heading from "../Heading";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  // COME BACK TO
  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    if (!params) {
      return;
    }

    console.log(qs.parse(params.toString()));

    let currentQeury = {};

    if (params) {
      currentQeury = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQeury,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    searchModal,
    onNext,
    step,
    router,
    dateRange,
    params,
    bathroomCount,
    roomCount,
    guestCount,
    location,
  ]);

  const actionLabel = useMemo(() => {
    // INFO === last step
    return step === STEPS.INFO ? "Search" : "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // LOCATION === first step
    return step === STEPS.LOCATION && "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location"
      />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onSubmit={searchModal.onOpen}
      onClose={searchModal.onClose}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
