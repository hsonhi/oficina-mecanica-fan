import { Form, Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { index as aircrafts, store } from "@/routes/aircrafts";

export default function AddAircraft() {
    return (
        <>
            <Head title="Registar nova aeronave" />

            <h1 className="sr-only">Registar nova aeronave</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Registar nova aeronave" />

                <Form
                    {...store.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados da aeronave</CardTitle>
                                <CardDescription>
                                    Preencha os dados principais para registar a
                                    aeronave.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="flex-1">
                                        <Label htmlFor="chassi">Chassi</Label>
                                        <Input
                                            id="chassi"
                                            className="mt-1 block w-full"
                                            name="chassi"
                                            required
                                            autoComplete="chassi"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.chassi}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Label htmlFor="ano">Ano</Label>
                                        <Input
                                            type="text"
                                            maxLength={4}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className="mt-1 block w-full"
                                            id="ano"
                                            name="ano"
                                            required
                                            autoComplete="ano"
                                            placeholder=""
                                            onChange={(e) => {
                                                // Optional sanitization: removes non-digits if pasted
                                                e.target.value =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    );
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.ano}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="flex-1">
                                        <Label htmlFor="modelo">Modelo</Label>
                                        <Input
                                            id="modelo"
                                            className="mt-1 block w-full"
                                            name="modelo"
                                            required
                                            autoComplete="modelo"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.modelo}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Label htmlFor="cor">Cor</Label>
                                        <Input
                                            id="cor"
                                            className="mt-1 block w-full"
                                            name="cor"
                                            required
                                            autoComplete="cor"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.cor}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Label htmlFor="marca">Marca</Label>
                                        <Input
                                            id="marca"
                                            className="mt-1 block w-full"
                                            name="marca"
                                            required
                                            autoComplete="marca"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.marca}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="justify-end border-t pt-6">
                                <Button disabled={processing}>Guardar</Button>
                            </CardFooter>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

AddAircraft.layout = {
    breadcrumbs: [
        {
            title: "Aeronaves",
            href: aircrafts(),
        },
        {
            title: "Registar nova aeronave",
            href: "",
        },
    ],
};
