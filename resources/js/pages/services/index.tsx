import { Head, Link, router, usePage } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, FormEvent } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    index as services,
    add as addservice,
    edit as editservice,
    view as viewservice,
} from "@/routes/services";
import type { Service } from "@/types/fan";
import {
    Search,
    Trash,
    Pencil,
    Plus,
    Calendar,
    Cog,
    Users,
    Eye,
} from "lucide-react";
import DeleteServiceModal from "@/components/delete-service-modal";

type Props = {
    services: any;
    filters: any;
};

export default function Materials({ services, filters }: Props) {
    const [deleteServiceDialogOpen, setDeleteServiceDialogOpen] =
        useState(false);

    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(
        null,
    );

    const confirmDeleteService = (material: Service) => {
        setServiceToDelete(material);
        setDeleteServiceDialogOpen(true);
    };

    // Validate status
    const today = new Date();
    const isTodayBetweenDates = (current: any, start: any, end: any) => {
        return (
            current.getTime() >= start.getTime() &&
            current.getTime() <= end.getTime()
        );
    };

    const formatDate = (date: any) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            "/services",
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    console.log(services);
    return (
        <>
            <Head title="Serviços" />

            <div className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Serviços"
                        description="Registo de serviços"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90  px-4 py-2 has-[>svg]:px-3"
                        href={addservice()}
                        prefetch
                    >
                        <Plus /> Registar serviço
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
                                    Aeronave
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Data
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Mecânicos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Materiais
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {services.data.map((mat: any) => (
                                <tr
                                    key={mat.id}
                                    className="transition-colors hover:bg-accent/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {" "}
                                        {mat.aircrafts.chassi}{" "}
                                        {mat.aircrafts.marca}{" "}
                                        {mat.aircrafts.modelo}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="text-sm" />
                                            <span className="">
                                                {formatDate(
                                                    new Date(mat.data_inicio),
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                    new Date(mat.data_fim),
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <Users className="text-sm" />
                                            <span className="">
                                                {
                                                    /*mat.mechanics.map((m: any) => (
                                            <span> {m.nome}</span>
                                        )) */ mat.mechanics.length
                                                }
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <Cog className="text-sm" />
                                            <span className="">
                                                {
                                                    /*mat.materials.map((m: any) => (
                                            <span> {m.nome}</span>
                                        )) */ mat.materials.length
                                                }
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <Badge
                                            variant="outline"
                                            className={
                                                isTodayBetweenDates(
                                                    today,
                                                    new Date(mat.data_inicio),
                                                    new Date(mat.data_fim),
                                                )
                                                    ? "border-amber-500/50 text-amber-700 dark:text-amber-400"
                                                    : "border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
                                            }
                                        >
                                            <span
                                                className={
                                                    isTodayBetweenDates(
                                                        today,
                                                        new Date(
                                                            mat.data_inicio,
                                                        ),
                                                        new Date(mat.data_fim),
                                                    )
                                                        ? "size-1.5 rounded-full bg-amber-500"
                                                        : "size-1.5 rounded-full bg-emerald-500"
                                                }
                                            />
                                            {isTodayBetweenDates(
                                                today,
                                                new Date(mat.data_inicio),
                                                new Date(mat.data_fim),
                                            )
                                                ? "Em manutenção"
                                                : "Concluído"}
                                        </Badge>
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
                                                        href={viewservice(
                                                            mat.id,
                                                        )}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Ver detalhes do serviço</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    asChild
                                                >
                                                    <Link
                                                        href={editservice(
                                                            mat.id,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar serviço</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    data-test="team-edit-button"
                                                    onClick={() =>
                                                        confirmDeleteService(
                                                            mat,
                                                        )
                                                    }
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remover serviço</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {services.data.length === 0 ? (
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

                {/*<p className="m-0">
                    Showing <span>{materials.from}</span> to <span>{materials.to}</span> of <span>{materials.total}</span> entries
                </p> */}

                <div className="mt-4 flex gap-1 justify-center">
                    {services.links.map((link: any, index: number) => (
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

            <DeleteServiceModal
                service={serviceToDelete}
                open={deleteServiceDialogOpen}
                onOpenChange={setDeleteServiceDialogOpen}
            />
        </>
    );
}

Materials.layout = {
    breadcrumbs: [
        {
            title: "Serviços",
            href: services(),
        },
    ],
};
