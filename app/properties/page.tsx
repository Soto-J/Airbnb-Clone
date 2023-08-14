import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { IListingParams, getListings } from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    <ClientOnly>
      <EmptyState
        title="No properties found"
        subtitle="Looks like you no properties"
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
