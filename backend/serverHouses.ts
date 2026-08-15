import express from 'express';
import { database } from './database/database.js';
import type { QueryResult } from 'pg';

const router = express.Router();

//---- Interfaces -----

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
    tags: string[];
}

interface Houseimgs {
    id: number;
    image_main: string;
    images: string[];
}

interface FavHouses {
    id: number;
    user_id: number;
    houses_id: number;
}

interface FavHousExsists {
    id: number;
    user_id: number;
    houses_id: number;
    exists: boolean;
}

interface HouseFavID {
    houses_id: number[];
}

interface BidHouses {
    id: number;
    user_id: number;
    houses_id: number;
    price: number;
}

interface BidHouseDelete {
    user_id: number;
    houses_id: number;
}

//----- Houses ----

//Get all houses
router.get('/', async (_req, res) => {
    // Adds interface to result
    const houses: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses'
    );

    //Gets the specific house images map/url locations.
    const houseimgs: QueryResult<Houseimgs> = await database.query(
        'SELECT * FROM houseimgs'
    );

    const housesWImages = {
        houses: houses.rows,
        houseimgs: houseimgs.rows,
    };

    res.status(200).send(housesWImages);
});

// Gets houses that match a user fav array.
router.post('/', async (req, res) => {
    const houseID: HouseFavID = req.body;

    if (!('houses_id' in houseID)) {
        return res.status(400).send('Missing body information');
    } else {
        const houses: QueryResult<Houses> = await database.query(
            'SELECT * FROM houses WHERE id = ANY($1)',
            [[houseID.houses_id]]
        );

        //Gets the specific house images map/url locations.
        const houseimgs: QueryResult<Houseimgs> = await database.query(
            'SELECT * FROM houseimgs'
        );

        const housesWImages = {
            houses: houses.rows,
            houseimgs: houseimgs.rows,
        };

        return res.status(201).send(housesWImages);
    }
});

// Gets a specfic house
router.get('/:houseid', async (req, res) => {
    const houseID = req.params.houseid;
    const userID = req.query.accID;

    //Gets the specific house
    const house: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses WHERE id = $1',
        [houseID]
    );
    //Gets the specific house images map/url locations.
    const houseimgs: QueryResult<Houseimgs> = await database.query(
        'SELECT * FROM houseimgs WHERE houses_id = $1',
        [houseID]
    );

    if (userID === undefined) {
        // Creates a const object with the house data and boolean if the house exsist in fav/liked database, only sends the boolean row.
        const houseData = {
            houses: house.rows,
            images: houseimgs.rows,
            isLiked: false,
        };

        res.status(200).send(houseData);
    } else {
        //Looks if house and user exsists and gives a boolean.
        const favexsists: QueryResult<FavHousExsists> = await database.query(
            'SELECT EXISTS (SELECT * FROM userfavs WHERE user_id = $1 AND houses_id = $2)',
            [userID, houseID]
        );

        // to see if there is a bid on the house
        const bidexsists: QueryResult<BidHouses> = await database.query(
            'SELECT * FROM userbids WHERE user_id = $1 AND houses_id = $2',
            [userID, houseID]
        );

        if (bidexsists.rowCount === 0) {
            // Creates a const object with the house data and boolean if the house exsist in fav/liked database, only sends the boolean row.
            const houseData = {
                houses: house.rows,
                images: houseimgs.rows,
                isLiked: favexsists.rows[0]!.exists,
                bidPriceHouse: -1,
            };

            res.status(200).send(houseData);
        } else {
            const houseData = {
                houses: house.rows,
                images: houseimgs.rows,
                isLiked: favexsists.rows[0]!.exists,
                bidPriceHouse: bidexsists.rows[0]?.price,
            };
            res.status(200).send(houseData);
        }
    }
});

//------------------ FavHouses & Liked houses --------------
// Gets all the user liked houses
router.get('/userfavs/:userdid', async (req, res) => {
    const user = req.params.userdid;

    const favHouses: QueryResult<FavHouses> = await database.query(
        'SELECT * FROM userfavs WHERE user_id = $1',
        [user]
    );

    if (user === undefined) {
        return res.status(404);
    }

    if (user !== undefined) {
        return res.status(200).send(favHouses.rows);
    } else {
        return res.status(404);
    }
});

// Favorrites or delete favourite from user
router.post('/userfavs', async (req, res) => {
    const newFav: FavHouses = req.body;

    //Looks if hosue and user exsists and gives a boolean.
    const favexsists: QueryResult<FavHousExsists> = await database.query(
        'SELECT EXISTS (SELECT * FROM userfavs WHERE user_id = $1 AND houses_id = $2)',
        [newFav.user_id, newFav.houses_id]
    );

    let likeExsists = favexsists.rows[0]!.exists;

    if (newFav === undefined) {
        return res.status(400).send('Missing body information');
    }

    if (likeExsists === true) {
        // Delets a row / Fav/like.
        await database.query(
            `DELETE FROM userfavs
            WHERE user_id = $1 AND houses_id = $2`,
            [newFav.user_id, newFav.houses_id]
        );
        likeExsists = false;

        return res.status(201).send(likeExsists);
    } else if (likeExsists === false) {
        await database.query(
            `INSERT INTO userfavs(user_id, houses_id)
            VALUES ($1, $2)`,
            [newFav.user_id, newFav.houses_id]
        );
        likeExsists = true;

        return res.status(201).send(likeExsists);
    } else {
        return res.status(400).send('Unknown problem');
    }
});

//---------------- Bid houses --------------------
// To display houses that user have bid on
router.get('/bids/:usderid', async (req, res) => {
    const user = req.params.usderid;

    if (user === undefined) {
        return res.status(404).send();
    } else {
        const bidHouses: QueryResult<BidHouses> = await database.query(
            'SELECT * FROM userbids WHERE user_id = $1',
            [user]
        );
        return res.status(200).send(bidHouses.rows);
    }
});

// To add bid to a house
router.post('/bids', async (req, res) => {
    const newBid: BidHouses = req.body;

    if (
        !('user_id' in newBid) ||
        !('houses_id' in newBid) ||
        !('price' in newBid)
    ) {
        return res.status(400).json({
            error: 'Missing information',
        });
    }

    // Does a insert. In database it have UNIQE (user_id, houses_id) wich makes sure that a user can have multiply of same house. Here with ON CONFLIC it looks at same variable if its a conflict there. If user dont have house in their budlist then it gets added. If user allready have house they DO UPDATE and changes the price with EXCLUDED.
    try {
        await database.query(
            `INSERT INTO userbids (user_id, houses_id, price)
        VALUES($1, $2, $3)
        ON CONFLICT (user_id, houses_id)
        DO UPDATE
        SET price = EXCLUDED.price`,
            [newBid.user_id, newBid.houses_id, newBid.price]
        );

        res.status(201).send();
    } catch (error) {
        //If unexpected error happens
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
});

router.delete('/bids', async (req, res) => {
    const bidDelete: BidHouseDelete = req.body;

    if (!('user_id' in bidDelete) || !('houses_id' in bidDelete)) {
        return res.status(400).json({
            error: 'Missing information',
        });
    }
    try {
        await database.query(
            `DELETE FROM userbids
            WHERE user_id = $1 AND houses_id = $2`,
            [bidDelete.user_id, bidDelete.houses_id]
        );
        res.status(204).send();
    } catch (error) {
        //If unexpected error happens
        return res.status(500).json({
            error: 'Internal server error',
        });
    }

    res.status(201).send();
});

// Exports router so it can be used in main server
export default router;
