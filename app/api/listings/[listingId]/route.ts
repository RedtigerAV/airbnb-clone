import { withAuth } from "@/app/libs/with-auth";
import { AuthenticatedRequest } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export const DELETE = withAuth(async (
    { currentUser }: AuthenticatedRequest,
    { params }: { params: IParams }
) => {
    try {
        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const listing = await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        });

        return NextResponse.json(listing);
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 })
    }
});