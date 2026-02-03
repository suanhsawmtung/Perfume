import { BrandForm } from "@/components/admin/brand/form/brand-form";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useNavigate } from "react-router";

const AdminBrandCreateDialog = () => {
  const navigate = useNavigate();

  return (
    <DialogWrapper
      title="Create Brand"
      close={() => navigate("/admin/brands")}
      onOpenChange={() => navigate("/admin/brands")}
      open={true}
    >
      <BrandForm cancelUrl="/admin/brands" />
    </DialogWrapper>
  );
};

export default AdminBrandCreateDialog;
