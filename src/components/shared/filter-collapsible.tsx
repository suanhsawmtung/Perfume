import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterCollapsibleProps {
  title: string;
  options: FilterOption[];
  selectedValue: string | null;
  onToggle: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function FilterCollapsible({
  title,
  options,
  selectedValue,
  onToggle,
  open,
  onOpenChange,
  className,
}: FilterCollapsibleProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors">
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pt-2">
        <div className="space-y-3">
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center gap-3">
              <Checkbox
                id={`${title.toLowerCase()}-${opt.value}`}
                checked={selectedValue === opt.value}
                onCheckedChange={() => onToggle(opt.value)}
              />
              <Label
                htmlFor={`${title.toLowerCase()}-${opt.value}`}
                className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
