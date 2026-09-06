export function AppFooter() {
            {/*If you want the image on the far left side of the footer and the text on the far right side, use justify-between */}
    return (
        <footer className="flex justify-between mt-auto border-t px-6 py-4 text-sm text-muted-foreground">
        <span className="font-semibold">Força Aérea Nacional (FAN) 2023-2026</span>  <img src="/flag.png" alt="FAN" className="h-4" />  
        </footer>
    );
}