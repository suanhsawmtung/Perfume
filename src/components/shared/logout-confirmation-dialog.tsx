import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/wrapper/dialog-wrapper";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigation, useSubmit } from "react-router";

interface LogoutConfirmationDialogProps {
  children: React.ReactNode;
}

export function LogoutConfirmationDialog({
  children,
}: LogoutConfirmationDialogProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const isLoggingOut = navigation.state === "submitting";

  const handleLogout = () => {
    submit(null, { method: "post", action: "/logout" });
    setOpen(false);
  };

  return (
    <DialogWrapper
      title="Log out"
      close={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
      triggerContent={children}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoggingOut}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Log out
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
}
