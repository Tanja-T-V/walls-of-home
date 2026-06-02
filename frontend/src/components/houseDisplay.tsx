import { Spinner, Button } from 'react-bootstrap';

// Interface
import type { Houses } from '../interface/houseIntf';

type Props = {
    houses: Houses[];
    isLoading: boolean;
};

function HouseDisplay({ houses, isLoading }: Props) {
    // Removes leftovers form SQL DATE. Removes Timezone. 2026-05-26T00:00:00.000Z to 2026-05-26
    const houseClean = houses.map((house) => ({
        ...house,
        publiched: house.publiched.toString().split('T')[0],
    }));

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
                <p>No facility found.</p>
            </>
        );
    }

    return (
        <>
            {houseClean.map((house) => (
                <div key={house.id}>
                    <p>{house.city}</p>
                </div>
            ))}
        </>
    );
}

export default HouseDisplay;
