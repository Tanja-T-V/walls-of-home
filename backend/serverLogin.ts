import express from 'express';
import { database } from './database/database.js';
import type { QueryResult } from 'pg';
import { error } from 'console';

const router = express.Router();

//---- Interface ---

interface Login {
    id: number;
    username: string;
    password: string;
}

interface ReqLogin {
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
    const user: ReqLogin = req.body;

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

//---- Register a account ----
router.post('/register', async (reg, res) => {
    const user: ReqLogin = reg.body;

    if (!('username' in user) || !('password' in user)) {
        return res.status(400).send('Missing body information');
    }

    const { rows, rowCount }: QueryResult<Login> = await database.query(
        'SELECT * FROM accounts WHERE username = $1',
        [user.username]
    );

    if (rowCount === 0) {
        try {
            const createsAcc = await database.query(
                `INSERT INTO accounts(username, password) VALUES ($1, $2) RETURNING id`,
                [user.username, user.password]
            );

            const createdUser: Login[] = [
                {
                    id: createsAcc.rows[0].id,
                    username: user.username,
                    password: user.password,
                },
            ];

            return res.status(201).send(createdUser);
        } catch (error: any) {
            // If there is a CHECK violation (too showrt/long)
            if (error.code === '23514') {
                //Looks specficly if its a password error
                if (error.constraint === 'accounts_password_check') {
                    return res.status(400).json({
                        error: 'Password too short',
                    });
                } else {
                    // if username is too chort
                    return res.status(400).json({
                        error: 'Username too short',
                    });
                }
            } else {
                //If unexpected error happens
                return res.status(500).json({
                    error: 'Internal server error',
                });
            }
        }
    }

    if (rows) {
        console.log('Account exsist already');
        return res.status(400).send();
    }
});

// Exports router so it can be used in main server
export default router;
