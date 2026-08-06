import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

// Components
import HouseDisplay from '../components/houseDisplay';
import LikeButton from '../components/likeButton';
import BidBox from '../components/bidBox';

// Interface
import type { Houses } from '../interface/houseIntf';

function HousePage() {
    const { houseid } = useParams();
    const { isLoggedIn, accID } = useAuthContext();

    const [bidOffer, setBidOffer] = useState<string>('');

    // For fetching specific house
    // Makes isLoading true while api gets fetched.
    const [house, setHouse] = useState<Houses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:8080/houses/houses/${houseid}`)
            .then((res) => res.json())
            .then((data: Houses[]) => {
                setHouse(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // ---- Handels like ----
    function handleLike() {
        console.log('Handeling like');
    }

    // ---- Handels Bid ----
    function handleBid() {
        const currentHouseId = house[0].id;
        // A conts for all infromation that is needed for update/add new row in table. Also converts the bidoffer input from string to a number, validation that it can be a number exsist allready in bidBox.tsx.
        const bidInfo = {
            user_id: accID,
            houses_id: currentHouseId,
            price: Number(bidOffer),
        };

        fetch('http://localhost:8080/houses/bids', {
            body: JSON.stringify(bidInfo),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => {
            console.log('response bid', response.status);
        });
    }

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <>
            <h2>Specific house</h2>
            <div className="m-5">
                <HouseDisplay houses={house} isLoading={isLoading} />
            </div>
            <div>
                <LikeButton />
            </div>
            <div>
                <BidBox onBidding={handleBid} setBidOffer={setBidOffer} />
            </div>
        </>
    );
}

export default HousePage;
