import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useNavigate, useParams } from "react-router";

const AdminTypeDeleteDialog = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  if (!slug) {
    throw new Response("Type slug is required", { status: 400 });
  }

  // const { data: type } = useType(slug);

  return (
    <DialogWrapper
      title="Delete Type"
      close={() => navigate("/admin/types")}
      onOpenChange={() => navigate("/admin/types")}
      open={true}
    >
      {/* <DeleteTypeDialog type={type} cancelUrl="/admin/types" /> */}
      <span>hello world</span>
    </DialogWrapper>
  );
};

export default AdminTypeDeleteDialog;
