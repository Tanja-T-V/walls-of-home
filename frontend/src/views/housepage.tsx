import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import '../style/Housepage.scss';

// Components
import HouseDisplay from '../components/houseDisplay';
import BidBox from '../components/bidBox';

// Interface
import type { Houses, HouseData } from '../interface/houseIntf';

function HousePage() {
    const { houseid } = useParams();
    const { isLoggedIn, accID } = useAuthContext();

    const [bidOffer, setBidOffer] = useState<string>('');

    // For fetching specific house
    // Makes isLoading true while api gets fetched.
    const [house, setHouse] = useState<Houses[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:8080/houses/houses/${houseid}?accID=${accID}`)
            .then((res) => res.json())
            .then((data: HouseData) => {
                setHouse(data.houses);
                setIsLiked(data.isLiked);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // ---- Handels like ----
    function handleLike() {
        const currentHouseId = house[0].id;
        const likeInfo = {
            user_id: accID,
            houses_id: currentHouseId,
        };

        fetch('http://localhost:8080/houses/userfavs', {
            body: JSON.stringify(likeInfo),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        })
            .then((res) => res.json())
            .then((data: boolean) => {
                setIsLiked(data);
            });
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
        <div className="my-5 mx-2 p-2">
            <div>
                <HouseDisplay
                    houses={house}
                    isLoading={isLoading}
                    handleLike={handleLike}
                    isLiked={isLiked}
                />
            </div>

            <div>
                <BidBox onBidding={handleBid} setBidOffer={setBidOffer} />
            </div>
        </div>
    );
}

export default HousePage;
