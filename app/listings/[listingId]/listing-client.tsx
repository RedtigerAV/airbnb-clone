"use client";

import { ListingHead } from "@/app/components/listings/listing-head";
import { ListingInfo } from "@/app/components/listings/listing-info";
import categories from "@/app/consts/categories";
import { SafeUser } from "@/app/types";
import { SafeListingWithUser } from "@/app/types/safe-listing";
import { Reservation } from "@prisma/client"
import { useMemo } from "react";

interface ListingCLientProps {
    reservations?: Reservation[];
    listing: SafeListingWithUser;
    currentUser?: SafeUser | null;
}

export function ListingClient({ listing, currentUser }: ListingCLientProps) {
    const category = useMemo(() => {
        return categories.find(({ label }) => label === listing.category);
    }, [listing.category]);

    return (
        <div className="max-w-screen-lg mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="flex flex-col gap-5">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />

                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-5">
                    <ListingInfo
                        className="col-span-4"
                        user={listing.user}
                        description={listing.description}
                        guestCount={listing.guestCount}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        category={category}
                        locationValue={listing.locationValue}
                    />
                </div>
            </div>
        </div>
    )
}