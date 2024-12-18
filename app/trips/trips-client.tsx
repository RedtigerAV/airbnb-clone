"use client";

import { useRouter } from "next/navigation";
import Container from "../components/container/container";
import Heading from "../components/heading/heading";
import { SafeUser } from "../types";
import { SafeReservationWithListing } from "../types/safe-reservation"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../components/listings/listing-card";

interface TripsClientProps {
    reservations: SafeReservationWithListing[];
    currentUser?: SafeUser | null;
}

export function TripsClient({ reservations, currentUser }: TripsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''))
    }, [router, setDeletingId]);

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />

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
                {reservations.map(reservation => (
                    <ListingCard
                        key={reservation.id}
                        listing={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        currentUser={currentUser}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                    />
                ))}
            </div>
        </Container>
    )
}