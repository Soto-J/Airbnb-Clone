import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
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
