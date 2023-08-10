import { Listing, Reservation, User } from "@prisma/client";

// Remove createdAt from Listing and add createdAt as string
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
