import { Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Interface
import type { Houses } from '../interface/houseIntf';

type Props = {
    houses: Houses[];
    isLoading: boolean;
};

function HouseCards({ houses, isLoading }: Props) {
    // Removes leftovers form SQL DATE. Removes Timezone. 2026-05-26T00:00:00.000Z to 2026-05-26
    const houseClean = houses.map((house) => ({
        ...house,
        publiched: house.publiched.toString().split('T')[0],
    }));

    const navigate = useNavigate();
    function handleHouseMore(houseid: number) {
        return navigate(`/house/${houseid}`);
    }

    //Shows if api is still fetching
    if (isLoading) {
        return (
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading houses...</p>
            </>
        );
    }

    // If they houses array is empty.
    if (houses.length === 0) {
        return (
            <>
                <p>No facilites found.</p>
            </>
        );
    }

    return (
        <>
            {houseClean.map((house) => (
                <div key={house.id} className="housecards">
                    <p>{house.address}</p>
                    <p>City: {house.city}</p>
                    <div>
                        <p>Living area: {house.living_area}</p>
                        <p>Rooms: {house.rooms}</p>
                    </div>
                    <p>
                        Price: {house.start_price} {house.currency}
                    </p>
                    <div>
                        <p>{house.description}</p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => handleHouseMore(house.id)}
                    >
                        More..
                    </Button>
                </div>
            ))}
        </>
    );
}

export default HouseCards;
