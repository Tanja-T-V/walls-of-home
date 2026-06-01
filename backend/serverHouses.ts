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

//----- Houses ----

router.get('/houses', async (_req, res) => {
    // Adds interface to result
    const houses: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses'
    );

    res.status(200).send(houses.rows);
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

    if (rowCount === 0) {
        return res.status(401).send('No liked houses');
    }

    if (houseID) {
        console.log('Detta skickar api tillbaak: ', rows);
        res.status(200).send(rows);
    }
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

// Exports router so it can be used in main server
export default router;
