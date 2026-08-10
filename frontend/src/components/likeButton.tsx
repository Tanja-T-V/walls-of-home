import { Button } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';

type Props = {
    onLike: () => void;
    isLiked: boolean;
};

function LikeButton({ onLike, isLiked }: Props) {
    return (
        <>
            <Button className="primarybtn" onClick={onLike}>
                {isLiked === false ? 'Like' : 'Unlike'}
            </Button>
        </>
    );
}

export default LikeButton;
