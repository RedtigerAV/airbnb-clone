import { Listing } from "@prisma/client";
import { getListings } from "./actions/get-listings";
import Container from "./components/container/container";
import { EmptyState } from "./components/empty-state/empty-state";
import { ListingCard } from "./components/listings/listing-card";
import getCurrentUser from "./actions/get-current-user";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {listings.map((listing: Listing) => (
          <ListingCard key={listing.id} currentUser={currentUser} listing={listing} />
        ))}
      </div>
    </Container>
  );
}
