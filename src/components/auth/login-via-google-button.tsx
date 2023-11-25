"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {signInWithPopup} from "@firebase/auth";
import {auth, googleAuthProvider} from "@/lib/firebase";
import {useRouter} from "next/navigation";

interface LoginViaGoogleButtonProps {

};

function LoginViaGoogleButton({}: LoginViaGoogleButtonProps) {
    const router = useRouter();

    const handleLoginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
            router.push("/channels/me/123");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Button
            className="bg-[#5864F2] w-full"
            onClick={() => handleLoginWithGoogle()}
        >
            Connexion avec google
        </Button>
    );
};

export default LoginViaGoogleButton;