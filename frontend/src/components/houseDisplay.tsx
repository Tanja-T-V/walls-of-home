import { Spinner } from 'react-bootstrap';

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
                    <p>
                        Price: {house.start_price} {house.currency}
                    </p>
                    <p>City: {house.city}</p>
                    <p>{house.address}</p>
                    <p>Publiched: {house.publiched}</p>
                    <div>
                        <p>Housetype: {house.property_type}</p>
                        <p>Living area: {house.living_area}</p>
                        <p>Rooms: {house.rooms}</p>
                        <p>Build year: {house.build_year}</p>
                    </div>
                    <div>
                        <p>Parking: {house.parking}</p>
                        <p>Exterior: {house.exterior}</p>
                    </div>
                    <div>
                        <p>Description</p>
                        <p>{house.description}</p>
                    </div>
                    <div>
                        {house.tags.map((tag, i) => (
                            <div
                                key={i}
                                className="p-2 m-2 border border-primary border-2 rounded-pill d-inline-block"
                            >
                                <p className="p-2 m-0">{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default HouseDisplay;
