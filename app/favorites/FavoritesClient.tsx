import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient = ({ currentUser, favorites }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Here are you favorited listings" />
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
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            actionId={favorite.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
