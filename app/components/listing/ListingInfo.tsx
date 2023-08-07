"use client";

import { IconType } from "react-icons";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import useCountries from "@/app/hooks/useCountries";

import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;

  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const locaticoordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            flex
            items-center 
            gap-2
            text-xl
            font-semibold
          "
        >
          <div>Hosted by: {user?.name}</div>
          <Avatar src={user.image} />
        </div>
        <div
          className="
            flex
            items-center
            gap-4
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
    </div>
  );
};

export default ListingInfo;
