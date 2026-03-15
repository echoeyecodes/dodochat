import { createContext, useState } from "react";
import { User } from "../types";

type AuthUserContextType = {
    user: User | null;
    updateUser: (user: Partial<User>) => void;
};

export const AuthUserContext = createContext<AuthUserContextType>({
    user: null,
    updateUser: () => {},
});

export const AuthUserProvider = ({
    children,
    user: initialUser,
}: {
    children: React.ReactNode;
    user?: User | null;
}) => {
    const [user, setUser] = useState<User | null>(initialUser ?? null);

    const updateUser = (updates: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return null;
            return { ...prev, ...updates };
        });
    };

    return (
        <AuthUserContext.Provider value={{ user, updateUser }}>{children}</AuthUserContext.Provider>
    );
};
