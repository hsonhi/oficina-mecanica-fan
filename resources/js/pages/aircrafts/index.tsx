import { Head, Link, router } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    index as aircrafts,
    add as addaircraft,
    edit as editaircraft,
} from "@/routes/aircrafts";
import type { Aircraft } from "@/types/fan";
import { Search, Trash, Pencil, Plus } from "lucide-react";
import DeleteAircraftModal from "@/components/delete-aircraft-modal";

type Props = {
    aircrafts: any;
    filters: any;
};

export default function Aircrafts({ aircrafts, filters }: Props) {
    const [deleteAircraftDialogOpen, setDeleteAircraftDialogOpen] =
        useState(false);

    const [aircraftToDelete, setAircraftToDelete] = useState<Aircraft | null>(
        null,
    );

    const confirmDeleteAircraft = (aircraft: Aircraft) => {
        setAircraftToDelete(aircraft);
        setDeleteAircraftDialogOpen(true);
    };

    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            "/aircrafts",
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Aeronaves" />

            <div className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Aeronaves"
                        description="Registo de aeronaves"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90  px-4 py-2 has-[>svg]:px-3"
                        href={addaircraft()}
                        prefetch
                    >
                        <Plus /> Registar nova aeronave
                    </Link>
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
                                    Chassi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ano
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Modelo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Cor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {aircrafts.data.map((aircraft: any) => (
                                <tr
                                    key={aircraft.id}
                                    className="transition-colors hover:bg-accent/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {aircraft.chassi}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {aircraft.ano}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {aircraft.modelo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {aircraft.cor}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {aircraft.marca}
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
                                                        href={editaircraft(
                                                            aircraft.id,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar aeronave</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    onClick={() =>
                                                        confirmDeleteAircraft(
                                                            aircraft,
                                                        )
                                                    }
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remover aeronave</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {aircrafts.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
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
                    {aircrafts.links.map((link: any, index: number) => (
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

            <DeleteAircraftModal
                aircraft={aircraftToDelete}
                open={deleteAircraftDialogOpen}
                onOpenChange={setDeleteAircraftDialogOpen}
            />
        </>
    );
}

Aircrafts.layout = {
    breadcrumbs: [
        {
            title: "Aeronaves",
            href: aircrafts(),
        },
    ],
};
