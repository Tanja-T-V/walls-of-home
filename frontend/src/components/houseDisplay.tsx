import { Spinner, Carousel } from 'react-bootstrap';
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
import type { Houses, Houseimgs } from '../interface/houseIntf';

type Props = {
    houses: Houses[];
    houseImgs: Houseimgs[];
    isLoading: boolean;
    handleLike: () => void;
    isLiked: boolean;
};

function HouseDisplay({
    houses,
    houseImgs,
    isLoading,
    handleLike,
    isLiked,
}: Props) {
    // Removes leftovers form SQL DATE. Removes Timezone. 2026-05-26T00:00:00.000Z to 2026-05-26
    const houseClean = houses.map((house) => ({
        ...house,
        publiched: house.publiched.toString().split('T')[0],
    }));

    // To be able to determit if its undefine when looking for image_main key. if undefine renders a default img.
    const imageMain = houseImgs[0]?.image_main;

    //Shows if api is still fetching
    if (isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center pt-5 w-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading houses...</p>
            </div>
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
                    <Carousel className="carusell-box mb-4">
                        <Carousel.Item>
                            <img
                                className="carousell-img"
                                src={
                                    imageMain || '/images/placeholder-house.png'
                                }
                                alt="Img of hosue"
                            />
                        </Carousel.Item>
                        {houseImgs.length > 0 &&
                            houseImgs[0].images.map((image) => (
                                <Carousel.Item>
                                    <img
                                        className="carousell-img"
                                        src={image}
                                        alt="Img of hosue"
                                    />
                                </Carousel.Item>
                            ))}
                    </Carousel>

                    <div className="boxwidth-house px-3">
                        <p className="fs-3 fw-bold mb-2">{house.address}</p>

                        <div className="mb-4 d-flex align-items-center gap-4">
                            <p>{house.city}</p>
                            <div className="ms-auto">
                                <LikeButton
                                    onLike={handleLike}
                                    isLiked={isLiked}
                                />
                            </div>
                        </div>
                        <div className="text-detials">
                            <div className="text-date-price mb-2 d-flex">
                                <div className="mb-2 d-flex align-items-center gap-1">
                                    <p>Price: </p>
                                    <p className="fw-bold">
                                        {house.start_price} {house.currency}
                                    </p>
                                </div>
                                <p className="text-date fw-light ms-lg-auto">
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
                                    <p className="ms-auto fw-bold">
                                        {' '}
                                        {house.rooms}
                                    </p>
                                </div>

                                <div className="mb-2 d-flex align-items-center gap-2">
                                    <Calendar2WeekFill className="icon-dark-color" />
                                    <p>Build year </p>
                                    <p className="ms-auto fw-bold">
                                        {house.build_year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-description boxwidth-house mb-3 p-3">
                        <div className="text-detials">
                            <p className="mb-2 fw-bold">Extra details</p>
                            <div className="mb-2 d-flex align-items-center gap-2">
                                <p>Parking</p>
                                <p className="ms-auto fw-bold">
                                    {house.parking}
                                </p>
                            </div>
                            <div className="mb-2 d-flex align-items-center gap-2">
                                <p>Exterior</p>
                                <p className="ms-auto fw-bold">
                                    {house.exterior}
                                </p>
                            </div>
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
