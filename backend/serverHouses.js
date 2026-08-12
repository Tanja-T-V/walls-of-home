import express from 'express';
import { database } from './database/database.js';
const router = express.Router();
//----- Houses ----
router.get('/', async (_req, res) => {
    // Adds interface to result
    const houses = await database.query('SELECT * FROM houses');
    res.status(200).send(houses.rows);
});
router.get('/:houseid', async (req, res) => {
    const houseID = req.params.houseid;
    const userID = req.query.accID;
    const house = await database.query('SELECT * FROM houses WHERE id = $1', [houseID]);
    if (userID === undefined) {
        // Creates a const object with the house data and boolean if the house exsist in fav/liked database, only sends the boolean row.
        const houseData = {
            houses: house.rows,
            isLiked: false,
        };
        res.status(200).send(houseData);
    }
    else {
        //Looks if house and user exsists and gives a boolean.
        const favexsists = await database.query('SELECT EXISTS (SELECT * FROM userfavs WHERE user_id = $1 AND houses_id = $2)', [userID, houseID]);
        // Creates a const object with the house data and boolean if the house exsist in fav/liked database, only sends the boolean row.
        const houseData = {
            houses: house.rows,
            isLiked: favexsists.rows[0].exists,
        };
        res.status(200).send(houseData);
    }
});
router.post('/', async (req, res) => {
    const houseID = req.body;
    if (!('houses_id' in houseID)) {
        return res.status(400).send('Missing body information');
    }
    else {
        const { rows } = await database.query('SELECT * FROM houses WHERE id = ANY($1)', [[houseID.houses_id]]);
        return res.status(201).send(rows);
    }
});
//----- FavHouses & Liked houses ----
router.get('/userfavs/:userdid', async (req, res) => {
    const user = req.params.userdid;
    const favHouses = await database.query('SELECT * FROM userfavs WHERE user_id = $1', [user]);
    if (user === undefined) {
        return res.status(404);
    }
    if (user !== undefined) {
        return res.status(200).send(favHouses.rows);
    }
    else {
        return res.status(404);
    }
});
router.post('/userfavs', async (req, res) => {
    const newFav = req.body;
    //Looks if hosue and user exsists and gives a boolean.
    const favexsists = await database.query('SELECT EXISTS (SELECT * FROM userfavs WHERE user_id = $1 AND houses_id = $2)', [newFav.user_id, newFav.houses_id]);
    let likeExsists = favexsists.rows[0].exists;
    if (newFav === undefined) {
        return res.status(400).send('Missing body information');
    }
    if (likeExsists === true) {
        // Delets a row / Fav/like.
        await database.query(`DELETE FROM userfavs
            WHERE user_id = $1 AND houses_id = $2`, [newFav.user_id, newFav.houses_id]);
        likeExsists = false;
        return res.status(201).send(likeExsists);
    }
    else if (likeExsists === false) {
        await database.query(`INSERT INTO userfavs(user_id, houses_id)
            VALUES ($1, $2)`, [newFav.user_id, newFav.houses_id]);
        likeExsists = true;
        return res.status(201).send(likeExsists);
    }
    else {
        return res.status(400).send('Unknown problem');
    }
});
//----- Bid houses ----
// To display houses that user have bid on
router.get('/bids/:usderid', async (req, res) => {
    const user = req.params.usderid;
    if (user === undefined) {
        return res.status(404).send();
    }
    else {
        const bidHouses = await database.query('SELECT * FROM userbids WHERE user_id = $1', [user]);
        return res.status(200).send(bidHouses.rows);
    }
});
// To add bid to a house
router.post('/bids', async (req, res) => {
    const newBid = req.body;
    // Does a insert. In database it have UNIQE (user_id, houses_id) wich makes sure that a user can have multiply of same house. Here with ON CONFLIC it looks at same variable if its a conflict there. If user dont have house in their budlist then it gets added. If user allready have house they DO UPSATE and changes the price with EXCLUDED.
    await database.query(`INSERT INTO userbids (user_id, houses_id, price)
        VALUES($1, $2, $3)
        ON CONFLICT (user_id, houses_id)
        DO UPDATE
        SET price = EXCLUDED.price`, [newBid.user_id, newBid.houses_id, newBid.price]);
    res.status(201).send();
});
// Exports router so it can be used in main server
export default router;
//# sourceMappingURL=serverHouses.js.map