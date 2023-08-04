import primsa from "@/app/libs/prismadb";

export async function getListings() {
  try {
    const listings = await primsa.listing.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Date objects are not supported
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
