import { useSetPassword } from "@/services/setting/queries/useSetPassword";
import type { SetPasswordFormValues } from "@/types/setting.type";
import { setPasswordSchema } from "@/validations/setting.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useSetPasswordForm() {
    const setPasswordMutation = useSetPassword();
    const isSubmitting = setPasswordMutation.isPending;

    const form = useForm<SetPasswordFormValues>({
        resolver: zodResolver(setPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: SetPasswordFormValues) => {
        setPasswordMutation.mutate(values, {
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