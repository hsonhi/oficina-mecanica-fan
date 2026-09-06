import React from "react";
import { Form, Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import MaterialsController from "@/actions/App/Http/Controllers";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { materials } from "@/routes";
import { Save } from "lucide-react";

export default function AddMaterial() {

    return (
        <>
            <Head title="Registar novo material" />

            <h1 className="sr-only">Registar novo material</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Registar novo material" />

                <Form
                    {...MaterialsController.MaterialsController.store.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
    <div>
  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>

  <div className="mt-1 flex rounded-md shadow-sm">
    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
      https://
    </span>
    <input 
      type="text" 
      name="username" 
      id="username" 
      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500" 
      placeholder="example.com"
    />
  </div>
</div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        name="nome"
                                        required
                                        autoComplete="name"
                                        placeholder=""
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="name">Preço</Label>
                                    <Input
                                        type="number"
                                        id="name"
                                        className="mt-1 block w-full"
                                        name="valor"
                                        required
                                        autoComplete="name"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Descrição</Label>

                                <Textarea
                                    id="email"
                                    rows={3}
                                    className="mt-1 block w-full"
                                    name="descricao"
                                    required
                                    autoComplete="username"
                                    placeholder=""
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

AddMaterial.layout = {
    breadcrumbs: [
        {
            title: "Materiais",
            href: materials(),
        },
        {
            title: "Registar novo material",
            href: "",
        },
    ],
};
