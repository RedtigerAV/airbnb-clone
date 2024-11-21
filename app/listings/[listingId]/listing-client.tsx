"use client";

import { ListingHead } from "@/app/components/listings/listing-head";
import { ListingInfo } from "@/app/components/listings/listing-info";
import { ListingReservation } from "@/app/components/listings/listing-reservation";
import categories from "@/app/consts/categories";
import useLoginModal from "@/app/hooks/use-login-modal";
import { SafeUser } from "@/app/types";
import { SafeListingWithUser } from "@/app/types/safe-listing";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Range } from 'react-date-range';
import { SafeReservation } from "@/app/types/safe-reservation";

const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingCLientProps {
    reservations: SafeReservation[];
    listing: SafeListingWithUser;
    currentUser?: SafeUser | null;
}

export function ListingClient({ listing, reservations = [], currentUser }: ListingCLientProps) {
    const loginModal = useLoginModal();
    const router = useRouter();
    const category = useMemo(() => {
        return categories.find(({ label }) => label === listing.category);
    }, [listing.category]);
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                // Redirect to /trips
                router.refresh();
            })
            .catch(() => toast.error('Something is wrong!'))
            .finally(() => setIsLoading(false))

    }, [totalPrice, dateRange, listing, router, currentUser, loginModal, setIsLoading, setDateRange]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const daysCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (daysCount && listing.price) {
                setTotalPrice(daysCount * listing.price);
            } else if (listing.price) {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price, setTotalPrice]);

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

                    <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        dateRange={dateRange}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                        onSubmit={onCreateReservation}
                        onChangeDate={(value) => setDateRange(value)}
                        className="order-first mb-10 md:order-last md:col-span-3"
                    />
                </div>
            </div>
        </div>
    )
}