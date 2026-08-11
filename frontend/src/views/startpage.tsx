import { useEffect, useState } from 'react';
import Housecard from '../components/housecard';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../style/Startpage.scss';

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
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div className="header-box py-3 px-5 mb-3 d-flex flex-column align-items-center text-center">
                <p className="header-text fs-1 fw-light w-100">
                    Find The Walls You'll Call Home
                </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard houses={houses} isLoading={isLoading} />
            </div>
        </>
    );
}

export default StartPage;
