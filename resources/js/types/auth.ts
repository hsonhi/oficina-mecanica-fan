export type User = {
    id: number;
    name: string;
    email: string;
    phone: number;
    patent: string;
    taxid: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};
