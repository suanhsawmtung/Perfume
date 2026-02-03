import { DeleteBrandDialog } from "@/components/admin/brand/actions/delete-brand-dialog";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useBrand } from "@/services/brand/queries/useGetBrand";
import { useNavigate, useParams } from "react-router";

const AdminBrandDeleteDialog = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  if (!slug) {
    throw new Response("Brand slug is required", { status: 400 });
  }

  const { data: brand } = useBrand(slug);

  return (
    <DialogWrapper
      title="Delete Brand"
      close={() => navigate("/admin/brands")}
      onOpenChange={() => navigate("/admin/brands")}
      open={true}
    >
      <DeleteBrandDialog brand={brand} cancelUrl="/admin/brands" />
    </DialogWrapper>
  );
};

export default AdminBrandDeleteDialog;
