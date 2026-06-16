import { StarRatingInput } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/services/review/queries/useCreateReview";
import { ReviewFormSchema, type ReviewFormValues } from "@/validations/review.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface WriteReviewFormProps {
    productId: number;
    setReviewDialogOpen: (value: boolean) => void;
}

export function WriteReviewForm({
    productId,
    setReviewDialogOpen
}: WriteReviewFormProps) {
    const createReviewMutation = useCreateReview();
    const isSubmitting = createReviewMutation.isPending;

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewFormSchema),
        defaultValues: {
            rating: 5,
            content: "",
        },
    });

    const onSubmit = (values: ReviewFormValues) => {
        createReviewMutation.mutate({ productId, data: values }, {
            onSuccess: () => {
                form.reset()
                setReviewDialogOpen(false)
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <StarRatingInput
                                    rating={field.value}
                                    disabled={isSubmitting}
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
                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setReviewDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Submit Review</Button>
                </div>
            </form>
        </Form>
    )
}