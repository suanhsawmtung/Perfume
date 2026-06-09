import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "../../shared/password-input";
import { useSetPasswordForm } from "@/hooks/settings/useSetPasswordForm";

export function SetPasswordForm() {
  const {
    form,
    isSubmitting,
    onSubmit
  } = useSetPasswordForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    disabled={isSubmitting}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    disabled={isSubmitting}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Set Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
