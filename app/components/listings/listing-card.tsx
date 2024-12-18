'use client';

import { useCountries } from "@/app/hooks/use-countries";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import Button from "../button/button";
import { HeartButton } from "../heart-button/heart-button";
import { SafeListing } from "@/app/types/safe-listing";
import { SafeReservation } from "@/app/types/safe-reservation";

interface ListingCardProps {
    listing: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export function ListingCard({
    listing,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}: ListingCardProps) {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(listing.locationValue);
    const handleCancel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [disabled, actionId, onAction]);
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return listing.price;
    }, [reservation, listing]);
    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`listings/${listing.id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                <Image fill alt="Listing" src={listing.imageSrc} className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    " />
                <div className="absolute top-3 right-3">
                    <HeartButton listingId={listing.id} currentUser={currentUser} />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || listing.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">night</div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
            )}
        </div>
    )
}