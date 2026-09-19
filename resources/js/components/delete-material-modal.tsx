import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Material } from "@/types/fan";
import AlertError from "@/components/alert-error";

type Props = {
    material: Material | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DeleteMaterialModal({
    material,
    open,
    onOpenChange,
}: Props) {
    const [processing, setProcessing] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        setDeleteError(null);
    }, [open]);

    const deleteMaterial = () => {
        if (!material) {
            return;
        }
        setDeleteError(null);
        router.delete(`/materials/delete/${material.id}`, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
            onError: (errors) => {
                const error = errors.custom_error;

                setDeleteError(
                    Array.isArray(error) ? error[0] : (error ?? null),
                );
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover material</DialogTitle>
                    <DialogDescription>
                        Tem a certeza que deseja remover este material?
                    </DialogDescription>
                </DialogHeader>

                {deleteError && (
                    <AlertError title="Atenção!" errors={[deleteError]} />
                )}

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={deleteMaterial}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
