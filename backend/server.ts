import express from 'express';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

import apiHouses from './serverHouses.js';
import apiLogin from './serverLogin.js';

// Creates app.
const app = express();

// For express.static to save map/url paths.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Corse fix
app.use(cors());

app.use(express.json());

// Imports serverfiles
// When fetching its gonne need to be ex: /houses/ something (if its not basic get)
app.use('/login', apiLogin);
app.use('/houses', apiHouses);

// Static is a middlwehere that servse files. path and join helps out with path directions no matter if the forntend or backend trying to find the map/url for images that exsist in backend.
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleweher that sends everythign to dist map (frontend code) trough GET / (root adress). Similar to render static site-function
app.use(express.static(path.join(path.resolve(), 'dist')));

// ---- App listen ---
app.listen(8080, () => {
    console.log('Redo på localhost: ');
});
