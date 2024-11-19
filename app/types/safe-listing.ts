import { Listing } from "@prisma/client";
import { SafeUser } from "./safe-user";

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };
export type SafeListingWithUser = SafeListing & { user: SafeUser };