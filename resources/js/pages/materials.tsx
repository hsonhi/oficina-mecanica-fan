import { Form, Head, usePage, Link } from "@inertiajs/react";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import DeleteUser from "@/components/delete-user";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { materials, addmaterial } from "@/routes";
import type { Auth } from "@/types";
import { send } from "@/routes/verification";
import React from "react";
import type { Material } from "@/types/fan";
import { Eye, LogOut, Pencil, Plus } from "lucide-react";

type Props = {
    materials: Material[];
};

export default function Materials({ materials }: Props) {
    // 🔍 This hooks directly into Inertia's global store to grab all active props
    const { props } = usePage();

    // Print this out in your browser console (F12) to see what keys exist!
    console.log("All incoming props from Laravel:", materials);

    return (
        <>
            <Head title="Materiais" />

            <div className="mx-auto p-6">
                {/**<h1 className="text-2xl font-bold mb-4">Materiais</h1> */}

                <div className="flex items-center justify-between">
                    <Heading
                        title="Materiais"
                        description="Registo de materiais para reparação de aeronaves"
                    />
                    <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90  px-4 py-2 has-[>svg]:px-3"
                        href={addmaterial()}
                        prefetch
                    >
                        <Plus /> Registar novo material
                    </Link>
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {materials.data.map((mat) => (
                                <tr
                                    key={mat.id}
                                    className="transition-colors hover:bg-accent/50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {mat.nome}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.valor}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {mat.descricao}
                                    </td>
                                </tr>
                            ))}
                            {materials.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-sm text-muted-foreground"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination Links */}
                {/* href={link.url || '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }} */}
                <div className="mt-4 flex gap-1 justify-center">
                    {materials.data.map((link, idx) => (
                        <Link
                            key={idx}
                            className={`rounded border border-border px-3 py-1 text-sm transition-colors ${
                                link.active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

Materials.layout = {
    breadcrumbs: [
        {
            title: "Materiais",
            href: materials(),
        },
    ],
};
