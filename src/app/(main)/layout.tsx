"use client";

import ChannelNavbar from "@/components/navigation/channels-navbar";
import {GuildContext, UserContext} from "@/lib/context";
import {useUserData} from "@/lib/hooks/user/useUserData";
import {QueryCache, QueryClient, QueryClientProvider} from "react-query";
import {useParams} from "next/navigation";

const queryClient = new QueryClient({
    queryCache: new QueryCache(),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 5000,
            staleTime: Infinity,
        }
    }
})

interface IExpectedParams {
    channelId: string;
    roomId: string;

    [k: string]: any;
}

export default function MainLayout({children}: { children: React.ReactNode }) {
    const userData = useUserData();
    const params = useParams<IExpectedParams>();

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={{user: userData}}>
                <GuildContext.Provider value={{guildId: params.channelId, roomId: params.roomId}}>
                    <div className="bg-[#323338] w-full h-full">
                        <ChannelNavbar/>

                        <main className="absolute md:left-[72px] inset-y-0 right-0">
                            {children}
                        </main>
                    </div>
                </GuildContext.Provider>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}
