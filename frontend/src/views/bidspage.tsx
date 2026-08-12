import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../style/BidPage.scss';

import BidCards from '../components/bidcard';
import type { Houses, BidHouses } from '../interface/houseIntf';

function BidPage() {
    const { isLoggedIn, accID } = useAuthContext();
    const userInfo = accID;

    const [houses, setHouses] = useState<Houses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [userBids, setUserBids] = useState<BidHouses[]>([]);
    useEffect(() => {
        fetch(`/houses/bids/${userInfo}`)
            .then((res) => res.json())
            .then((data: BidHouses[]) => {
                setUserBids(data);
            })
            .finally(() => {});
    }, [userInfo]);

    // Looks on userfavs if it updates. Runs const function and either does insert or update depending if there is already a bid on the house.
    useEffect(() => {
        const getBidHouses = async () => {
            // Make array from userfavs.house_id
            const wantedHousID = {
                houses_id: userBids.map((bid) => bid.houses_id),
            };

            try {
                const res = await fetch('/houses', {
                    body: JSON.stringify(wantedHousID),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });

                if (res.status === 201) {
                    const data: Houses[] = await res.json();
                    setHouses(data);
                    setIsLoading(false);

                    return;
                } else {
                    return;
                }
            } catch (error) {
                console.error(error);
            }
        };

        getBidHouses();
    }, [userBids]);

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div className="bid-box p-3 mb-3 d-flex flex-column align-items-center text-center">
                <p className="header-text-bid fs-1 fw-light mb-2 w-100">
                    Bids & offers
                </p>
                <p className="bid-text fs-6 fw-lighter w-100">
                    Follow your active bids and keep track of the homes you're
                    intressted in.
                </p>
            </div>

            {houses.length === 0 && isLoading === false && (
                <div className="p-3 mb-3 d-flex flex-column align-items-center text-center">
                    <p className=" fs-1 fw-light mb-2 w-100">No bids yet</p>
                    <p className=" fs-6 fw-lighter w-100">
                        Found a place you love? Whne you're ready, you can make
                        an offer and follow it here.
                    </p>
                </div>
            )}

            {houses.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center">
                    <BidCards
                        houses={houses}
                        bidhouses={userBids}
                        isLoading={isLoading}
                    />
                </div>
            )}
        </>
    );
}

export default BidPage;
