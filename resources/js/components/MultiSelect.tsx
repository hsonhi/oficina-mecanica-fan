import React, { useState, useRef, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface SelectOption {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: SelectOption[];
    selected: string[];
    onChange: (selected: string[]) => void;
    name?: string; // Added optional name prop for native form submissions
}

export default function MultiSelect({
    options,
    selected,
    onChange,
    name,
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown and clear search when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter options based on user input
    const filteredOptions = useMemo(() => {
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [options, searchQuery]);

    const handleToggleOption = (value: string): void => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const handleRemoveBadge = (e: React.MouseEvent, value: string): void => {
        e.stopPropagation();
        onChange(selected.filter((item) => item !== value));
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* 
        Hidden native select element. 
        When 'name' is provided, native forms can automatically read the selected values.
      */}
            {name && (
                <select
                    name={name}
                    multiple
                    value={selected}
                    className="sr-only"
                    onChange={() => {}} // Handled by parent li click
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
            {/* Input / Trigger Box */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border-input flex min-h-9 w-full min-w-0 cursor-pointer flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] md:text-sm"
            >
                {selected.length === 0 && (
                    <span className="text-muted-foreground">
                        Selecionar uma opção...
                    </span>
                )}
                {selected.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return (
                        <span
                            key={val}
                            className="border-border bg-muted text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium"
                        >
                            {opt ? opt.label : val}
                            <button
                                type="button"
                                onClick={(e) => handleRemoveBadge(e, val)}
                                className="text-muted-foreground hover:text-foreground focus:outline-none"
                            >
                                &times;
                            </button>
                        </span>
                    );
                })}
                <div className="text-muted-foreground ml-auto pl-1">
                    <svg
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="border-border bg-popover text-popover-foreground absolute z-10 mt-1 flex max-h-60 w-full flex-col overflow-y-auto rounded-md border shadow-md">
                    {/* Sticky Search Input */}
                    <div className="border-border bg-popover sticky top-0 z-10 border-b p-2">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent closing dropdown
                                className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-full rounded-md border bg-transparent px-3 py-1.5 pl-8 text-sm shadow-xs transition-[color,box-shadow] outline-none"
                            />
                            <div className="text-muted-foreground pointer-events-none absolute left-2.5">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery("");
                                    }}
                                    className="text-muted-foreground hover:text-foreground absolute right-2 px-1 text-xs"
                                >
                                    Limpar
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options List */}
                    <ul className="p-1 overflow-y-auto max-h-48">
                        {filteredOptions.length === 0 ? (
                            <li className="text-muted-foreground px-3 py-4 text-center text-sm">
                                No options found
                            </li>
                        ) : (
                            filteredOptions.map((option) => {
                                const isSelected = selected.includes(
                                    option.value,
                                );
                                return (
                                    <li
                                        key={option.value}
                                        onClick={() =>
                                            handleToggleOption(option.value)
                                        }
                                        className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                            isSelected
                                                ? "bg-accent font-medium text-accent-foreground"
                                                : "text-foreground"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={isSelected}
                                                onChange={() => {}} // Handled by parent li click
                                                tabIndex={3}
                                            />
                                            {option.label}
                                        </span>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
