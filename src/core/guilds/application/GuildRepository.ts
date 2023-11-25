import {IGuild} from "@/core/guilds/domain/model/Guild";
import {ICreateGuildCommand} from "@/core/guilds/domain/model/command/CreateGuildCommand";

export interface IGuildRepository {
    findGuilds(): Promise<Array<IGuild>>;
    createGuild(command: ICreateGuildCommand): Promise<IGuild>;
}