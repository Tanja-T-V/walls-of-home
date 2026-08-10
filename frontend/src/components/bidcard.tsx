import { Spinner, Button } from 'react-bootstrap';
import { HouseDoorFill } from 'react-bootstrap-icons';

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
                <div
                    key={house.id}
                    className="bidcard mx-3 my-4 p-3 d-flex flex-column"
                >
                    <p className="fw-bold mb-2">{house.address}</p>

                    <div className="mb-2 d-flex align-items-center gap-4">
                        <div className=" d-flex align-items-center gap-2">
                            <HouseDoorFill className="icon-color" />
                            <p>{house.city}</p>
                        </div>
                        <p className="fw-light">Publiched: {house.publiched}</p>
                    </div>

                    <div className="my-1 d-flex align-items-center gap-1">
                        <p>Price: </p>
                        <p className="fw-bold">
                            {house.start_price} {house.currency}
                        </p>
                    </div>

                    <div className="activebid mb-4 mt-2 p-3 d-flex gap-3">
                        <p>Your current bid: </p>
                        <p className="fw-bold">
                            {
                                bidhouses.find(
                                    (bid) => bid.houses_id === house.id
                                )?.price
                            }{' '}
                            {house.currency}
                        </p>
                    </div>

                    <Button
                        className="primarybtn mt-auto"
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
