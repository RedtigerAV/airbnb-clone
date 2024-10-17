import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { withAuth } from "@/app/libs/with-auth";
import { AuthenticatedRequest } from "@/app/types";

export const POST = withAuth(async ({ request, currentUser }: AuthenticatedRequest) => {
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;
    const fullListing = {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    };

    Object.values(fullListing).forEach(value => {
        if (!value) {
            return NextResponse.error();
        }
    });

    if (!location.value) {
        return NextResponse.error();
    }

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
});
