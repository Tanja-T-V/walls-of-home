import { Spinner, Button } from 'react-bootstrap';
import { HouseDoorFill, Dot } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './styles/housecard.scss';

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
                <p className="fw-light fs-3 m-5">No facilites found</p>
            </>
        );
    }

    return (
        <>
            {houseClean.map((house) => (
                <div
                    key={house.id}
                    className="housecards mx-3 my-4 p-3 d-flex flex-column"
                >
                    <p className="fw-bold mb-2">{house.address}</p>

                    <div className="mb-2 d-flex align-items-center gap-2">
                        <HouseDoorFill className="icon-color" />
                        <p>{house.city}</p>
                    </div>
                    <div className="mb-2 d-flex align-items-center gap-3">
                        <div className=" d-flex align-items-center gap-1">
                            <Dot />
                            <p>{house.living_area}</p>
                        </div>
                        <div className=" d-flex align-items-center gap-1">
                            <Dot />
                            <p>{house.rooms} rooms</p>
                        </div>
                    </div>
                    <div className="my-1 d-flex align-items-center gap-1">
                        <p className="fw-bold">
                            Price: {house.start_price} {house.currency}
                        </p>
                    </div>
                    <div className="mt-1 mb-4">
                        <p>{house.description}</p>
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

export default HouseCards;
