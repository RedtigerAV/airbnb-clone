import prisma from '@/app/libs/prismadb';
import { SafeReservation, SafeReservationWithListing } from "../types/safe-reservation";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string
}

export async function getReservationsByListingId({ listingId, userId, authorId }: IParams): Promise<SafeReservationWithListing[]> {
    try {
        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: { listing: true },
            orderBy: { createdAt: 'desc' }
        });

        if (!reservations) {
            return [];
        }

        return reservations.map(reservation => ({
            ...reservation,
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            createdAt: reservation.createdAt.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));
    } catch (error: any) {
        throw new Error(error);
    }
}