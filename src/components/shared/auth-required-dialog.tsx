import { useAuthRequired } from "@/providers/auth-required-provider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function AuthRequiredDialog() {
    const { isOpen, title, description, closeAuthRequiredDialog } = useAuthRequired();
    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) closeAuthRequiredDialog();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    {/* <DialogTitle>Sign in to write a review</DialogTitle> */}
                    <DialogTitle>{title}</DialogTitle>
                    {/* <DialogDescription>
                        You need to be logged in to share your experience.
                    </DialogDescription> */}
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <Button asChild>
                    <Link to="/sign-in">Sign In</Link>
                </Button>
            </DialogContent>
        </Dialog>
    );
}
