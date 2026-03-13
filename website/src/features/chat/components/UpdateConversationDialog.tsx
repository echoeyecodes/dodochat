import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const updateSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
})

type UpdateFormValues = z.infer<typeof updateSchema>

type UpdateConversationDialogOptions = {
    data: {
        conversation_id: string
        current_title: string
    }
    onConfirm?: (conversation_id: string, title: string) => void
}

export type UpdateConversationDialogRef = {
    open: (options: UpdateConversationDialogOptions) => void
    close: () => void
}

export const UpdateConversationDialog = forwardRef<UpdateConversationDialogRef>(
    (_, ref) => {
        const [isOpen, setIsOpen] = useState(false)
        const [conversationId, setConversationId] = useState('')
        const [onConfirmRef, setOnConfirmRef] = useState<
            ((conversation_id: string, title: string) => void) | undefined
        >()

        const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UpdateFormValues>({
            resolver: zodResolver(updateSchema),
        })

        useImperativeHandle(ref, () => ({
            open: (options) => {
                setConversationId(options.data.conversation_id)
                setValue('title', options.data.current_title)
                setOnConfirmRef(() => options.onConfirm)
                setIsOpen(true)
            },
            close: () => {
                setIsOpen(false)
            },
        }))

        useEffect(() => {
            if (!isOpen) {
                reset()
                setConversationId('')
                setOnConfirmRef(undefined)
            }
        }, [isOpen, reset])

        const onSubmit = (data: UpdateFormValues) => {
            onConfirmRef?.(conversationId, data.title)
            setIsOpen(false)
        }

        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rename conversation</DialogTitle>
                        <DialogDescription>
                            Give this conversation a new name.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Input
                                placeholder="Conversation title"
                                autoFocus
                                {...register('title')}
                            />
                            {errors.title && (
                                <span className="text-[12px] text-red-500 ml-1">{errors.title.message}</span>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
)

UpdateConversationDialog.displayName = 'UpdateConversationDialog'
