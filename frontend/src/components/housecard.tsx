import { useHousesContext } from '../context/housesContext';

function HouseCards() {
    // Creates variables with data from Context
    const { houses, isLoading } = useHousesContext();

    //Shows if api is still fetching
    if (isLoading) {
        return <p>Loading data</p>;
    }

    return (
        <>
            {houses.map((house) => (
                <div key={house.id} className="housecards">
                    <p>
                        Price:
                        {house.start_price} {house.currency}
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
                        <p>{house.description}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default HouseCards;
