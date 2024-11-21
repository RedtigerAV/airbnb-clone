import { withAuth } from "@/app/libs/with-auth";
import { AuthenticatedRequest } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export const POST = withAuth(async ({ request, currentUser }: AuthenticatedRequest) => {
    const { totalPrice, startDate, endDate, listingId } = await request.json();
    const reservation = {totalPrice, startDate, endDate, listingId};

    Object.values(reservation).forEach(value => {
        if (!value) {
            return NextResponse.error();
        }
    });

    const newReservation = await prisma.listing.update({
        where: { id: listingId },
        data: {
            reservations: {
                create: {
                    totalPrice: parseInt(totalPrice, 10),
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    userId: currentUser.id
                }
            }
        }
    });

    return NextResponse.json(newReservation);
});