import { Head, Link, router, usePage } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    index as users,
    add as adduser,
    edit as edituser,
} from "@/routes/users";
import type { User } from "@/types";
import { Search, Trash, Pencil, Plus, KeyRound, UserKey } from "lucide-react";
import DeleteUserModal from "@/components/delete-user-modal";

type Props = {
    users: any;
    filters: any;
};

export default function Users({ users, filters }: Props) {
    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);

    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const confirmDeleteUser = (user: User) => {
        setUserToDelete(user);
        setDeleteUserDialogOpen(true);
    };
    const { props } = usePage();

    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            "/users",
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <Head title="Usuários" />

            <div className="mx-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Usuários"
                        description="Registo de usuários"
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90  px-4 py-2 has-[>svg]:px-3"
                        href={adduser()}
                        prefetch
                    >
                        <Plus /> Registar usuário
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
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Patente
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Telefone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    NIF
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Acesso
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.data.map((mat: any) => (
                                <tr
                                    key={mat.id}
                                    className="transition-colors hover:bg-accent/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {mat.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.patent}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.taxid}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.role == "administrador" ? (
                                            <KeyRound />
                                        ) : (
                                            <UserKey />
                                        )}
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
                                                        href={edituser(mat.id)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar usuário</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {props.auth.user.id != mat.id &&
                                        mat.id != 1 ? (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        data-test="team-edit-button"
                                                        onClick={() =>
                                                            confirmDeleteUser(
                                                                mat,
                                                            )
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Remover usuário</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <span></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
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
                    {users.links.map((link: any, index: number) => (
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

            <DeleteUserModal
                user={userToDelete}
                open={deleteUserDialogOpen}
                onOpenChange={setDeleteUserDialogOpen}
            />
        </>
    );
}

Users.layout = {
    breadcrumbs: [
        {
            title: "Usuários",
            href: users(),
        },
    ],
};
