import { Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePreferenceStore } from "@/stores/preference.store";
import { queryClient } from "@/lib/query-client";
import { homeQueryKeys } from "@/services/home/key";

export function GeneralPreferences() {
    const { gender, setGender } = usePreferenceStore();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>General</CardTitle>
                </div>
                <CardDescription>
                    Set your preferred general settings
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                        value={gender ?? "ALL"}
                        onValueChange={(value) => {
                            setGender(
                                value === "MALE" || value === "FEMALE" ? value : null
                            );

                            queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
                        }}
                    >
                        <SelectTrigger className="w-34">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="MALE">For Men</SelectItem>
                            <SelectItem value="FEMALE">For Women</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="mm">Myanmar</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
                {/* <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (&euro;)</SelectItem>
                            <SelectItem value="gbp">GBP (&pound;)</SelectItem>
                            <SelectItem value="jpy">JPY (&yen;)</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
            </CardContent>
        </Card>
    );
}