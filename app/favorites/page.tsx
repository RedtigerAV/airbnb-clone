import getCurrentUser from "../actions/get-current-user";
import { getFavoriteListings } from "../actions/get-favorite-listings";
import { EmptyState } from "../components/empty-state/empty-state";
import { FavoritesClient } from "./favorites-client";

export default async function FavoritesPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const favorites = await getFavoriteListings();

    if (!favorites?.length) {
        return <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings" />;
    }

    return <FavoritesClient listings={favorites} currentUser={currentUser} />
}