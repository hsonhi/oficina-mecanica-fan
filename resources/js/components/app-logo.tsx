import { usePage } from "@inertiajs/react";

import AppLogoIcon from "@/components/app-logo-icon";

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            {/*
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
             */}
            <img src="/logo_transparent.png" alt="Logo" className="h-8" />
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate leading-tight ">
                    Oficina Mecânica <span className="font-semibold">FAN</span>
                </span>
            </div>
        </>
    );
}
