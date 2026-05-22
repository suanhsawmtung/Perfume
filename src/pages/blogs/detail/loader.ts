import { ensurePost } from "@/services/post/queries/useGetPost";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
    const { slug } = params;

    if (!slug) {
        throw new Response("Post slug is required", { status: 400 });
    }

    try {
        await ensurePost(slug);

        return { slug };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Response("Post not found", { status: 404 });
        }
        throw error;
    }
}
