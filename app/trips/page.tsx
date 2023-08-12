import getReservationsByValue from "../actions/getReservationsByValue";
import getCurrentUser from "../actions/getCurrentUser";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  // user is not logged in
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  const reservations = await getReservationsByValue({ userId: currentUser.id });

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
