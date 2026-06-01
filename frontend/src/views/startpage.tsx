import { useEffect, useState } from 'react';
import Housecard from '../components/housecard';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

// House interfaces
import type { Houses } from '../interface/houseIntf';

function StartPage() {
    const { isLoggedIn } = useAuthContext();

    const [houses, setHouses] = useState<Houses[]>([]);
    // makes isLoading true while api gets fetched.
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Uses Houses interface and makse data use it.
    useEffect(() => {
        fetch('http://localhost:8080/houses/houses')
            .then((res) => res.json())
            .then((data: Houses[]) => {
                setHouses(data);
            })
            .finally(() => {
                // Changes is loading when its all fetched.
                setIsLoading(false);
            });
    }, []);

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <>
            <div className="m-5">
                <p>Properties for sale!</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard houses={houses} isLoading={isLoading} />
            </div>
        </>
    );
}

export default StartPage;
