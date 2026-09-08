import { router } from "@inertiajs/react";
import { useState } from "react";
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
import { Mechanic } from "@/types/fan";

type Props = {
    mechanic: Mechanic | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DeleteMechanicModal({
    mechanic,
    open,
    onOpenChange,
}: Props) {
    const [processing, setProcessing] = useState(false);

    const deleteMechanic = () => {
        if (!mechanic) {
            return;
        }

        router.delete(`/mechanics/delete/${mechanic.id}`, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover mecânico</DialogTitle>
                    <DialogDescription>
                        Tem a certeza que deseja remover este mecânico?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={deleteMechanic}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
