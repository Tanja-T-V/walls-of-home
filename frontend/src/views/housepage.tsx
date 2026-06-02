import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { Button } from 'react-bootstrap';

// Components
import HouseDisplay from '../components/houseDisplay';

// Interface
import type { Houses } from '../interface/houseIntf';

function HousePage() {
    const { houseid } = useParams();
    const { isLoggedIn } = useAuthContext();

    const [house, setHouse] = useState<Houses[]>([]);
    // makes isLoading true while api gets fetched.
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

    function handleLike() {
        console.log('Handeling like');
    }

    function handleBid() {
        console.log('Handeling bidding');
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
                <Button variant="primary" onClick={handleLike}>
                    Like
                </Button>
                <Button variant="primary" onClick={handleBid}>
                    Bid
                </Button>
            </div>
        </>
    );
}

export default HousePage;
