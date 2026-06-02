import ContentWrapper from "@/components/wrapper/content-wrapper"
import { useGetProfile } from "@/services/profile/queries/useGetProfile"
import { formatDate, formatImagePath, formatName, toTitleCase } from "@/lib/utils"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ProfileWishlistCard } from "@/components/profile/profile-wishlist-card"
import { RewardsCard } from "@/components/profile/rewards-card"
import { ProfileOrderCard } from "@/components/order/profile-order-card"

export default function ProfilePage() {
  const { data: profile } = useGetProfile()
  const wishlistProducts = profile.wishlist.slice(0, 3)

  const displayName = formatName({
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
  })

  const avatarUrl = profile.image
    ? formatImagePath(profile.image, "user")
    : null

  const memberSince = formatDate(profile.createdAt)
  const tier = `${toTitleCase(profile.rewards.currentGrade)} Member`

  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileSidebar
              email={profile.email}
              displayName={displayName}
              avatarUrl={avatarUrl}
              memberSince={memberSince}
              tier={tier}
            />
          </div>

          <div className="space-y-8 lg:col-span-2">
            <ProfileOrderCard orders={profile.orders} />

            <ProfileWishlistCard wishlistProducts={wishlistProducts} />

            {profile.rewards.currentPoints > 0 && (
              <RewardsCard rewards={profile.rewards} />
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
