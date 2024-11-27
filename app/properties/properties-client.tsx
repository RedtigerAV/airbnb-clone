"use client";

import { useRouter } from "next/navigation";
import Container from "../components/container/container";
import Heading from "../components/heading/heading";
import { SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../components/listings/listing-card";
import { SafeListing } from "../types/safe-listing";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

export function PropertiesClient({ listings, currentUser }: PropertiesClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing deleted');
                router.refresh();
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''))
    }, [router, setDeletingId]);

    return (
        <Container>
            <Heading title="Properties" subtitle="List of your properties" />

            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                ">
                {listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        currentUser={currentUser}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                    />
                ))}
            </div>
        </Container>
    )
}