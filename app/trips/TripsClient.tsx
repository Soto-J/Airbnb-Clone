import { SafeReservation, SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
    </Container>
  );
};

export default TripsClient;
