import { Link, useNavigate } from "@tanstack/react-router"
import { useSelectCurrentUser } from "@/features/user/hooks/useSelectCurrentUser"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LucideLogOut, LucideUser } from "lucide-react"
import { useRef } from "react"
import { ConfirmationDialog, type ConfirmationDialogHandle } from "@/components/ui/confirmation-dialog"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const user = useSelectCurrentUser()
    const navigate = useNavigate()
    const confirmRef = useRef<ConfirmationDialogHandle>(null)

    const initials = user?.display_name
        ? user.display_name.substring(0, 2).toUpperCase()
        : user?.email?.substring(0, 2).toUpperCase() || 'OO'

    const handleLogout = () => {
        confirmRef.current?.open({
            title: "Log out",
            description: "Are you sure you want to log out of your account?",
            confirmText: "Log out",
            variant: "destructive",
            onConfirm: () => {
                navigate({ to: '/logout' })
            }
        })
    }

    return (
        <div className="min-h-screen relative overflow-hidden grain">
            <div className="flex flex-col w-full h-dvh p-2 sm:p-4 md:p-6 lg:p-8">
                <header className="mb-4 md:mb-6 flex items-center justify-between shrink-0">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="DodoChat" className="size-10" />
                        <div className="flex items-center gap-2">
                            <h1 className="text-[15px] font-semibold text-(--color-text-primary) tracking-tight">
                                DodoChat
                            </h1>
                            <span className="px-1.5 py-0.5 mt-0.5 rounded-md bg-(--color-bg-elevated) text-(--color-text-tertiary) text-[10px] font-medium border border-(--color-border)">
                                Beta
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="h-8 w-8 rounded-full border border-(--color-border) bg-(--color-bg-elevated) flex items-center justify-center text-[12px] font-semibold text-(--color-text-primary) shadow-sm cursor-pointer hover:border-(--color-text-primary) transition-all">
                                    {initials}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        {user?.display_name && (
                                            <p className="font-medium text-[13px] text-(--color-text-primary)">
                                                {user.display_name}
                                            </p>
                                        )}
                                        {user?.email && (
                                            <p className="w-[160px] truncate text-[12px] text-(--color-text-tertiary)">
                                                {user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link to="/profile">
                                        <LucideUser className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-500! hover:bg-red-50! hover:text-red-600! cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LucideLogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 min-h-0 h-full flex flex-col">
                    {children}
                </main>
            </div>

            <ConfirmationDialog ref={confirmRef} />
        </div>
    )
}
