import { useState, useEffect } from 'react';

interface Houses {
    id: number;
    start_price: number;
    currency: string;
    city: string;
    address: string;
    property_type: string;
    living_area: string;
    rooms: number;
    build_year: number;
    parking: string;
    exterior: string;
    description: string;
    publiched: string;
}

function StartPage() {
    const [value, setValue] = useState<Houses[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/houses')
            .then((res) => res.json())
            .then((data) => {
                setValue(data);
            });
    }, []);

    return (
        <div className="m-5">
            <p> Starting page With houses</p>
        </div>
    );
}

export default StartPage;
