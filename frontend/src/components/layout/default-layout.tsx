'use client'

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "../ui/toaster";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DefaultLayout({ children }: { children: React.ReactNode }) {

    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        const handleLoaded = () => setIsloading(false)

        if (document.readyState === "complete" || document.readyState === "interactive") {
            handleLoaded()
        } else {
            window.addEventListener("DOMContentLoaded", handleLoaded)

            return () => {
                window.removeEventListener("DOMContentLoaded", handleLoaded)
            }
        }
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="h-dvh w-dvw flex justify-center items-center"><Loader2 className="w-10 h-10 animate-spin" /></div>
            ) : (
                <>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                    <Toaster />
                </>
            )}
        </>
    )
}