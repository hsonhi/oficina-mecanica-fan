import { Form, router } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { update } from "@/routes/mechanics";
import { Mechanic } from "@/types/fan";

type Props = {
    mechanic: Mechanic | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function EditMechanicModal({
    mechanic,
    open,
    onOpenChange,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form
                    key={String(open)}
                    {...update.form(mechanic?.id ?? 0)}
                    className="space-y-6"
                    onSuccess={() => onOpenChange(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Editar mecânico</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    required
                                    defaultValue={mechanic?.nome}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.nome}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telefone">Telefone</Label>
                                <Input
                                    id="telefone"
                                    type="number"
                                    name="telefone"
                                    required
                                    defaultValue={mechanic?.telefone}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.telefone}
                                />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary">
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <Button type="submit" disabled={processing}>
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
