import dotenv from "dotenv";
import { Client } from "pg";

// ----- PostgreSQL -------
// For PostgreSQL. gets .env file variables
dotenv.config();

export const database = new Client({
	connectionString: process.env.PGURI,
});
database.connect();
