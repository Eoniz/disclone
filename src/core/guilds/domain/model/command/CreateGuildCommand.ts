import type {User} from "@firebase/auth";

export interface ICreateGuildCommand {
    readonly imgPath?: string;
    readonly displayName: string;
    readonly uid: User['uid'];
}
