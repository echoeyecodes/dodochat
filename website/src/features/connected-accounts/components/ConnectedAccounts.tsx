import { Link } from "@tanstack/react-router";
import { useConnectedAccounts } from "../hooks/useConnectedAccounts";
import { useDisconnectAccount } from "../hooks/useDisconnectAccount";
import { Button } from "@/components/ui/button";
import { LucideMusic, LucideTrash2 } from "lucide-react";

export const ConnectedAccounts = () => {
    const { data: accounts = [] } = useConnectedAccounts();
    const { mutate: disconnect, isPending: is_disconnecting } = useDisconnectAccount();

    const spotify_account = accounts.find((a) => a.provider === "spotify");

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-semibold text-(--color-text-primary)">
                    Connected Accounts
                </h3>
                <p className="text-[13px] text-(--color-text-tertiary)">
                    Dodochat will use your connected accounts to personalize your experience with
                    the app.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-bg-subtle) flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
                            <LucideMusic className="w-5 h-5 text-[#1DB954]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-medium text-(--color-text-primary)">
                                Spotify
                            </span>
                            {spotify_account ? (
                                <span className="text-[12px] text-[#1DB954]">
                                    Logged in as {spotify_account.display_name || "User"}
                                </span>
                            ) : (
                                <span className="text-[12px] text-(--color-text-tertiary)">
                                    Not connected
                                </span>
                            )}
                        </div>
                    </div>

                    {spotify_account ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30"
                            onClick={() => disconnect(spotify_account._id.toString())}
                            disabled={is_disconnecting}
                        >
                            <LucideTrash2 className="w-3.5 h-3.5" />
                            Disconnect
                        </Button>
                    ) : (
                        <Link to="/oauth/$platform/connect" params={{ platform: "spotify" }}>
                            <Button
                                size="sm"
                                className="h-8 px-4 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white border-0 shadow-none font-bold text-[13px] rounded-full"
                            >
                                Connect
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
