import express from 'express';
import cors from 'cors';

import apiHouses from './serverHouses.js';
import apiLogin from './serverLogin.js';

// Creates app.
const app = express(),
    port = process.env.PORT || 8080;

// Corse fix
app.use(cors());

app.use(express.json());

// Imports serverfiles
// When fetching its gonne need to be ex: /houses/houses
app.use('/houses', apiHouses);
app.use('/login', apiLogin);
app.use('/userfavs', apiHouses);

// ---- App listen ---
app.listen(port, () => {
    console.log('Redo på localhost: ', port);
});
