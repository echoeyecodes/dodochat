import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LucideKey, LucideLoader2, LucideSparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useUpdateProfile } from "../hooks/useUpdateProfile"
import { toast } from "sonner"

const apiKeySchema = z.object({
    gemini_api_key: z.string().min(1, 'API key is required').startsWith('AIza', 'Invalid Gemini API key format'),
})

type ApiKeyFormValues = z.infer<typeof apiKeySchema>

export type GeminiApiKeyDialogRef = {
    open: () => void
    close: () => void
}

type GeminiApiKeyDialogProps = {
    defaultOpen?: boolean
    preventClose?: boolean
}

export const GeminiApiKeyDialog = forwardRef<GeminiApiKeyDialogRef, GeminiApiKeyDialogProps>(({ defaultOpen, preventClose }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const { mutate: updateProfile, isPending } = useUpdateProfile()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ApiKeyFormValues>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            gemini_api_key: '',
        },
    })

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))

    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen, reset])

    const onSubmit = (data: ApiKeyFormValues) => {
        updateProfile(data, {
            onSuccess: () => {
                toast.success('API key saved successfully')
                setIsOpen(false)
            },
            onError: (error: any) => {
                toast.error(error.message || 'Failed to save API key')
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={preventClose ? () => { } : setIsOpen}>
            <DialogContent
                className={cn(
                    "sm:max-w-[440px] p-0 overflow-hidden border-(--color-border)",
                    preventClose && "[&>button]:hidden"
                )}
                onPointerDownOutside={preventClose ? (e) => e.preventDefault() : undefined}
                onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : undefined}
            >
                <div className="bg-(--color-accent-subtle) px-6 py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-14 w-14 rounded-2xl bg-(--color-bg-elevated) border border-(--color-border) flex items-center justify-center shadow-sm">
                        <LucideSparkles className="h-7 w-7 text-(--color-accent)" />
                    </div>
                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-bold text-(--color-text-primary)">
                            Set up Gemini
                        </DialogTitle>
                        <DialogDescription className="text-[13px] text-(--color-text-secondary) max-w-[280px]">
                            To start chatting, you'll need to provide your Google Gemini API key.
                        </DialogDescription>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-2 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="gemini_api_key"
                                className="text-[12px] font-semibold text-(--color-text-tertiary) uppercase tracking-wider pl-1"
                            >
                                API Key
                            </label>
                            <div className="relative">
                                <LucideKey className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-(--color-text-quaternary)" />
                                <Input
                                    id="gemini_api_key"
                                    type="password"
                                    placeholder="AIza..."
                                    className="pl-11 h-12 bg-(--color-bg) border-(--color-border) focus:ring-(--color-accent)/20"
                                    {...register('gemini_api_key')}
                                />
                            </div>
                            {errors.gemini_api_key && (
                                <p className="text-[11px] text-red-500 font-medium pl-1">
                                    {errors.gemini_api_key.message}
                                </p>
                            )}
                        </div>

                        <div className="rounded-xl bg-(--color-bg-subtle) p-4 border border-(--color-border-subtle)">
                            <p className="text-[12px] text-(--color-text-secondary) leading-relaxed">
                                Don't have a key? You can get one for free at the <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-(--color-accent) font-medium hover:underline">Google AI Studio</a>.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button
                            type="submit"
                            className="w-full h-12 text-[15px] font-semibold rounded-xl transition-all active:scale-[0.98]"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <LucideLoader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Saving key...
                                </>
                            ) : (
                                'Activate Gemini'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
})

GeminiApiKeyDialog.displayName = "GeminiApiKeyDialog"
