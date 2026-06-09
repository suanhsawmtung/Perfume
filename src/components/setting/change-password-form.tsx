import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { PasswordInput } from "../shared/password-input";
import { useChangePasswordForm } from "@/hooks/settings/useChangePasswordForm";

export function ChangePasswordForm() {
    const {
        form,
        isSubmitting,
        onSubmit
    } = useChangePasswordForm();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Security</CardTitle>
                </div>
                <CardDescription>
                    Manage your password and security settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
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
                                Change Password
                            </Button>
                        </div>
                    </form>
                </Form>


                {/* <Separator className="my-6" /> */}

                {/* <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <Switch />
                </div> */}
            </CardContent>
        </Card>
    );
}