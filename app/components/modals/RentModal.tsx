"use client";
import React, { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal";
import CountrySelect from "../inputs/CountrySelect";
import CategoryInput from "../CategoryInput";
import Heading from "../Heading";
import Modal from "./Modal";
import Map from "../Map";
import { categories } from "../navbar/Categories";
import { FieldValues, set, useForm } from "react-hook-form";

enum PAGES {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [page, setPage] = useState(PAGES.CATEGORY);

  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setPage((prev) => prev - 1);
  };

  const onNext = () => {
    setPage((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (page === PAGES.PRICE) {
      return "Create";
    }

    return "Next";
  }, [page]);

  const secondaryActionLabel = useMemo(() => {
    if (page === PAGES.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [page]);

  // Depending on the page, we want to render different content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div>
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
      </div>
      <div
        className="
          grid 
          max-h-[50vh]
          grid-cols-1
          gap-3
          overflow-y-auto
          md:grid-cols-2    
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(label) => setCustomValue("category", label)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // location page
  if (page === PAGES.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map />
      </div>
    );
  }

  // info page
  if (page === PAGES.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Info" subtitle="Help guests find you!" />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={page === PAGES.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
