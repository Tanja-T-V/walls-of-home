import { Spinner, Button } from 'react-bootstrap';

// Interface
import type { Houses, BidHouses } from '../interface/houseIntf';
import { useNavigate } from 'react-router-dom';

import './styles/bidcard.scss';

type Props = {
    houses: Houses[];
    bidhouses: BidHouses[];
    isLoading: boolean;
};

function BidCards({ houses, bidhouses, isLoading }: Props) {
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
                <div key={house.id} className="bidcard">
                    <p>City: {house.city}</p>
                    <p>{house.address}</p>
                    <p>Publiched: {house.publiched}</p>
                    <p>
                        Price: {house.start_price} {house.currency}
                    </p>
                    <p>
                        My bid:{' '}
                        {
                            bidhouses.find((bid) => bid.houses_id === house.id)
                                ?.price
                        }
                    </p>
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

export default BidCards;
