import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { UserType } from "@/types/user.type";
import { Camera, Loader2, User } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useProfileForm } from "@/hooks/settings/useProfileForm";

interface ProfileFormProps {
    user: UserType;
}

export function ProfileForm({ user }: ProfileFormProps) {
    const {
        form,
        isSubmitting,
        fileInputRef,
        imageUrl,
        handleImageClick,
        handleImageChange,
        onSubmit,
    } = useProfileForm({ user });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Account Information</CardTitle>
                </div>
                <CardDescription>
                    Update your personal details and contact information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="flex flex-col items-center gap-4 sm:flex-row mb-6">
                            <div
                                onClick={handleImageClick}
                                className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                                {imageUrl ? (
                                    <>
                                        <img
                                            src={imageUrl}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Camera className="h-6 w-6 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted">
                                        <Camera className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-medium">Profile Picture</h3>
                                <p className="text-sm text-muted-foreground">
                                    Click the avatar to upload a new one. JPG, JPEG or PNG. Max 5MB.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue="alexandra@example.com"
                            />
                        </div> */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="012345678"
                                            {...field}
                                            value={field.value || ""}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}