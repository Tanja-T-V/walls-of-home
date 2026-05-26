import express from 'express';

import { database } from './database/database.js';
import type { QueryResult } from 'pg';

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

// Creates app.
const app = express();
// Corse fix
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());

//----- Houses ----

app.get('/houses', async (req, res) => {
    const { rows } = await database.query('SELECT * FROM houses');
    console.log('Inside get houses');
    console.log(rows);
    res.status(200).send(rows);
});

//----- Login ------
app.post('/login', async (req, res) => {
    /* JSON for testing
	 	{
			"username": "Lalice",
			"password": "testing123"
		}
	*/

    const user = req.body;

    if (!('username' in user) || !('password' in user)) {
        return res.status(400).send('Missing body information');
    }

    const { rows } = await database.query(
        'SELECT * FROM accounts WHERE username = $1',
        [user.username]
    );

    if (rows.length === 0) {
        return res.status(401).send('No account exsists');
    }

    if (rows) {
        return res.status(200).send(rows);
    }
});

// ---- App listen ---
app.listen(8080, () => {
    console.log('Redo på 8080');
});
