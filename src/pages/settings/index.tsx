import { DisplayPreferences } from "@/components/setting/display-preferences"
import { ChangePasswordForm } from "@/components/setting/change-password-form"
import { GeneralPreferences } from "@/components/setting/general-preferences"
import { ProfileForm } from "@/components/setting/profile-form"
import { SetPasswordForm } from "@/components/setting/set-password-form"
import ContentWrapper from "@/components/wrapper/content-wrapper"
import { useGetMe } from "@/services/setting/queries/useGetMe"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export default function SettingsPage() {
  const { data: user, isLoading } = useGetMe();

  if (isLoading || !user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-secondary/20">
      <ContentWrapper className="py-8">
        <Link
          to="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <h1 className="font-serif text-3xl font-medium">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ProfileForm user={user} />

            {
              user.hasPassword
                ? <ChangePasswordForm />
                : <SetPasswordForm />
            }

            {/* <NotificationPreferences /> */}
          </div>

          <div className="space-y-6">
            <DisplayPreferences />

            <GeneralPreferences />

            {/* <DangerZoneSetting /> */}
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
