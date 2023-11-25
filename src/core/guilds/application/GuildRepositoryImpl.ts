import {IGuildRepository} from "@/core/guilds/application/GuildRepository";
import {IGuild} from "@/core/guilds/domain/model/Guild";
import {firestore} from "@/lib/firebase";
import {collection, doc, getDocs, setDoc, writeBatch} from "@firebase/firestore";
import {ICreateGuildCommand} from "@/core/guilds/domain/model/command/CreateGuildCommand";
import {createCollection} from "@radix-ui/react-collection";

export const GuildRepositoryImpl: IGuildRepository = {
    async findGuilds(): Promise<Array<IGuild>> {
        const guildsCollection = collection(firestore, 'guilds');
        const docs = (await getDocs(guildsCollection)).docs;

        return docs.map((doc) => {
            const { displayName, imageUrl } = doc.data();
            return {
                id: doc.id,
                displayName: displayName,
                imageUrl: imageUrl ?? undefined,
            } satisfies IGuild;
        });
    },

    async createGuild(command: ICreateGuildCommand): Promise<IGuild> {
        const guildsCollection = collection(firestore, 'guilds');
        const guildDoc = doc(guildsCollection);

        await setDoc(
            guildDoc,
            JSON.parse(JSON.stringify({
                uid: command.uid,
                displayName: command.displayName,
                imageUrl: command.imgPath,
            }))
        );

        const createdGuild = {
            id: guildDoc.id,
            displayName: command.displayName,
            imageUrl: command.imgPath,
        } satisfies IGuild;

        await createDefaultChannels(createdGuild);

        return createdGuild
    }
}

async function createDefaultChannels(guild: IGuild) {
    const batch = writeBatch(firestore);

    const channelGroupRef = collection(firestore, 'guilds', guild.id, 'channels-group');
    const textChannelRef = doc(channelGroupRef);
    const voiceChannelRef = doc(channelGroupRef);

    const textChannelsRef = collection(textChannelRef, 'channels');
    const voiceChannelsRef = collection(voiceChannelRef, 'channels');

    const textDefaultChannelRef = doc(textChannelsRef);
    const voiceDefaultChannelRef = doc(voiceChannelsRef);

    batch.set(textChannelRef, { displayName: 'text channels' });
    batch.set(voiceChannelRef, { displayName: 'voice channels' });
    batch.set(textDefaultChannelRef, { displayName: 'general', type: 'text' });
    batch.set(voiceDefaultChannelRef, { displayName: 'general', type: 'voice' });

    return batch.commit();
}