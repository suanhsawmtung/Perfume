import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";

type AuthRequiredContent = {
    title: string;
    description: string;
};

type AuthRequiredContextValue = {
    isOpen: boolean;
    title: string;
    description: string;
    openAuthRequiredDialog: (content?: AuthRequiredContent) => void;
    closeAuthRequiredDialog: () => void;
    toggleAuthRequiredDialog: (content?: AuthRequiredContent) => void;
};

const DEFAULT_CONTENT: AuthRequiredContent = {
    title: "Sign in required",
    description: "You need to sign in to continue with this action.",
};

export const AuthRequiredContext = createContext<AuthRequiredContextValue | undefined>(
    undefined
);

export function AuthRequiredProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<AuthRequiredContent>(DEFAULT_CONTENT);

    const openAuthRequiredDialog = useCallback((newContent?: AuthRequiredContent) => {
        setContent(newContent ?? DEFAULT_CONTENT);
        setIsOpen(true);
    }, []);

    const closeAuthRequiredDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    // toggle keeps your original wording, but for this use case
    // you'll almost always call openAuthRequiredDialog directly instead.
    const toggleAuthRequiredDialog = useCallback((newContent?: AuthRequiredContent) => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) setContent(newContent ?? DEFAULT_CONTENT);
            return next;
        });
    }, []);

    return (
        <AuthRequiredContext.Provider
            value={{
                isOpen,
                title: content.title,
                description: content.description,
                openAuthRequiredDialog,
                closeAuthRequiredDialog,
                toggleAuthRequiredDialog,
            }}
        >
            {children}
        </AuthRequiredContext.Provider>
    );
}

export function useAuthRequired() {
    const ctx = useContext(AuthRequiredContext);
    if (!ctx) {
        throw new Error("useAuthRequired must be used within an AuthDialogProvider");
    }
    return ctx;
}