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
}

interface FavHouses {
    id: number;
    user_id: number;
    houses_id: number;
}

interface User {
    user_id: number;
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

//----- Houses ----

router.get('/houses', async (_req, res) => {
    // Adds interface to result
    const houses: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses'
    );

    res.status(200).send(houses.rows);
});

router.get('/houses/:houseid', async (req, res) => {
    const user = req.params.houseid;

    const house: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses WHERE id = $1',
        [user]
    );

    res.status(200).send(house.rows);
});

router.post('/houses', async (req, res) => {
    const houseID: HouseFavID = req.body;

    if (!('houses_id' in houseID)) {
        return res.status(400).send('Missing body information');
    }

    const { rows, rowCount }: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses WHERE id = ANY($1)',
        [[houseID.houses_id]]
    );

    res.status(200).send(rows);
});

//----- FavHouses ----

router.get('/userfavs/:userdid', async (req, res) => {
    const user = req.params.userdid;

    const favHouses: QueryResult<FavHouses> = await database.query(
        'SELECT * FROM userfavs WHERE user_id = $1',
        [user]
    );

    res.status(200).send(favHouses.rows);
});

//----- Bid houses ----
router.get('/bids/:usderid', async (req, res) => {
    const user = req.params.usderid;

    const bidHouses: QueryResult<BidHouses> = await database.query(
        'SELECT * FROM userbids WHERE user_id = $1',
        [user]
    );
    res.status(200).send(bidHouses.rows);
});

// Exports router so it can be used in main server
export default router;
