import Container from "../components/container/container";
import Heading from "../components/heading/heading";
import { ListingCard } from "../components/listings/listing-card";
import { SafeUser } from "../types";
import { SafeListing } from "../types/safe-listing";

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

export function FavoritesClient({ listings, currentUser }: FavoritesClientProps) {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you have favorited!" />

            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8    
                "
            >
                {listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}