"use client"

import { Button } from "@/components/ui/button"
import { reviews } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { ReviewCard } from "../shared/review-card"
import ContentWrapper from "../wrapper/content-wrapper"

export function ReviewsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20">
      <ContentWrapper>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Testimonials
            </span>
            <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-[350px] flex-shrink-0 snap-start md:w-[400px]"
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </ContentWrapper>
    </section>
  )
}
