import type { ReviewType } from "@/types/review.type";
import { useUpdateReview } from "@/services/review/queries/useUpdateReview";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewUpdateFormSchema, type ReviewUpdateFormValues } from "@/validations/review.validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EditReviewFormProps {
    review: ReviewType;
    setEditingId: (id: number | null) => void;
}

export function EditReviewForm({
    review,
    setEditingId,
}: EditReviewFormProps) {
    const updateReviewMutation = useUpdateReview();
    const isSubmitting = updateReviewMutation.isPending;

    const form = useForm<ReviewUpdateFormValues>({
        resolver: zodResolver(ReviewUpdateFormSchema),
        defaultValues: {
            rating: review.rating,
            content: review.content ?? "",
        },
    });

    const onSubmit = (values: ReviewUpdateFormValues) => {
        if (review.isPublish) {
            toast.error("You cannot edit published reviews.");
            return;
        }
        updateReviewMutation.mutate({ id: review.id, data: values }, {
            onSuccess: () => {
                setEditingId(null)
            },
        });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <StarRating
                                    rating={field.value}
                                    interactive={!isSubmitting}
                                    onChange={(value) => field.onChange(value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Share your thoughts..."
                                    className="min-h-[100px]"
                                    {...field}
                                    value={field.value || ""}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Save Changes
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        disabled={isSubmitting}
                        onClick={() => setEditingId(null)}
                    >
                        <X className="mr-1 h-4 w-4" />
                        Cancel
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Edited reviews are re-submitted for approval.
                </p>
            </form>
        </Form>
    )
}