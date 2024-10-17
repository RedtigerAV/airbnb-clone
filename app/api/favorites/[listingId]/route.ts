import { withAuth } from "@/app/libs/with-auth";
import { AuthenticatedRequest } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export const POST = withAuth(
    async function(
        { request, currentUser }: AuthenticatedRequest,
        { params }: { params: IParams }
    ) {
        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const favoriteIds = [...(currentUser.favoriteIds || []), listingId];
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user.favoriteIds);
    }
);

export const DELETE = withAuth(
    async function(
        { request, currentUser }: AuthenticatedRequest,
        { params }: { params: IParams }
    ) {
        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const favoriteIds = (currentUser.favoriteIds || []).filter(id => id !== listingId);
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user.favoriteIds);
    }
)