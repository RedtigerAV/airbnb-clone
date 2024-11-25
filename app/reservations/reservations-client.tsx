"use client";

import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import { SafeReservationWithListing } from "../types/safe-reservation"
import Container from "../components/container/container";
import Heading from "../components/heading/heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../components/listings/listing-card";

interface ReservationsClientProps {
    reservations: SafeReservationWithListing[];
    currentUser?: SafeUser | null;
}

export function ReservationsClient({ reservations, currentUser }: ReservationsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch(() => toast.error('Something went router'))
            .finally(() => setDeletingId(''))
    }, [router, setDeletingId]);

    return (
        <Container>
            <Heading title="Reservations" subtitle="Bookings on your properties" />

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
                "
            >
                {reservations.map(reservation =>
                    <ListingCard
                        key={reservation.id}
                        listing={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                )}
            </div>
        </Container>
    )
}