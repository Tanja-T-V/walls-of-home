import express from 'express';

import { database } from './database/database.js';
import type { QueryResult } from 'pg';

import apiHouses from './serverHouses.js';

// Creates app.
const app = express();
// Corse fix
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());

// Imports serverfiles
// When fetching its gonne need to be ex: /houses/houses
app.use('/houses', apiHouses);

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
