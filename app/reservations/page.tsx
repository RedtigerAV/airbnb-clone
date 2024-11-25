import getCurrentUser from "../actions/get-current-user"
import { getReservations } from "../actions/get-reservations";
import { EmptyState } from "../components/empty-state/empty-state";
import { ReservationsClient } from "./reservations-client";

export default async function ReservationsPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (!reservations?.length) {
        return <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties!" />
    }

    return (
        <ReservationsClient reservations={reservations} currentUser={currentUser} />
    )
}