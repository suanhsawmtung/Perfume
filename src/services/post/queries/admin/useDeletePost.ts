import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deletePost } from "../../api";
import { postQueryKeys } from "../../key";
import { homeQueryKeys } from "@/services/home/key";

export const useDeletePostMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (params: { slug: string }) => deletePost(params),
    onSuccess: (_, variables) => {
      // Remove the deleted post from cache
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.admin.detail(variables.slug),
      });

      // Invalidate post list queries to refetch
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: homeQueryKeys.all,
      });

      toast.success("Post deleted successfully!");
      navigate("/admin/posts");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete post"
      );
    },
  });
};
