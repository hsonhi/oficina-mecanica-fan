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
import { User } from "@/types";

type Props = {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function DeleteUserModal({ user, open, onOpenChange }: Props) {
    const [processing, setProcessing] = useState(false);

    const deleteUser = () => {
        if (!user) {
            return;
        }

        router.delete(`/users/delete/${user.id}`, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover usuário</DialogTitle>
                    <DialogDescription>
                        Tem a certeza que deseja remover este usuário?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={deleteUser}
                    >
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
