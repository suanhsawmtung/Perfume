import { useChangePassword } from "@/services/setting/queries/useChangePassword";
import type { ChangePasswordFormValues } from "@/types/setting.type";
import { changePasswordSchema } from "@/validations/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useChangePasswordForm() {
    const changePasswordMutation = useChangePassword();
    const isSubmitting = changePasswordMutation.isPending;

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: ChangePasswordFormValues) => {
        changePasswordMutation.mutate(values, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return {
        form,
        isSubmitting,
        onSubmit: form.handleSubmit(onSubmit),
    };
}