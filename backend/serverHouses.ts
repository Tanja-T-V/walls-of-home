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

//----- Houses ----

router.get('/houses', async (_req, res) => {
    // Adds interface to result
    const houses: QueryResult<Houses> = await database.query(
        'SELECT * FROM houses'
    );

    res.status(200).send(houses.rows);
});

// Exports router so it can be used in main server
export default router;
