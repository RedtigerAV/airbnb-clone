import getCurrentUser from "../actions/get-current-user";
import { getReservations } from "../actions/get-reservations";
import { EmptyState } from "../components/empty-state/empty-state";
import { TripsClient } from "./trips-client";

export default async function Trips() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (<EmptyState title="Unauthorized" subtitle="Please login" />);
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (!reservations?.length) {
        return (<EmptyState title="No trips found" subtitle="You haven't reserved any trips" />);
    }

    return (
        <TripsClient reservations={reservations} currentUser={currentUser} />
    );
}