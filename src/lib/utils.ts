import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function displayNameToAvatar(displayName?: string | null) {
    if (!displayName) {
        return "JD";
    }

    const splitted = displayName.split(' ');

    if (splitted.length < 2) {
        return displayName.slice(0, 2).toUpperCase();
    }

    return `${splitted[0].at(0)}${splitted[1].at(0)}`.toUpperCase();
}

export function toKebabCase(str: string) {
    return (
        str
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/[\s_]+/g, '-')
            .toLowerCase()
    );
}