import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        favorites={favoriteListings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default page;
