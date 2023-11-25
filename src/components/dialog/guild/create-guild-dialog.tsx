"use client";

import React, {useContext, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ActionTooltip from "@/components/tooltip/action-tooltip";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ImageInput from "@/components/input/image-input";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {storage} from "@/lib/firebase";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import useUserGuilds from "@/lib/hooks/user/useUserGuilds";
import {UserContext} from "@/lib/context";

interface CreateGuildDialogProps {
    children?: React.ReactNode;
};

const createGuildFormSchema = z.object({
    imgPath: z.string().nullish(),
    displayName: z.string().min(2).max(50)
});

function CreateGuildDialog({children}: CreateGuildDialogProps) {
    const [open, setOpen] = useState(false);

    const { mutations: { createGuild } } = useUserGuilds();
    const { user } = useContext(UserContext);

    const form = useForm<z.infer<typeof createGuildFormSchema>>({
        resolver: zodResolver(createGuildFormSchema),
        defaultValues: {
            imgPath: undefined,
            displayName: undefined
        }
    });

    const onSubmit = async (values: z.infer<typeof createGuildFormSchema>) => {
        if (createGuild.isLoading) {
            return;
        }

        if (!user) {
            return;
        }

        createGuild.mutate({
            imgPath: values.imgPath ?? undefined,
            displayName: values.displayName,
            uid: user.uid,
        });

        form.reset();
        setOpen(false);
    }

    const handleFileLoaded = async (file: File) => {
        try {
            const imgRef = `/public/images/${uuidv4()}`;
            const storageRef = ref(storage, imgRef);
            const blob = new Blob([file], {type: file.type});
            const uploadResult = await uploadBytes(storageRef, blob);
            console.log(uploadResult);
            const imgUrl = await getDownloadURL(uploadResult.ref);
            console.log(imgUrl);
            form.setValue('imgPath', imgUrl);
        } catch (e) {
            form.setValue('imgPath', undefined);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-black">Customize your server</DialogTitle>
                    <DialogDescription className="text-center">
                        <span className="block mb-8">Give your new server a personality with a name and an icon. You can always change it later.</span>
                    </DialogDescription>

                    <Form{...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 items-center justify-center w-full"
                        >

                            <ImageInput onFileLoaded={handleFileLoaded} />

                            <div className="grid w-full items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Server's name</FormLabel>
                                            <FormControl>
                                                <Input id="server-name" placeholder="Server's name" {...field}/>
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                By creating a server, you aggree to Discord's Community Guidelines.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <Button type="submit" className="ml-auto bg-[#5864F2]">Create</Button>
                        </form>
                    </Form>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGuildDialog;