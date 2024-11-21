import getCurrentUser from "@/app/actions/get-current-user";
import getListingById from "@/app/actions/get-listing-by-id";
import { EmptyState } from "@/app/components/empty-state/empty-state";
import { ListingClient } from "./listing-client";
import { getReservationsByListingId } from "@/app/actions/get-reservations-by-listing-id";

interface IParams {
    listingId?: string;
}

// Since this is a server component, we cannot use hooks like useRouter to access params
// But, we still can access params by using "params" object
export default async function ListingPage({ params }: { params: IParams }) {
    const listing = await getListingById({ listingId: params.listingId });
    const currentUser = await getCurrentUser();
    const reservations = await getReservationsByListingId({ listingId: params.listingId })

    if (!listing) {
        return (
            <EmptyState />
        )
    }

    return (
        <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    )
}