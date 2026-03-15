import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type FilesSidebarContextType = {
    isDesktopFilesOpen: boolean;
    isMobileFilesOpen: boolean;
    setDesktopFilesOpen: (open: boolean) => void;
    setMobileFilesOpen: (open: boolean) => void;
    toggleFiles: () => void;
};

const FilesSidebarContext = createContext<FilesSidebarContextType | null>(null);

export const FilesSidebarProvider = ({ children }: { children: ReactNode }) => {
    // Desktop is open by default
    const [isDesktopFilesOpen, setDesktopFilesOpen] = useState(true);
    // Mobile/Sheet is always closed by default
    const [isMobileFilesOpen, setMobileFilesOpen] = useState(false);

    const toggleFiles = () => {
        if (window.innerWidth >= 1280) {
            setDesktopFilesOpen(!isDesktopFilesOpen);
        } else {
            setMobileFilesOpen(!isMobileFilesOpen);
        }
    };

    // Ensure mobile sheet is closed if window is resized to desktop, and vice versa if needed
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setMobileFilesOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <FilesSidebarContext.Provider
            value={{
                isDesktopFilesOpen,
                isMobileFilesOpen,
                setDesktopFilesOpen,
                setMobileFilesOpen,
                toggleFiles,
            }}
        >
            {children}
        </FilesSidebarContext.Provider>
    );
};

export const useFilesSidebar = () => {
    const context = useContext(FilesSidebarContext);
    if (!context) {
        throw new Error("useFilesSidebar must be used within a FilesSidebarProvider");
    }
    return context;
};
