import { InventoryForm } from "@/components/admin/inventory/form/inventory-form";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { BackButton } from "@/components/admin/shared/back-button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminInventoryCreatePage() {
  return (
    <section className="w-full">
      <AdminHeaderSection title="Create Inventory Record" />

      <div className="space-y-5">
        <BackButton to="/admin/inventories" />
        <Card className="w-full">
          <CardContent className="flex flex-col gap-6 py-6">
            <InventoryForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
