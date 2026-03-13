import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router";

interface ProductRatingTabsProps {
  activeTab: "detailed" | "summary";
}

export const ProductRatingTabs = ({ activeTab }: ProductRatingTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (value: string) => {
    // Determine target path
    const isSummaryTarget = value === "summary";
    const targetPath = isSummaryTarget 
      ? "/admin/product-ratings/summary" 
      : "/admin/product-ratings";

    // If already on the target path, do nothing
    if (location.pathname === targetPath) return;

    // Navigate to the target path without any search parameters as requested
    navigate(targetPath);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
      <TabsList className="grid w-full grid-cols-2 sm:w-[300px]">
        <TabsTrigger value="detailed">Detailed</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
