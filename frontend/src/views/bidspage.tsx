import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

import BidCards from '../components/bidcard';
import type { Houses, BidHouses } from '../interface/houseIntf';

function BidPage() {
    const { isLoggedIn, accID } = useAuthContext();
    const userInfo = accID;

    const [houses, setHouses] = useState<Houses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [userBids, setUserBids] = useState<BidHouses[]>([]);
    useEffect(() => {
        fetch(`http://localhost:8080/houses/bids/${userInfo}`)
            .then((res) => res.json())
            .then((data: BidHouses[]) => {
                setUserBids(data);
            })
            .finally(() => {});
    }, []);

    async function getBidHouses() {
        // Make array from userfavs.house_id
        const wantedHousID = {
            houses_id: userBids.map((bid) => bid.houses_id),
        };

        try {
            const res = await fetch('http://localhost:8080/houses/houses', {
                body: JSON.stringify(wantedHousID),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            if (res.status === 200) {
                const data: Houses[] = await res.json();
                setHouses(data);
                setIsLoading(false);

                return;
            } else {
                return;
            }
        } catch (error) {
            console.log('Backend Error');
        }
    }

    // Looks on userfavs if it updates, runs function that gets the userfavs houses.
    useEffect(() => {
        getBidHouses();
    }, [userBids]);

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <>
            <h2>Bid page</h2>
            <BidCards
                houses={houses}
                bidhouses={userBids}
                isLoading={isLoading}
            />
        </>
    );
}

export default BidPage;
