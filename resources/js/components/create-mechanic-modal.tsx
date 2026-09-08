import { Form } from "@inertiajs/react";
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
import { store } from "@/routes/mechanics";

export default function CreateMechanicModal({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form
                    key={String(open)}
                    {...store.form()}
                    className="space-y-6"
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Adicionar mecânico</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input id="nome" name="nome" required />
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
