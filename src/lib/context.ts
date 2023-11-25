"use client";

import {createContext} from "react";
import {User} from "@firebase/auth";

export interface IUserContext {
    user?: User;
}

export interface IChannelContext {
    guildId?: string;
    roomId?: string;
}

export const UserContext = createContext<IUserContext>({
    user: undefined,
});

export const GuildContext = createContext<IChannelContext>({
    guildId: undefined,
    roomId: undefined
});

