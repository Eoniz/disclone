import React from 'react';
import CharacterBackground from "@/app/(auth)/(components)/character-background";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import LoginViaGoogleButton from "@/components/auth/login-via-google-button";

interface LoginPageProps {

};

function LoginPage({}: LoginPageProps) {
    return (
        <div className="fixed inset-0">
            <div className="z-0 absolute inset-0">
                <CharacterBackground/>
            </div>

            <form className="absolute inset-0 z-10 h-full w-[624px] mx-auto flex items-center justify-center">
                <div
                    className="bg-[#323338] p-[32px] w-full min-h-[400px] shadow-lg rounded-lg text-white flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1 className="font-bold text-2xl">Ha, te revoilà !</h1>
                        <h3 className="font-light text-sm text-gray-400">Nous sommes si heureux de te revoir !</h3>
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input type="email" id="email" placeholder="E-mail"/>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input type="password" id="password" placeholder="Mot de passe"/>
                        </div>

                        <Button className="bg-[#5864F2] w-full">Connexion</Button>

                        <span className="text-gray-400 text-sm">
                            Besoin d'un compte ?
                            <Link className="ml-1 text-[#02A8FC]" href="/register">S'inscrire</Link>
                        </span>
                    </div>

                    <Separator className="my-4"/>

                    <LoginViaGoogleButton/>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;