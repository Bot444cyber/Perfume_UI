"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthTokenHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("authChange"));
            toast.success("Successfully logged in with Google!");

            // Remove token from URL without reloading the page
            router.replace(window.location.pathname);
        }
    }, [searchParams, router]);

    return null;
}
