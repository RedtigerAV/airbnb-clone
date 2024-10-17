import { SafeUser } from "./safe-user";

export interface AuthenticatedRequest {
    request: Request;
    currentUser: SafeUser;
}