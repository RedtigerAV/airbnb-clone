import getCurrentUser from "../actions/get-current-user";
import { getListings } from "../actions/get-listings";
import { EmptyState } from "../components/empty-state/empty-state";
import { PropertiesClient } from "./properties-client";

export default async function PropertiesPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (<EmptyState title="Unauthorized" subtitle="Please login" />);
    }

    const listings = await getListings({ userId: currentUser.id });

    if (!listings?.length) {
        return (<EmptyState title="No properties found" subtitle="You have no properties" />);
    }

    return (
        <PropertiesClient listings={listings} currentUser={currentUser} />
    );
}