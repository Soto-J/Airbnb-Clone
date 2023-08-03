"use client";
import React, { useCallback, MouseEvent, useMemo } from "react";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { TfiMoney } from "react-icons/tfi";
import Button from "../Button";

interface ListingCardProps {
  key: string;
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  key,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation]);

  // Format reservation dates
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    console.log(start, end);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div
          className="
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            sizes="100%"
            src={data.imageSrc}
            alt={data.title}
            className="
              h-full
              w-full
              object-cover
              transition
              group-hover:scale-110
            "
          />

          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div>
          <div className="text-lg font-semibold">
            {location?.region}, {location?.label}
          </div>

          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>

          <div className="flex items-center">
            <TfiMoney size={16} className="" />
            <div className="font-semibold">{price}</div>
            {!reservation && <div className="font-llight ml-1">night</div>}
          </div>
        </div>

        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
