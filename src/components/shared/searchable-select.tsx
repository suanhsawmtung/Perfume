import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

interface SearchableSelectProps<T> {
  items: T[];
  onValueChange: (value: T | null) => void;
  disabled?: boolean;
  placeholder?: string;
  itemToStringValue: (item: T) => string;
  paramKey?: string;
  debounceMs?: number;
  selectedValue?: string | null;
  emptyMessage?: string;
}

export function SearchableSelect<T extends { value: string; label: string }>({
  items,
  onValueChange,
  disabled,
  placeholder = "Select an item...",
  itemToStringValue,
  paramKey = "search",
  debounceMs = 300,
  selectedValue,
  emptyMessage = "No items found"
}: SearchableSelectProps<T>) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialValue = searchParams.get(paramKey) || "";

  const [search, setSearch] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const updateUrl = (newValue: string) => {
    const newSearchParams = new URLSearchParams(location.search);

    if (newValue.trim()) {
      newSearchParams.set(paramKey, newValue.trim());
    } else {
      newSearchParams.delete(paramKey);
    }

    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
    });
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounce
    timeoutRef.current = setTimeout(() => {
      updateUrl(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setSearch("");
    updateUrl("");
  }; 

  return (
    <Combobox 
      items={items}
      itemToStringValue={itemToStringValue}
      onValueChange={(value) => {
        onValueChange(value);
        handleClear();
      }}
      disabled={disabled}
    >
      <ComboboxInput 
        onChange={handleChange} 
        placeholder={placeholder} 
        {...(!selectedValue && { value: search })}
        showClear 
        disabled={disabled}
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}