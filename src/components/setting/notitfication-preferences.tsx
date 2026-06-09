import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function NotificationPreferences() {
    const [notifications, setNotifications] = useState({
        email: true,
        orders: true,
        newArrivals: false,
        marketing: false,
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>
                    Choose what notifications you want to receive
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                            Receive important updates via email
                        </p>
                    </div>
                    <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, email: checked })
                        }
                    />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">
                            Get notified about your order status
                        </p>
                    </div>
                    <Switch
                        checked={notifications.orders}
                        onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, orders: checked })
                        }
                    />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">New Arrivals</p>
                        <p className="text-sm text-muted-foreground">
                            Be the first to know about new products
                        </p>
                    </div>
                    <Switch
                        checked={notifications.newArrivals}
                        onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, newArrivals: checked })
                        }
                    />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Marketing & Promotions</p>
                        <p className="text-sm text-muted-foreground">
                            Receive special offers and discounts
                        </p>
                    </div>
                    <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, marketing: checked })
                        }
                    />
                </div>
            </CardContent>
        </Card>
    );
}