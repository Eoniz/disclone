import {useMutation, useQuery, useQueryClient} from "react-query";
import {GuildRepositoryImpl} from "@/core/guilds/application/GuildRepositoryImpl";
import {ICreateGuildCommand} from "@/core/guilds/domain/model/command/CreateGuildCommand";

export default function useUserGuilds() {
    const queryClient = useQueryClient();

    const userGuildsQuery = useQuery('query/user/guilds', () => GuildRepositoryImpl.findGuilds());

    const createGuildMutation = useMutation(
        'mutation/user/guilds',
        async (command: ICreateGuildCommand) => {
            return await GuildRepositoryImpl.createGuild(command);
        },
        {
            onSuccess: async (data) => {
                queryClient.invalidateQueries('query/user/guilds');
                return data;
            }
        }
    );

    return {
        queries: {
            guilds: userGuildsQuery
        },
        mutations: {
            createGuild: createGuildMutation,
        }
    }
}