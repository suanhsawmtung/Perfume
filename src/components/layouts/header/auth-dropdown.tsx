import { LogoutConfirmationDialog } from "@/components/shared/logout-confirmation-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatImagePath,
  formatUserDisplayName,
  getUserInitials,
} from "@/lib/utils";
import type { AuthUser } from "@/stores/auth.store";
import {
  ArrowLeftIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface Props {
  user: AuthUser | null;
}

const AuthDropdown = ({ user }: Props) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdmin = user?.role === "ADMIN" || user?.role === "AUTHOR";

  if (!user) {
    return (
      <Link to="/sign-in">
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <LogInIcon className="h-5 w-5" />
          <span className="sr-only">Sign In</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-x-2">
            <Avatar>
              {user.image ? (
                <AvatarImage
                  src={formatImagePath(user.image, "user")}
                  alt={formatUserDisplayName(user)}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h5 className="max-w-[18ch] truncate font-bold">
                {formatUserDisplayName(user)}
              </h5>
              <p
                className="text-muted-foreground max-w-[20ch] truncate"
                title={user.email}
              >
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to={isAdminRoute ? "/" : "/admin"}>
              <div className="flex items-center gap-x-2">
                {isAdminRoute ? (
                  <>
                    <ArrowLeftIcon />
                    Back to Website
                  </>
                ) : (
                  <>
                    <LayoutDashboardIcon />
                    Dashboard
                  </>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <div className="flex items-center gap-x-2">
              <User />
              <span className="sr-only">Profile</span>
              Profile
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <div className="flex items-center gap-x-2">
              <SettingsIcon />
              <span className="sr-only">Settings</span>
              Settings
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutConfirmationDialog>
            <button
              type="button"
              className="hover:bg-accent hover:text-accent-foreground w-full cursor-pointer rounded-sm px-2 py-1.5 text-sm"
            >
              <div className="flex items-center gap-x-2">
                <LogOutIcon size={16} />
                Log out
              </div>
            </button>
          </LogoutConfirmationDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropdown;
