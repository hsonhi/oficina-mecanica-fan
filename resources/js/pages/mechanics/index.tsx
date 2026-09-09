import { Form, Head, usePage, Link, router } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateMechanicModal from "@/components/create-mechanic-modal";
import EditMechanicModal from "@/components/edit-mechanic-modal";
import DeleteMechanicModal from "@/components/delete-mechanic-modal";
import { useState, useEffect, FormEvent } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    index as materials,
    add as addmaterial,
    edit as editmaterial,
} from "@/routes/materials";
import type { Mechanic } from "@/types/fan";
import { Search, Trash, Pencil, Plus } from "lucide-react";

type Props = {
    mechanics: any;
    filters: any;
};

export default function Mechanics({ mechanics, filters }: Props) {
    const [deleteMechanicDialogOpen, setDeleteMechanicDialogOpen] =
        useState(false);

    const [mechanicToDelete, setMechanicToDelete] = useState<Mechanic | null>(
        null,
    );

    const confirmDeleteMechanic = (mechanic: Mechanic) => {
        setMechanicToDelete(mechanic);
        setDeleteMechanicDialogOpen(true);
    };

    const [editMechanicDialogOpen, setEditMechanicDialogOpen] = useState(false);

    const [mechanicToEdit, setMechanicToEdit] = useState<Mechanic | null>(null);

    const confirmEditMechanic = (mechanic: Mechanic) => {
        setMechanicToEdit(mechanic);
        setEditMechanicDialogOpen(true);
    };

    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            "/mechanics",
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Mecânicos" />

            <div className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Mecânicos"
                        description="Registo de mecânicos"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <CreateMechanicModal>
                        <Button data-test="mechanics-new-mechanic-button">
                            <Plus /> Adicionar mecânico
                        </Button>
                    </CreateMechanicModal>
                    <form
                        onSubmit={handleSearch}
                        className="flex w-full max-w-md items-center gap-2"
                    >
                        <Input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Pesquisar..."

                            className="flex-1 px-3 py-1.5 w-44"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            aria-label="Pesquisar"
                        >
                            <Search />
                        </Button>
                    </form>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/60">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Telefone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {mechanics.data.map((mech: any) => (
                                <tr
                                    key={mech.id}
                                    className="transition-colors hover:bg-accent/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {mech.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mech.telefone}
                                    </td>
                                    <td>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    onClick={() =>
                                                        confirmEditMechanic(
                                                            mech,
                                                        )
                                                    }
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar mecânico</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    onClick={() =>
                                                        confirmDeleteMechanic(
                                                            mech,
                                                        )
                                                    }
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remover mecânico</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {mechanics.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-6 py-4 text-center text-sm text-muted-foreground"
                                    >
                                        Não foram encontrados registos
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex gap-1 justify-center">
                    {mechanics.links.map((link: any, index: number) => (
                        <Link
                            key={index}
                            className={`rounded border border-border px-3 py-1 text-sm transition-colors ${
                                link.active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                            href={link.url || "#"}
                            // optional: preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            <DeleteMechanicModal
                mechanic={mechanicToDelete}
                open={deleteMechanicDialogOpen}
                onOpenChange={setDeleteMechanicDialogOpen}
            />
            <EditMechanicModal
                mechanic={mechanicToEdit}
                open={editMechanicDialogOpen}
                onOpenChange={setEditMechanicDialogOpen}
            />
        </>
    );
}

Mechanics.layout = {
    breadcrumbs: [
        {
            title: "Mecânicos",
            href: "",
        },
    ],
};
