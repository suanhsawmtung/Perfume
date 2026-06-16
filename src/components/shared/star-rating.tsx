import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

export function StarRatingInput({
    rating,
    disabled,
    onChange,
}: {
    rating: number
    disabled?: boolean
    onChange?: (value: number) => void
}) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                const filled = value <= rating;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onChange?.(value)}
                        className="rounded-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                        disabled={disabled}
                    >
                        <Star
                            className={cn(
                                "h-5 w-5",
                                filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    )
}