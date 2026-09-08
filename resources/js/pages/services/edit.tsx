import { Form, Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { index as materials, update } from "@/routes/materials";
import type { Material } from "@/types/fan";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import MaterialsController from "@/actions/App/Http/Controllers";

type Props = {
    material: Material;
};

export default function EditMaterial({ material }: Props) {
    return (
        <>
            <Head title="Editar material" />

            <h1 className="sr-only">Editar material</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Editar material" />

                <Form
                    {...update.form(material.id)}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input
                                        id="nome"
                                        className="mt-1 block w-full"
                                        name="nome"
                                        required
                                        autoComplete="nome"
                                        placeholder=""
                                        defaultValue={material.nome}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.nome}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="valor">Preço</Label>
                                    <div className="mt-1 flex rounded-md">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                            AKZ
                                        </span>
                                        <Input
                                            type="number"
                                            id="valor"
                                            className=" rounded-none rounded-r-md"
                                            name="valor"
                                            required
                                            autoComplete="valor"
                                            placeholder=""
                                            defaultValue={material.valor}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.valor}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Descrição</Label>

                                <Textarea
                                    id="descricao"
                                    rows={3}
                                    className="mt-1 block w-full"
                                    name="descricao"
                                    required
                                    autoComplete="descricao"
                                    placeholder=""
                                    defaultValue={material.descricao}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.descricao}
                                />
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

EditMaterial.layout = (props: { material: { nome: string } }) => ({
    breadcrumbs: [
        {
            title: "Materiais",
            href: materials(),
        },
        {
            title: props.material.nome,
            href: "",
        },
    ],
});
