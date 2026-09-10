import { Head, Link } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { index as services, edit as editService } from "@/routes/services";
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    Cog,
    Pencil,
    Plane,
    Users,
    User,
    Wrench,
} from "lucide-react";

type Props = {
    service: any;
};

export default function EditService({ service }: Props) {
    const serviceRecord = service[0];
    const today = new Date();
    const isInProgress = (current: Date, start: Date, end: Date) => {
        return (
            current.getTime() >= start.getTime() &&
            current.getTime() <= end.getTime()
        );
    };

    const formatDate = (dateValue: string) => {
        const date = new Date(dateValue);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const active = isInProgress(
        today,
        new Date(serviceRecord.data_inicio),
        new Date(serviceRecord.data_fim),
    );

    console.log(service);
    return (
        <>
            <Head title="Detalhes do serviço" />

            <h1 className="sr-only">Detalhes do serviço</h1>

            <div className=" space-y-8 p-6 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <Heading
                            variant="default"
                            title="Detalhes do serviço"
                            description="Consulte o planeamento e os recursos associados a esta intervenção."
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={services()}>
                                <ArrowLeft />
                                Voltar
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={editService(serviceRecord.id)}>
                                <Pencil />
                                Editar serviço
                            </Link>
                        </Button>
                    </div>
                </div>

                <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    <div className="flex flex-col gap-4 border-b bg-muted/30 p-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Plane className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Aeronave em intervenção
                                </p>
                                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                                    {serviceRecord.aircrafts.chassi}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {serviceRecord.aircrafts.marca}{" "}
                                    {serviceRecord.aircrafts.modelo}
                                </p>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={
                                active
                                    ? "border-amber-500/50 text-amber-700 dark:text-amber-400"
                                    : "border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
                            }
                        >
                            <span
                                className={
                                    active
                                        ? "size-1.5 rounded-full bg-amber-500"
                                        : "size-1.5 rounded-full bg-emerald-500"
                                }
                            />
                            {active ? "Em manutenção" : "Concluído"}
                        </Badge>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-3">
                        <div className="flex gap-2">
                            <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Período do serviço
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {formatDate(serviceRecord.data_inicio)} até{" "}
                                    {formatDate(serviceRecord.data_fim)}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <User className="mt-0.5 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Registo</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {serviceRecord.user.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Wrench className="mt-0.5 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Referência do serviço
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    #{serviceRecord.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                    <section className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <ClipboardList className="size-5 text-primary" />
                            <h2 className="font-semibold">
                                Descrição da intervenção
                            </h2>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                            {serviceRecord.descricao}
                        </p>
                    </section>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                        <ResourceSection
                            icon={Users}
                            title="Mecânicos"
                            items={serviceRecord.mechanics}
                        />
                        <ResourceSection
                            icon={Cog}
                            title="Materiais"
                            items={serviceRecord.materials}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function ResourceSection({
    icon: Icon,
    title,
    items,
}: {
    icon: typeof Users;
    title: string;
    items: { id: number; nome: string }[];
}) {
    return (
        <section className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <h2 className="font-semibold">{title}</h2>
                </div>
                <span className="text-sm text-muted-foreground">
                    {items.length}
                </span>
            </div>
            {items.length > 0 ? (
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="rounded-md bg-muted/50 px-3 py-2 text-sm"
                        >
                            {item.nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Nenhum registo associado.
                </p>
            )}
        </section>
    );
}

EditService.layout = (props: { service: {} }) => ({
    breadcrumbs: [
        {
            title: "Serviços",
            href: services(),
        },
        {
            title: "Detalhes do serviço",
            href: "",
        },
    ],
});
