"use client";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "react-hot-toast";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listing/ListingCard";

interface PropertiesClient {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClient) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Property deleted");
        router.refresh();
      })
      .catch((error: any) => toast.error(error?.response?.data?.error))
      .finally(() => setDeletingId(""));
  }, [router]);

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="Here is a list of your properties"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel="Delete property"
            onAction={onDelete}
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
