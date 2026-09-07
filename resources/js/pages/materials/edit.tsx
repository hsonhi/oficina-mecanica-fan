import React from "react";
import { Form, Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import DeleteUser from "@/components/delete-user";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { materials } from "@/routes";
import type { Auth } from "@/types";
import { send } from "@/routes/verification";
import { Save } from "lucide-react";

type PageProps = {
    auth: Auth;
};

export default function Edit({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6 p-6">
                <Heading variant="default" title="Registar novo material" />

              
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: "Materiais",
            href: materials(),
        },
        {
            title: "Registar novo material",
            href: "",
        },
    ],
};
