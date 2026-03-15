import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import { Button } from "./button";

interface ConfirmationDialogOptions {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

export interface ConfirmationDialogHandle {
    open: (options: ConfirmationDialogOptions) => void;
    close: () => void;
}

export const ConfirmationDialog = React.forwardRef<ConfirmationDialogHandle, object>((_, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [options, setOptions] = React.useState<ConfirmationDialogOptions>({});
    const [loading, setLoading] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        open: (newOptions: ConfirmationDialogOptions) => {
            setOptions(newOptions);
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));

    const handleConfirm = async () => {
        if (options.onConfirm) {
            setLoading(true);
            try {
                await options.onConfirm();
                setIsOpen(false);
            } catch (error) {
                console.error("Confirmation error:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        options.onCancel?.();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                    <DialogTitle>{options.title || "Are you sure?"}</DialogTitle>
                    <DialogDescription>
                        {options.description || "This action cannot be undone."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="ghost" onClick={handleCancel} disabled={loading}>
                        {options.cancelText || "Cancel"}
                    </Button>
                    <Button
                        variant={options.variant === "destructive" ? "destructive" : "default"}
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            options.confirmText || "Confirm"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

ConfirmationDialog.displayName = "ConfirmationDialog";
