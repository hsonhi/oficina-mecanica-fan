import type { SVGAttributes } from "react";

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/logo_transparent.png"
            alt="Oficina Mecânica FAN"
            className="w-44 h-28 object-contain"
        />
    );
}
