import { NextResponse } from "next/server";
import getCurrentUser from "../actions/get-current-user"
import { AuthenticatedRequest } from "../types";

export function withAuth(handler: Function) {
    return async function (request: Request, ...args: any) {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Attach currentUser to the request object (custom property)
        // Since Request object is immutable, you'd handle this in a custom object.
        const context: AuthenticatedRequest = {
            request,
            currentUser
        }

        return handler(context, ...args);
    }
}