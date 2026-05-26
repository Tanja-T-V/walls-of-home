import { useHousesContext } from '../context/housesContext';

function HouseCards() {
    // Creates variables with data from Context
    const { houses, isLoading } = useHousesContext();

    // Removes leftovers form SQL DATE. Removes Timezone. 2026-05-26T00:00:00.000Z to 2026-05-26
    const houseClean = houses.map((house) => ({
        ...house,
        publiched: house.publiched.toString().split('T')[0],
    }));

    //Shows if api is still fetching
    if (isLoading) {
        return <p>Loading data</p>;
    }

    return (
        <>
            {houseClean.map((house) => (
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
