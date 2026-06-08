import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

export function StarRating({
    rating,
    interactive = false,
    onChange,
}: {
    rating: number
    interactive?: boolean
    onChange?: (value: number) => void
}) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1
                const filled = value <= rating
                if (interactive) {
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onChange?.(value)}
                            className="rounded-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                        >
                            <Star
                                className={cn(
                                    "h-5 w-5",
                                    filled ? "fill-foreground text-foreground" : "fill-muted text-muted"
                                )}
                            />
                        </button>
                    )
                }
                return (
                    <Star
                        key={i}
                        className={cn(
                            "h-4 w-4",
                            filled ? "fill-foreground text-foreground" : "fill-muted text-muted"
                        )}
                    />
                )
            })}
        </div>
    )
}