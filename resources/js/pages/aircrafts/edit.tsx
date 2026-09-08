import { Form, Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { index as aircrafts, update } from "@/routes/aircrafts";
import type { Aircraft } from "@/types/fan";
import { Save } from "lucide-react";

type Props = {
    aircraft: Aircraft;
};

export default function EditAircraft({ aircraft }: Props) {
    return (
        <>
            <Head title="Editar aeronave" />

            <h1 className="sr-only">Editar aeronave</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Editar aeronave" />

                <Form
                    {...update.form(aircraft.id)}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="chassi">Chassi</Label>
                                    <Input
                                        id="chassi"
                                        className="mt-1 block w-full"
                                        name="chassi"
                                        required
                                        autoComplete="chassi"
                                        placeholder=""
                                        defaultValue={aircraft.chassi}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.chassi}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="ano">Ano</Label>
                                    <Input
                                        type="number"
                                        id="ano"
                                        className="mt-1 block w-full"
                                        name="ano"
                                        required
                                        autoComplete="ano"
                                        placeholder=""
                                        defaultValue={aircraft.ano}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.ano}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="modelo">Modelo</Label>
                                    <Input
                                        id="modelo"
                                        className="mt-1 block w-full"
                                        name="modelo"
                                        required
                                        autoComplete="modelo"
                                        placeholder=""
                                        defaultValue={aircraft.modelo}
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
                                        placeholder=""
                                        defaultValue={aircraft.cor}
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
                                        placeholder=""
                                        defaultValue={aircraft.marca}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.marca}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Guardar</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

EditAircraft.layout = (props: { aircraft: { chassi: string } }) => ({
    breadcrumbs: [
        {
            title: "Aeronaves",
            href: aircrafts(),
        },
        {
            title: props.aircraft.chassi,
            href: "",
        },
    ],
});
