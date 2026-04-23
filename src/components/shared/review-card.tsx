import { cn } from "@/lib/utils"
import { Quote, Star } from "lucide-react"

interface ReviewCardProps {
  name: string
  rating: number
  comment: string
  product: string
  date: string
  verified?: boolean
}

export function ReviewCard({
  name,
  rating,
  comment,
  product,
  date,
  verified = false,
}: ReviewCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border/50 bg-card p-6">
      <Quote className="h-8 w-8 text-muted-foreground/30" />
      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-foreground text-foreground"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {comment}
      </p>
      <div className="mt-6 border-t border-border/50 pt-4">
        <p className="text-xs text-muted-foreground">{product}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {verified && (
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                Verified
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
    </div>
  )
}
