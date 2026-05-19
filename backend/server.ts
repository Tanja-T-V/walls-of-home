import express from "express";

import { database } from "./database/database.js";
import type { QueryResult } from "pg";

const app = express();
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.get("/", async (req, res) => {
	const { rows } = await database.query("SELECT * FROM cities");
	console.log("Inisde get main");
	res.send(rows);
});

app.listen(8080, () => {
	console.log("Redo på 8080");
});
