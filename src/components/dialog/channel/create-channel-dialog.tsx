"use client";

import React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ImageInput from "@/components/input/image-input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toKebabCase} from "@/lib/utils";
import useGuildChannels from "@/lib/hooks/guild/useGuildChannels";

interface CreateChannelDialogProps {
    open: boolean;
    onOpenChange(open: boolean): void;
    guildId: string;
    channelGroupId: string;
};

const createChannelFormSchema = z.object({
    displayName: z.string().min(2).max(50)
});


function CreateChannelDialog({open, onOpenChange, guildId, channelGroupId}: CreateChannelDialogProps) {
    const { mutations: { createChannel } } = useGuildChannels(guildId);

    const form = useForm<z.infer<typeof createChannelFormSchema>>({
        resolver: zodResolver(createChannelFormSchema),
        defaultValues: {
            displayName: undefined
        }
    });

    const onSubmit = async (values: z.infer<typeof createChannelFormSchema>) => {
        createChannel.mutate({
            channelGroupId: channelGroupId,
            guildId: guildId,
            displayName: toKebabCase(values.displayName),
            type: "text"
        });

        form.reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">Create channel</DialogTitle>
                    <DialogDescription>
                        <span className="block mb-4">in Text Channels.</span>
                    </DialogDescription>
                </DialogHeader>

                <Form{...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 items-center justify-center w-full"
                    >

                        <div className="grid w-full items-center gap-2">
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Channel name</FormLabel>
                                        <FormControl>
                                            <Input id="server-name" placeholder="new-channel" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button type="submit" className="ml-auto bg-[#5864F2]">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelDialog;