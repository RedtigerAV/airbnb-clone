import { Reservation } from "@prisma/client";
import { SafeListing } from "./safe-listing";

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | 'startDate' | 'endDate'
> & {
    createdAt: string,
    startDate: string,
    endDate: string
};

export type SafeReservationWithListing = SafeReservation & { listing: SafeListing };