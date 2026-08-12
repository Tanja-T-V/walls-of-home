import express from 'express';
import cors from 'cors';
import path from 'path';
import apiHouses from './serverHouses.js';
import apiLogin from './serverLogin.js';
// Creates app.
const app = express();
// Corse fix
app.use(cors());
app.use(express.json());
// Imports serverfiles
// When fetching its gonne need to be ex: /houses/ something (if its not basic get)
app.use('/login', apiLogin);
app.use('/houses', apiHouses);
// Middleweher that sends everythign to dist map (frontend code) trough GET / (root adress). Similar to render static site-function
app.use(express.static(path.join(path.resolve(), 'dist')));
// ---- App listen ---
app.listen(8080, () => {
    console.log('Redo på localhost: ');
});
//# sourceMappingURL=server.js.map