"use client";
import { useMemo } from "react";
import { Reservation } from "@prisma/client";

import { SafeUser, SafeListing } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  // Get access to icon and description for category
  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
          >
            <ListingInfo 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
