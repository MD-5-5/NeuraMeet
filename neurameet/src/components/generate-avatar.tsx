import { createAvatar } from "@dicebear/core";
import {botttsNeutral , initals} from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface GenerateAvatarProps{
    seed:string;
    className? : string;
    variant: "botttsNeutral" | "initals"
}

export const GeneratedAvatar = ({
    seed,
    className,
    variant
}: GeneratedAvatarProps) => {
    let avatar;

    if(variant === "botttsNeutral"){
        avatar = createAvatar(botttsNeutral,{
            seed,
        })
    } else{
        avatar = createAvatar(initials, {
            seed,
            fontweight:500,
            fontsize:42,
        });
    }

    return(
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )


}