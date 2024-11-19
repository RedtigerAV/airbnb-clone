"use client";

import { SafeUser } from "@/app/types";
import Heading from "../heading/heading";
import { useCountries } from "@/app/hooks/use-countries";
import Image from "next/image";
import { HeartButton } from "../heart-button/heart-button";

interface ListingHeadProps {
    id: string;
    title: string;
    imageSrc: string;
    locationValue: string;
    currentUser?: SafeUser | null;
}

export function ListingHead({
    title,
    id,
    imageSrc,
    locationValue,
    currentUser
}: ListingHeadProps) {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading title={title} subtitle={`${location?.region} ${location?.region}`} />

            <div className="w-full h-[50vh] relative overflow-hidden rounded-xl">
                <Image className="object-cover w-full" src={imageSrc} alt="Listing Picture" fill />

                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
}