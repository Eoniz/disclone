"use client";

import {UserContext} from "@/lib/context";
import {useUserData} from "@/lib/hooks/user/useUserData";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    const userData = useUserData();

    return (
        <UserContext.Provider value={{user: userData}}>
            {children}
        </UserContext.Provider>
    );
}
