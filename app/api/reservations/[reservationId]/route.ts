import { withAuth } from "@/app/libs/with-auth";
import { AuthenticatedRequest } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams {
    reservationId?: string
}

export const DELETE = withAuth(
    async (
        { request, currentUser }: AuthenticatedRequest,
        { params }: { params: IParams }
    ) => {
        const { reservationId } = params;

        if (!reservationId || typeof reservationId !== 'string') {
            return NextResponse.json({ error: `Reservation with ${reservationId} id not found` }, { status: 404 });
        }

        try {
            const reservation = await prisma.reservation.deleteMany({
                where: {
                    id: reservationId,
                    // Allow the user to cancel their own reservations
                    // OR the landlord to cancel reservations made at their property 
                    OR: [
                        // Either the creator of the reservation
                        { userId: currentUser.id },
                        // Or the creator of the listing that the reservation is on
                        { listing: { userId: currentUser.id } }
                    ]
                }
            });

            return NextResponse.json(reservation);
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
});