import { Form, Head, usePage, Link, router } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
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
import { Trash, Pencil, Plus } from "lucide-react";
import DeleteMaterialModal from "@/components/delete-material-modal";

type Props = {
    mechanics: Mechanic[];
    filters: any;
};

export default function Mechanics({ mechanics, filters }: Props) {
    // 🔍 This hooks directly into Inertia's global store to grab all active props
    const { props } = usePage();

    const [deleteMaterialDialogOpen, setDeleteMaterialDialogOpen] =
        useState(false);

    const [materialToDelete, setMaterialToDelete] = useState<Mechanic | null>(
        null,
    );

    // Print this out in your browser console (F12) to see what keys exist!
    console.log("All incoming props from Laravel:", mechanics /* props */);

    const confirmDeleteMaterial = (material: Mechanic) => {
        setMaterialToDelete(material);
        setDeleteMaterialDialogOpen(true);
    };

    const [search, setSearch] = useState(filters.search || "");
    useEffect(() => {
        // Debouncing can be implemented here if needed
        router.get(
            "/mechanics",
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, [search]);

    /*
         const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) { //
            router.delete(`/materials/delete/${id}`);
        }
    };*/

    return (
        <>
            <Head title="Mecânicos" />

            <div className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Mecânicos"
                        description="Registo de materiais para reparação de aeronaves"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90  px-4 py-2 has-[>svg]:px-3"
                        href={addmaterial()}
                        prefetch
                    >
                        <Plus /> Adicionar mecânico
                    </Link>
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Pesquisar..."
                        className="px-3 py-1.5 w-64"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/60">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Preço
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Descrição
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {mechanics.data.map((mech) => (
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
                                                    asChild
                                                >
                                                    <Link
                                                        href={editmaterial(
                                                            mech.id,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar material</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    onClick={() =>
                                                        confirmDeleteMaterial(
                                                            mech,
                                                        )
                                                    }
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remover material</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/*                                              <button onClick={() => handleDelete(mat.ID)} className="text-red-600">
            Delete Post
        </button> */}
                                    </td>
                                </tr>
                            ))}
                            {mechanics.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center text-sm text-muted-foreground"
                                    >
                                        Não foram encontrados registos
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/*<p className="m-0">
                    Showing <span>{materials.from}</span> to <span>{materials.to}</span> of <span>{materials.total}</span> entries
                </p> */}

                <div className="mt-4 flex gap-1 justify-center">
                    {mechanics.links.map((link, index) => (
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
