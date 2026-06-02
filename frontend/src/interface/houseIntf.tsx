export interface Houses {
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

export interface FavHouses {
    id: number;
    user_id: number;
    houses_id: number;
}

export interface BidHouses {
    id: number;
    user_id: number;
    houses_id: number;
    price: number;
}
