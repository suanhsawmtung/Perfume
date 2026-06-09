import { Button } from "@/components/ui/button"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { getProductListPageHref } from "@/lib/utils"
import { usePreferenceStore } from "@/stores/preference.store"
import { ArrowRight, RefreshCcw, ShieldCheck, Truck } from "lucide-react"
import { Link } from "react-router"

const HERO_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    subtitle: "Guaranteed",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "On-time arrival",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    subtitle: "& Exchanges",
  },
]

export function HeroSection() {
  const gender = usePreferenceStore((state) => state.gender)

  return (
    <section className="relative min-h-[94vh] lg:min-h-[91vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80"
          alt="Luxury perfume bottles"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <ContentWrapper className="relative flex min-h-[94vh] lg:min-h-[91vh] items-center">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            New Collection 2024
          </span>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
            Discover Your Signature Scent
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Immerse yourself in a world of exquisite fragrances. Each perfume is
            crafted with the finest ingredients to create unforgettable
            experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to={getProductListPageHref(gender)}>
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/blogs">Our Story</Link>
            </Button>
          </div>

          {/* <div className="mt-16 flex gap-12">
            <div>
              <p className="text-3xl font-semibold">150+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Unique Fragrances
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">50k+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Happy Customers
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">25+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Awards Won
              </p>
            </div>
          </div> */}

          {/* Hero Info Section */}
          <div className="mt-16 flex sm:justify-start justify-between flex-wrap items-center gap-x-2 sm:gap-x-12 gap-y-8 border-t border-border/40 pt-10">
            {HERO_FEATURES.map((feature, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/50 text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="space-y-0.5 sm:text-start text-center">
                  <p className="text-sm font-semibold tracking-wide">
                    {feature.title}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
