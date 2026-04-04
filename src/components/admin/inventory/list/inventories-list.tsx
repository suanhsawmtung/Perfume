import { AdminPagination } from "@/components/admin/shared/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INVENTORY_TYPES } from "@/constants/inventory.constant";
import { type InventoryItem, type InventoryType } from "@/types/inventory.type.ts";
import { FilterTags } from "../../shared/filter-tags";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

interface InventoriesListProps {
  inventories: InventoryItem[];
  total: number;
  page: number;
  activeTab: InventoryType;
  setActiveTab: (tab: InventoryType) => void;
}

export function InventoriesList({
  inventories,
  total,
  page,
  activeTab,
  setActiveTab
}: InventoriesListProps) {
  const currentPage = page || 1;
  const totalPages = total || 1;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start gap-2 px-4 md:flex-row md:justify-between md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:w-1/4 md:text-2xl">
          All Inventories
        </CardTitle>

        <div className="w-full md:w-3/4">
          <FilterTags
            allowedFilters={{
              search: true,
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="min-h-[600px] px-4 md:px-6">
         <Tabs
          defaultValue="PURCHASE"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as InventoryType)}
          className="w-full"
        >
          <ScrollArea className="w-full">
            <TabsList className="w-full space-x-2">
              {INVENTORY_TYPES.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="text-xs w-full sm:text-sm"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>


          {INVENTORY_TYPES.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-6">
              <DataTable columns={columns} data={inventories} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>

      {totalPages > 1 && (
        <CardFooter className="px-4 md:px-6">
          <div className="w-full lg:w-1/2">
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/inventories"
              className="flex justify-center lg:justify-start"
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
