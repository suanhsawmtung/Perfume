import { SearchInput } from "@/components/shared/search-input"
import { Button } from "@/components/ui/button"
import { NoWishlistsFoundCard } from "@/components/wishlist/no-wishlists-found-card"
import { WishlistCard } from "@/components/wishlist/wishlist-card"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { DEFAULT_LIMIT } from "@/services/wishlist/api"
import { useGetInfiniteWishlists } from "@/services/wishlist/queries/useGetInfiniteWishlists"
import { useAuthStore } from "@/stores/auth.store"
import { ArrowLeft } from "lucide-react"
import { Link, useSearchParams } from "react-router"

export default function WishlistPage() {
  const [searchParams] = useSearchParams()
  const user = useAuthStore.getState().authUser;

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const search = searchParams.get("search") || undefined

  const params = {
    search,
    limit: DEFAULT_LIMIT,
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteWishlists(user.id, params)

  const wishlists = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <Link
              to="/profile"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
            <h1 className="mt-2 font-serif text-3xl font-medium">My Wishlist</h1>
            {wishlists.length > 0 && (
              <p className="text-muted-foreground">
                Showing {wishlists.length} of {data?.pages[0].totalCount} saved items
              </p>
            )}
          </div>

          <SearchInput
            placeholder="Search your wishlist..."
            className="w-full md:w-72 h-10"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : wishlists.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {wishlists.map((wishlist) => (
              <WishlistCard key={wishlist.id} wishlist={wishlist} />
            ))}
          </div>
        ) : (
          <NoWishlistsFoundCard />
        )}

        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              variant="outline"
              className="w-full max-w-xs"
            >
              {isFetchingNextPage ? "Loading more..." : "Load more orders"}
            </Button>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}
