import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowUpRight,
    CalendarDays,
    Cog,
    Plane,
    Users,
    Wrench,
} from "lucide-react";
import PendingInvitationsModal from "@/components/pending-invitations-modal";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { index as servicesRoute } from "@/routes/services";
import { dashboard } from "@/routes";
import type { DashboardInvitation } from "@/types";

type Props = {
    pendingInvitations?: DashboardInvitation[];
    statistics: {
        aircraft: number;
        services: number;
        mechanics: number;
        materials: number;
        activeServices: number;
        upcomingServices: number;
        recentServices: {
            id: number;
            aircraft: string;
            chassi?: string;
            startDate: string;
            endDate: string;
        }[];
    };
};

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "short" }).format(
        new Date(`${date}T00:00:00`),
    );

export default function Dashboard({
    pendingInvitations = [],
    statistics,
}: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );
    const metrics = [
        { label: "Serviços", value: statistics.services, icon: Wrench },
        { label: "Aeronaves", value: statistics.aircraft, icon: Plane },
        { label: "Mecânicos", value: statistics.mechanics, icon: Users },
        { label: "Materiais", value: statistics.materials, icon: Cog },
    ];

    return (
        <>
            <Head title="Visão geral" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Visão geral
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Acompanhe o estado atual da oficina.
                        </p>
                    </div>
                    <Link
                        href={servicesRoute()}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                        Ver todos os serviços{" "}
                        <ArrowUpRight className="size-4" />
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map(({ label, value, icon: Icon }) => (
                        <Card key={label} className="gap-4 py-5">
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {label}
                                    </p>
                                    <p className="mt-2 text-3xl font-semibold tracking-tight">
                                        {value}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                    <Icon className="size-5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Serviços recentes</CardTitle>
                            <CardDescription>
                                Os últimos serviços registados na oficina.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {statistics.recentServices.length > 0 ? (
                                <div className="divide-y">
                                    {statistics.recentServices.map(
                                        (service) => (
                                            <div
                                                key={service.id}
                                                className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="rounded-md bg-muted p-2">
                                                        <Plane className="size-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium">
                                                            {service.aircraft}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {service.chassi ||
                                                                "Sem chassi"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <CalendarDays className="size-3.5" />
                                                    {formatDate(
                                                        service.startDate,
                                                    )}{" "}
                                                    -{" "}
                                                    {formatDate(
                                                        service.endDate,
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <p className="py-6 text-sm text-muted-foreground">
                                    Ainda não existem serviços registados.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Estado dos serviços</CardTitle>
                            <CardDescription>
                                Atividade planeada e em curso.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-semibold">
                                        {statistics.activeServices}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Em curso hoje
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
                                >
                                    Ativos
                                </Badge>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Próximos serviços
                                    </span>
                                    <span className="font-medium">
                                        {statistics.upcomingServices}
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                    <div className="h-full w-2/3 rounded-full bg-primary" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Agenda futura</span>
                                    <span>{statistics.services} no total</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: "Visão geral",
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : "/",
        },
    ],
});
