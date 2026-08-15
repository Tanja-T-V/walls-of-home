import { useEffect, useState } from 'react';
import Housecard from '../components/housecard';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../style/Startpage.scss';

// House interfaces
import type { Houses, Houseimgs, HouseWImages } from '../interface/houseIntf';

function StartPage() {
    const { isLoggedIn } = useAuthContext();

    const [houses, setHouses] = useState<Houses[]>([]);
    const [houseimgs, setHouseImgs] = useState<Houseimgs[]>([]);

    // makes isLoading true while api gets fetched.
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Uses Houses interface and makse data use it.
    useEffect(() => {
        fetch('/houses')
            .then((res) => res.json())
            .then((data: HouseWImages) => {
                setHouses(data.houses);
                setHouseImgs(data.houseimgs);
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
            <div className="header-box p-3 mb-3 d-flex flex-column align-items-center text-center">
                <h1 className="header-text fs-1 fw-light mb-2 w-100">
                    Find The Walls You'll Call Home
                </h1>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard
                    houses={houses}
                    isLoading={isLoading}
                    houseimgs={houseimgs}
                />
            </div>
        </>
    );
}

export default StartPage;
