import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

/** This is not an API call. This is a direct communication to the database through server components */
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }        

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        return !!currentUser ? currentUser : null;
    } catch (error: any) {
        return null;
    }
}