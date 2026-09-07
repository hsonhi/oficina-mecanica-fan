import { Form, Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { materials } from "@/routes";
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
                    {...MaterialsController.MaterialsController.update.form(material.ID)}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="NOME">Nome</Label>
                                    <Input
                                        id="NOME"
                                        className="mt-1 block w-full"
                                        name="NOME"
                                        required
                                        autoComplete="name"
                                        placeholder=""
                                        defaultValue={material.NOME}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="VALOR">Preço</Label>
                                    <Input
                                        type="number"
                                        id="VALOR"
                                        className="mt-1 block w-full"
                                        name="VALOR"
                                        required
                                        autoComplete="name"
                                        placeholder=""
                                        defaultValue={material.VALOR}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="DESCRICAO">Descrição</Label>

                                <Textarea
                                    id="DESCRICAO"
                                    rows={3}
                                    className="mt-1 block w-full"
                                    name="DESCRICAO"
                                    required
                                    autoComplete="username"
                                    placeholder=""
                                     defaultValue={material.DESCRICAO}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.descricao}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    <Save /> Guardar
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}


EditMaterial.layout = (props: { material: { DESCRICAO: string } }) => ({
    breadcrumbs: [
        {
            title: "Materiais",
            href: materials(),
        },
        {
            title: props.material.DESCRICAO,
            href: '',
        },
    ],
});
