import express from 'express';
import cors from 'cors';
import { database } from './database/database.js';
import type { QueryResult } from 'pg';

import apiHouses from './serverHouses.js';
import apiLogin from './serverLogin.js';

// Creates app.
const app = express();

// Corse fix
app.use(cors());

app.use(express.json());

// Imports serverfiles
// When fetching its gonne need to be ex: /houses/houses
app.use('/houses', apiHouses);
app.use('/login', apiLogin);
app.use('/userfavs', apiHouses);

// ---- App listen ---
app.listen(8080, () => {
    console.log('Redo på 8080');
});
