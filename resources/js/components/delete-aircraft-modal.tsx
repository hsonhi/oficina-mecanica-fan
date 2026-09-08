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
import { Aircraft } from "@/types/fan";

type Props = {
    aircraft: Aircraft | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DeleteAircraftModal({
    aircraft,
    open,
    onOpenChange,
}: Props) {
    const [processing, setProcessing] = useState(false);

    const deleteAircraft = () => {
        if (!aircraft) {
            return;
        }

        router.delete(`/aircrafts/delete/${aircraft.id}`, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover aeronave</DialogTitle>
                    <DialogDescription>
                        Tem a certeza que deseja remover esta aeronave?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={deleteAircraft}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
