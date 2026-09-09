import { Form, Head } from "@inertiajs/react";
import { useState } from "react";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { index as users, update } from "@/routes/users";
import { Save } from "lucide-react";
import { Team, User } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    user: User;
    teams: Team[];
};

export default function EditUser({ user, teams }: Props) {
    const [teamId, setTeamId] = useState(
        user.current_team_id?.toString() ?? "",
    );

    return (
        <>
            <Head title="Editar usuário" />

            <h1 className="sr-only">Editar usuário</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Editar usuário" />

                <Form
                    {...update.form(user.id)}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder=""
                                    defaultValue={user.name}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="nome">Telefone</Label>
                                    <Input
                                        type="number"
                                        id="phone"
                                        className="mt-1 block w-full"
                                        name="phone"
                                        required
                                        autoComplete="phone"
                                        placeholder=""
                                        defaultValue={user.phone}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.phone}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        className="mt-1 block w-full"
                                        placeholder=""
                                        defaultValue={user.email}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="patent">Patente</Label>
                                    <Input
                                        id="patent"
                                        className="mt-1 block w-full"
                                        name="patent"
                                        autoComplete="patent"
                                        placeholder=""
                                        defaultValue={user.patent}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.patent}
                                    />
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="taxid">NIF</Label>
                                    <Input
                                        id="taxid"
                                        name="taxid"
                                        autoComplete="taxid"
                                        className="mt-1 block w-full"
                                        placeholder=""
                                        defaultValue={user.taxid}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.taxid}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="current_team_id">
                                        Acesso
                                    </Label>
                                    <Select
                                        name="current_team_id"
                                        value={teamId}
                                        onValueChange={setTeamId}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecionar o acesso" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teams.map((role: any) => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={role.id.toString()}
                                                >
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        className="mt-2"
                                        message={errors.current_team_id}
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

EditUser.layout = (props: { user: { name: string } }) => ({
    breadcrumbs: [
        {
            title: "Usuários",
            href: users(),
        },
        {
            title: props.user.name,
            href: "",
        },
    ],
});
