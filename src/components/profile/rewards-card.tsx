import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice, toTitleCase } from "@/lib/utils"

interface RewardsCardProps {
  rewards: {
    currentPoints: number
    currentGrade: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE"
    progress: number
    range: { start: number; end: number }
    toNextGrade: number
    totalOrders: number
    totalSpent: number
    totalReviews: number
  }
}

export function RewardsCard({ rewards }: RewardsCardProps) {
  const stats = [
    { label: "Total Orders", value: rewards.totalOrders },
    { label: "Total Spent", value: formatPrice(rewards.totalSpent) },
    { label: "Reviews Written", value: rewards.totalReviews },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-semibold">{rewards.currentPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Points available</p>
          </div>
          <div className="text-right">
            {rewards.currentGrade !== "PLATINUM" ? (
              <>
                <p className="text-sm font-medium">
                  {rewards.toNextGrade.toLocaleString()} points to {toTitleCase(
                    rewards.currentGrade === "BRONZE"
                      ? "SILVER"
                      : rewards.currentGrade === "SILVER"
                      ? "GOLD"
                      : "PLATINUM"
                  )}
                </p>
                <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-foreground"
                    style={{ width: `${rewards.progress}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-sm font-medium">You are at the highest tier!</p>
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
