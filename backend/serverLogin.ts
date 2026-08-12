import express from 'express';
import { database } from './database/database.js';
import type { QueryResult } from 'pg';

const router = express.Router();

//---- Interface ---

interface Login {
    username: string;
    password: string;
}

/* JSON for testing
	 	{
			"username": "Lalice",
			"password": "testing123"
		}
*/

//----- Login ------
router.post('/', async (req, res) => {
    const user: Login = req.body;

    if (!('username' in user) || !('password' in user)) {
        return res.status(400).send('Missing body information');
    }

    const { rows, rowCount }: QueryResult<Login> = await database.query(
        'SELECT * FROM accounts WHERE username = $1 AND password = $2',
        [user.username, user.password]
    );

    // RowCount says how many rows are sent back. instead for using rows.length
    if (rowCount === 0) {
        return res.status(401).send('No account exsists');
    }

    if (rows) {
        return res.status(200).send(rows);
    }
});

// Exports router so it can be used in main server
export default router;
