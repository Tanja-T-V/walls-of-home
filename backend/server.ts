import express from 'express';

import { database } from './database/database.js';
import type { QueryResult } from 'pg';

//---- Interfaces -----

interface Houses {
  id: number;
  start_price: number;
  currency: string;
  city: string;
  address: string;
  property_type: string;
  living_area: string;
  rooms: number;
  build_year: number;
  parking: string;
  exterior: string;
  description: string;
  publiched: string;
}

// Creates app.
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/houses', async (req, res) => {
  const { rows } = await database.query('SELECT * FROM houses');
  console.log('Inside get houses');
  res.status(200).send(rows);
});

app.listen(8080, () => {
  console.log('Redo på 8080');
});
