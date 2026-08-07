import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

import Housecard from '../components/housecard';

// House interfaces
import type { Houses, FavHouses } from '../interface/houseIntf';

function MylikesPage() {
    const { isLoggedIn, accID } = useAuthContext();
    const userInfo = accID;

    const [houses, setHouses] = useState<Houses[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Users favs from database.
    const [userfavs, setUserFavs] = useState<FavHouses[]>([]);
    useEffect(() => {
        fetch(`http://localhost:8080/houses/userfavs/${userInfo}`)
            .then((res) => res.json())
            .then((data: FavHouses[]) => {
                setUserFavs(data);
            })
            .finally(() => {});
    }, []);

    // Does a post to get all houses with matching id
    async function getFavHouses() {
        // Make array from userfavs.house_id
        const wantedHousID = {
            houses_id: userfavs.map((fav) => fav.houses_id),
        };

        try {
            const res = await fetch('http://localhost:8080/houses/houses', {
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
            console.log('Backend Error');
        }
    }

    // Looks on userfavs if it updates, runs function that gets the userfavs houses.
    useEffect(() => {
        getFavHouses();
    }, [userfavs]);

    // If user isnt logged in gets redirested to start.
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <p>My liked houses</p>
            <p>USer liked API:</p>
            <div className="d-flex flex-wrap justify-content-center">
                <Housecard houses={houses} isLoading={isLoading} />
            </div>
        </div>
    );
}

export default MylikesPage;
