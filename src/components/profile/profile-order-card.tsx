import { formatDate, formatPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { EmptyState } from "@/components/profile/empty-state"
import { Package } from "lucide-react"

type ProfileOrder = {
  id: number
  code: string
  createdAt: string | Date
  totalPrice: number
  totalQuantity: number
}

interface OrderItemProps {
  order: ProfileOrder
}

function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-secondary/5">
      <div>
        <p className="font-medium">#{order.code}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(order.createdAt)} &middot; {order.totalQuantity} item
          {order.totalQuantity > 1 ? "s" : ""}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatPrice(order.totalPrice)}</p>
      </div>
    </div>
  )
}

export function ProfileOrderCard({
  orders
}: {
  orders: ProfileOrder[]
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/profile/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="You haven't placed any orders yet. Start your fragrance journey today."
            buttonText="Start Shopping"
            buttonHref="/products"
          />
        )}
      </CardContent>
    </Card>
  )
}
