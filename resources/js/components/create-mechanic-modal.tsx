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
                                    type="text"
                                    maxLength={9}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="mt-1 block w-full"
                                    id="telefone"
                                    name="telefone"
                                    required
                                    autoComplete="phone"
                                    placeholder=""
                                    onChange={(e) => {
                                        // Optional sanitization: removes non-digits if pasted
                                        e.target.value = e.target.value.replace(
                                            /\D/g,
                                            "",
                                        );
                                    }}
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
