import { DeleteUserDialog } from "@/components/admin/user/actions/delete-user-dialog";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { useGetUser } from "@/services/user/queries/useGetUser";
import { useLocation, useNavigate, useParams } from "react-router";

const AdminUserDeleteDialog = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();

  if (!username) {
    throw new Response("User username is required", { status: 400 });
  }

  const { data: user } = useGetUser(username);

  return (
    <DialogWrapper
      title="Ban User"
      close={() => navigate(location.state?.from || "/admin/users")}
      onOpenChange={() => navigate(location.state?.from || "/admin/users")}
      open={true}
    >
      <DeleteUserDialog user={user} cancelUrl={location.state?.from || "/admin/users"} />
    </DialogWrapper>
  );
};

export default AdminUserDeleteDialog;
