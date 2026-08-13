import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

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

    const [bidSucsessfull, setBidSucsessfull] = useState<boolean>(false);
    const [bidOffer, setBidOffer] = useState<string>('');

    // To diabled the bid button for invalid input and after click handeling
    const [bidBtnDisabled, setBidBtnDisabled] = useState<boolean>(true);

    // For fetching specific house
    // Makes isLoading true while api gets fetched.
    const [house, setHouse] = useState<Houses[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userBidPice, setUserBidPice] = useState<number>(-1);

    const [showRemoveMulda, setShowRemoveMulda] = useState<boolean>(false);

    useEffect(() => {
        fetch(`/houses/${houseid}?accID=${accID}`)
            .then((res) => res.json())
            .then((data: HouseData) => {
                setHouse(data.houses);
                setIsLiked(data.isLiked);
                setUserBidPice(data.bidPriceHouse);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [houseid, accID]);

    // ---- Handels like ----
    function handleLike() {
        const currentHouseId = house[0].id;
        const likeInfo = {
            user_id: accID,
            houses_id: currentHouseId,
        };

        fetch('/houses/userfavs', {
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
    async function handleBid() {
        const currentHouseId = house[0].id;
        setBidBtnDisabled(true);

        // A conts for all infromation that is needed for update/add new row in table. Also converts the bidoffer input from string to a number, validation that it can be a number exsist allready in bidBox.tsx.
        const bidInfo = {
            user_id: accID,
            houses_id: currentHouseId,
            price: Number(bidOffer),
        };
        try {
            const res = await fetch('/houses/bids', {
                body: JSON.stringify(bidInfo),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (res.status === 201) {
                setBidSucsessfull(true);
                setUserBidPice(bidInfo.price);

                setTimeout(() => {
                    setBidSucsessfull(false);
                }, 4000);
                return;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //--- Handle remove bid
    async function handleRemoveBid() {
        setShowRemoveMulda(false);
        const deleteInfo = {
            user_id: accID,
            houses_id: Number(houseid),
        };
        try {
            const res = await fetch('/houses/bids', {
                body: JSON.stringify(deleteInfo),
                headers: { 'Content-Type': 'application/json' },
                method: 'DELETE',
            });

            if (res.status === 204) {
                setUserBidPice(-1);
                return;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

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

            {isLoading === false && (
                <div className="boxwidth-house">
                    <BidBox
                        onBidding={handleBid}
                        setBidOffer={setBidOffer}
                        bidSucsessfull={bidSucsessfull}
                        userBidPice={userBidPice}
                        bidcurrency={house[0].currency}
                        setShowRemoveMulda={setShowRemoveMulda}
                        bidBtnDisabled={bidBtnDisabled}
                        setBidBtnDisabled={setBidBtnDisabled}
                    />
                </div>
            )}

            {showRemoveMulda && (
                <div
                    className="modal fade show d-block"
                    id="confirmBidDelete"
                    tabIndex={-1}
                >
                    <div className="modal-dialog modal-dialog-centerd">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Remove bid on house
                                </h5>
                            </div>

                            <div className="modal-body">
                                <p>Are you sure you want to remove your bid?</p>
                                <p>
                                    Your bid offer will be removed from this
                                    property.
                                </p>
                            </div>

                            <div className="modal-footer">
                                <Button
                                    className="secondarybtn"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowRemoveMulda(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={handleRemoveBid}
                                >
                                    Confirm remove
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HousePage;
