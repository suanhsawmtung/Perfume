import { formatImagePath } from "@/lib/utils";
import { useProfileInfoUpdate } from "@/services/setting/queries/useProfileInfoUpdate";
import type { UpdateProfileFormValues } from "@/types/setting.type";
import type { UserType } from "@/types/user.type";
import { updateProfileSchema } from "@/validations/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

interface UseProfileFormProps {
    user: UserType;
}

export function useProfileForm({ user }: UseProfileFormProps) {
    const profileMutation = useProfileInfoUpdate();
    const isSubmitting = profileMutation.isPending;

    const form = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            image: undefined,
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                form.setValue("image", file, { shouldValidate: true });
            }
        },
        [form],
    );

    const imageFile = form.watch("image");
    const imageUrl = useMemo(() => {
        if (imageFile instanceof File) {
            return URL.createObjectURL(imageFile);
        }
        if (user.image) {
            return formatImagePath(user.image, "user");
        }
        return null;
    }, [imageFile, user.image]);

    useEffect(() => {
        return () => {
            if (imageUrl && imageFile instanceof File) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl, imageFile]);

    const onSubmit = (values: UpdateProfileFormValues) => {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        if (values.phone) {
            formData.append("phone", values.phone);
        }
        if (values.image instanceof File) {
            formData.append("avatar", values.image);
        }

        profileMutation.mutate(formData);
    };

    return {
        form,
        isSubmitting,
        fileInputRef,
        imageUrl,
        handleImageClick,
        handleImageChange,
        onSubmit: form.handleSubmit(onSubmit),
    };
}