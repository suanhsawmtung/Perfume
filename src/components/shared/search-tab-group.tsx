import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";

interface SearchTabGroupProps {
    options: { label: string; value: string }[];
    paramKey?: string; // The search param key (e.g., "status", "filter", "sort")
    defaultValue?: string; // The default selected option value
    className?: string;
}

export function SearchTabGroup({
    options,
    paramKey = "filter",
    defaultValue,
    className,
}: SearchTabGroupProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Current value: URL param → defaultValue → first option
    const currentParamValue = searchParams.get(paramKey);
    const value = currentParamValue ?? defaultValue ?? options[0]?.value ?? "";

    const updateUrl = (newValue: string) => {
        const newSearchParams = new URLSearchParams(searchParams);

        // If the new value matches the default, remove it from the URL to keep URLs clean
        if (newValue === defaultValue || newValue === "") {
            newSearchParams.delete(paramKey);
        } else {
            newSearchParams.set(paramKey, newValue);
        }

        // Reset page to 1 when filtering (if page param exists)
        if (newSearchParams.has("page")) {
            newSearchParams.delete("page");
        }

        setSearchParams(newSearchParams, { replace: true });
    };

    return (
        <div
            className={cn(
                "inline-flex items-center border-b border-border",
                className
            )}
        >
            {options.map((option) => {
                const isActive = option.value === value
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => updateUrl(option.value)}
                        className={cn(
                            "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            "disabled:pointer-events-none disabled:opacity-50",
                            isActive
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {option.label}
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                        )}
                    </button>
                )
            })}
        </div>
    );
}