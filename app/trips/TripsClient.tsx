"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";
import { toast } from "react-hot-toast";
import axios from "axios";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
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
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel Reservation"
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
