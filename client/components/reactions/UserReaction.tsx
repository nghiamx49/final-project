import { FC } from "react";
import { ReactionType } from "../../interface/reactionType.enum";
import AngryIcon from "./AngryIcon";
import HahaIcon from "./HahaIcon";
import LikeIcon from "./LikeIcon";
import LoveIcon from "./LoveIcon";
import SadIcon from "./SadIcon";
import WowIcon from "./WowIcon";

interface Props {
    type: string;
    size: string;
}

const UserReaction: FC<Props> = ({type, size}) => {
    const renderIcon = () => {
        switch (type) {
            case ReactionType.LIKE:
                return <LikeIcon size={size} />
            case ReactionType.LOVE:
                return <LoveIcon size={size} />
            case ReactionType.HAHA:
                return <HahaIcon size={size} />
            case ReactionType.WOW:
                return <WowIcon size={size} />
            case ReactionType.SAD:
                return <SadIcon size={size} />
            case ReactionType.ANGRY:
                return <AngryIcon size={size} />
            default:
                return <LikeIcon size={size} />;
        }
    }

    return <>
    {renderIcon()}
    </>
}


export default UserReaction;