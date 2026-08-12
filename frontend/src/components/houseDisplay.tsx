import { Spinner } from 'react-bootstrap';
import './styles/housedisplay.scss';
import {
    HousesFill,
    DoorOpenFill,
    ArrowsAngleExpand,
    Calendar2WeekFill,
    Dot,
} from 'react-bootstrap-icons';

import LikeButton from '../components/likeButton';

// Interface
import type { Houses } from '../interface/houseIntf';

type Props = {
    houses: Houses[];
    isLoading: boolean;
    handleLike: () => void;
    isLiked: boolean;
};

function HouseDisplay({ houses, isLoading, handleLike, isLiked }: Props) {
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
                <div key={house.id} className="house-box d-flex flex-column">
                    <p className="fs-3 fw-bold mb-2">{house.address}</p>

                    <div className="mb-4 d-flex align-items-center gap-4">
                        <p>{house.city}</p>
                        <div className="ms-auto">
                            <LikeButton onLike={handleLike} isLiked={isLiked} />
                        </div>
                    </div>

                    <div className="mb-2 d-flex align-items-center gap-4">
                        <div className="my-1 d-flex align-items-center gap-1">
                            <p>Price: </p>
                            <p className="fw-bold">
                                {house.start_price} {house.currency}
                            </p>
                        </div>
                        <p className="fw-light ms-auto">
                            Publiched: {house.publiched}
                        </p>
                    </div>

                    <div className="mb-3">
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <HousesFill className="icon-dark-color" />
                            <p>Property type </p>
                            <p className="ms-auto fw-bold">
                                {house.property_type}
                            </p>
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <ArrowsAngleExpand className="icon-dark-color" />
                            <p>Living area</p>
                            <p className="ms-auto fw-bold">
                                {house.living_area}
                            </p>
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <DoorOpenFill className="icon-dark-color" />
                            <p>Rooms</p>
                            <p className="ms-auto fw-bold"> {house.rooms}</p>
                        </div>

                        <div className="mb-2 d-flex align-items-center gap-2">
                            <Calendar2WeekFill className="icon-dark-color" />
                            <p>Build year </p>
                            <p className="ms-auto fw-bold">
                                {house.build_year}
                            </p>
                        </div>
                    </div>

                    <div className="text-description mb-3 p-3">
                        <p className="mb-2 fw-bold">Extra details</p>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <p>Parking</p>
                            <p className="ms-auto fw-bold">{house.parking}</p>
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <p>Exterior</p>
                            <p className="ms-auto fw-bold">{house.exterior}</p>
                        </div>

                        <div className="my-3">
                            <p className="fw-bold">Description</p>
                            <p>{house.description}</p>
                        </div>

                        <div className="my-3">
                            <p className="fw-bold">Other features</p>
                            <div className="mb-2 d-flex flex-wrap align-items-center gap-3">
                                {house.tags.map((tag, i) => (
                                    <div
                                        key={i}
                                        className=" d-flex align-items-center gap-1"
                                    >
                                        <Dot />
                                        <p className="p-1 m-0 fw-light">
                                            {tag}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default HouseDisplay;
