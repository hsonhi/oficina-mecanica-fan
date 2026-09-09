import { Form, Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { index as services, store } from "@/routes/services";
import { Mechanic, Material, Aircraft } from "@/types/fan";
import MultiSelect, { SelectOption } from "@/components/MultiSelect";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { Value } from "@radix-ui/react-select";

type Props = {
    materials: Material[];
    mechanics: Mechanic[];
    aircrafts: Aircraft[];
};

export default function AddService({ mechanics, materials, aircrafts }: Props) {
    const [selectedMechanicValues, setSelectedMechanicValues] = useState<
        string[]
    >([]);
    const [selectedMaterialValues, setSelectedMaterialValues] = useState<
        string[]
    >([]);

    const mechanicOPTIONS: SelectOption[] = Object.entries(mechanics).map(
        ([id, data]) => {
            return {
                value: data.id.toString(),
                label: data.nome,
            };
        },
    );
    const materialOPTIONS: SelectOption[] = Object.entries(materials).map(
        ([id, data]) => {
            return {
                value: data.id.toString(),
                label: data.nome,
            };
        },
    );

    return (
        <>
            <Head title="Registar novo serviço" />

            <h1 className="sr-only">Registar novo serviço</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Registar novo serviço" />

                <Form
                    {...store.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="aeronave_id">
                                        Aeronave
                                    </Label>
                                    <Select name="aeronave_id" required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecionar a aeronave" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {aircrafts.map((role: any) => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={role.id.toString()}
                                                >
                                                    {role.chassi} {role.marca}{" "}
                                                    {role.modelo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        className="mt-2"
                                        message={errors.aeronave_id}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="data_inicio">
                                        Data de Início
                                    </Label>
                                    <Input
                                        type="date"
                                        id="data_inicio"
                                        className="mt-1 block w-full"
                                        name="data_inicio"
                                        required
                                        autoComplete="data_inicio"
                                        placeholder=""
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.data_inicio}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="data_fim">
                                        Data Provisória de Conclusão
                                    </Label>
                                    <Input
                                        type="date"
                                        id="data_fim"
                                        className="mt-1 block w-full"
                                        name="data_fim"
                                        required
                                        autoComplete="data_fim"
                                        placeholder=""
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.data_fim}
                                    />
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
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.descricao}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="descricao">
                                    Selecione os mecânicos para a atuação deste
                                    serviço
                                </Label>

                                <MultiSelect
                                    name="mecanicos_id[]"
                                    options={mechanicOPTIONS}
                                    selected={selectedMechanicValues}
                                    onChange={setSelectedMechanicValues}
                                />

                                {/*<select
                                    id="mecanicos_id"
                                    name="mecanicos_id[]"
                                    multiple={true}

                                    className="border rounded p-2 w-full"
                                >
                                    {mechanics.map((role: any) => (
                                        <option key={role.id} value={role.id}>
                                            {role.nome}
                                        </option>
                                    ))}
                                </select> */}
                                <InputError message={errors.mecanicos_id} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="material_id">
                                    Selecione os materiais para o serviço
                                </Label>

                                <MultiSelect
                                    name="material_id[]"
                                    options={materialOPTIONS}
                                    selected={selectedMaterialValues}
                                    onChange={setSelectedMaterialValues}
                                />
                                {/*<select
                                    id="material_id"
                                    name="material_id[]"
                                    multiple={true}

                                    className="border rounded p-2 w-full"
                                >
                                    {materials.map((role: any) => (
                                        <option key={role.id} value={role.id}>
                                            {role.nome}
                                        </option>
                                    ))}
                                </select> */}
                                <InputError message={errors.material_id} />
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

AddService.layout = {
    breadcrumbs: [
        {
            title: "Serviços",
            href: services(),
        },
        {
            title: "Registar novo serviço",
            href: "",
        },
    ],
};
