import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
        {description}
      </p>
      <Button className="mt-6" variant="outline" asChild>
        <Link to={buttonHref}>{buttonText}</Link>
      </Button>
    </div>
  )
}
