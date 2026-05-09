import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

interface HomeSectionHeaderProps {
  title: string
  subtitle: string
  linkHref?: string
  linkLabel?: string
}

export function HomeSectionHeader({
  title,
  subtitle,
  linkHref,
  linkLabel,
}: HomeSectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {subtitle}
        </span>
        <h2 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link
          to={linkHref}
          className="hidden items-center gap-2 text-sm font-medium hover:underline md:flex"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
