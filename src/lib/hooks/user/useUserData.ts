"use client";

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase";
import {useEffect} from "react";

export function useUserData() {
    const [user] = useAuthState(auth);

    useEffect(() => {
        let unsubscribe = () => {};

        return unsubscribe;
    }, [user]);

    return user ?? undefined;
}