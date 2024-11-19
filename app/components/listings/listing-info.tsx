"use client";

import { Category } from "@/app/consts/categories";
import { useCountries } from "@/app/hooks/use-countries";
import { SafeUser } from "@/app/types"
import Avatar from "../avatar/avatar";
import { pluralize } from "@/app/helpers/pluralize";
import { ListingCategory } from "./listing-category";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../map/map'), {
    ssr: false,
    loading: () => (
        <div className="h-[35vh] w-full rounded-lg flex flex-col justify-center items-center">
            <span>Loading...</span>
        </div>
    )
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category?: Category;
    locationValue: string;
    className?: string;
}

export function ListingInfo({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
    className
}: ListingInfoProps) {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Hosted by {user.name}</div>
                <Avatar src={user.image} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div> {pluralize(guestCount, 'guest', 'guests')} </div>
                <div> {pluralize(roomCount, 'room', 'rooms')} </div>
                <div> {pluralize(bathroomCount, 'bathroom', 'bathrooms')} </div>
            </div>

            <hr />

            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description} />
            )}

            <hr />

            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>

            <hr />

            <Map center={coordinates} />
        </div>
    )
}