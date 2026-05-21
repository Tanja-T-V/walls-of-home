DROP TABLE IF EXISTS houses_tags;
DROP TABLE IF EXISTS userfavs;
DROP TABLE IF EXISTS userbids;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS houses;
DROP TABLE IF EXISTS housestags;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE CHECK (length(username) > 3),
    password VARCHAR NOT NULL CHECK(length(password) > 6)
);

CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    start_price INTEGER NOT NULL CHECK (start_price > 1),
    currency TEXT NOT NULL DEFAULT 'SEK',
    city TEXT NOT NULL CHECK (length(city) > 3),
    address TEXT UNIQUE NOT NULL CHECK (length(address) > 0),
    property_type TEXT NOT NULL CHECK (length(property_type) > 0),
    living_area TEXT NOT NULL CHECK (length(living_area) > 0),
    rooms INTEGER NOT NULL CHECK(rooms > 0),
    build_year INTEGER NOT NULL CHECK(build_year > 1800),
    parking TEXT NOT NULL CHECK (length(parking) > 0),
    exterior TEXT NOT NULL DEFAULT 'No exterior',
    description TEXT NOT NULL DEFAULT 'No description',
    publiched DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE housestags (
    id SERIAL PRIMARY KEY,
    tag TEXT NOT NULL UNIQUE CHECK (length(tag) > 0)
);

CREATE TABLE houses_tags (
    id SERIAL PRIMARY KEY,
    housetag_id INTEGER REFERENCES housestags(id),
    houses_id INTEGER REFERENCES houses(id)
);

CREATE TABLE userfavs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts(id),
    houses_id INTEGER REFERENCES houses(id)
);

CREATE TABLE userbids (
     id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts(id),
    houses_id INTEGER REFERENCES houses(id),
    price INTEGER NOT NULL CHECK (price > 1)
);


INSERT INTO accounts (username, password) VALUES ('Lalice', 'testing123');
INSERT INTO accounts (username, password) VALUES ('ChiliLena', 'test123');
INSERT INTO accounts (username, password) VALUES ('Anderos', 'test123');

INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description ) VALUES (5120000, 'Linköping', 'Ekbackevägen 22, 582 45 Linköping', 'House', '155 m2', 6, 1994, 'Garage', 'Backyard', 'A spacious family villa located in a quiet residential area. The home offers bright living spaces, a large garden, and excellent outdoor areas for entertaining.');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description ) VALUES (3450000, 'Gothenburg', 'Linnégatan 18C, 413 04 Gothenburg', 'Apartment', '72 m2', 3, 2016, 'Rent parking', 'Balcony', 'Modern apartment in a vibrant city district with open-plan design, balcony, and access to a shared rooftop terrace.');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description ) VALUES (6780000, 'Växjo', 'Björkås Gård 7, 355 91 Växjö', 'Farm', '210 m2', 7, 1923, 'Garage', 'Farmland', 'A charming countryside farm with renovated main house, extensive land, and peaceful surroundings close to nature.');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description ) VALUES (3980000, 'Malmö', 'Rosengången 11, 217 63 Malmö', 'House', '118 m2', 5, 2007, 'Private parking', 'Backyard', 'Well-planned townhouse with private outdoor spaces, located in a family-friendly neighborhood with good city access.');

INSERT INTO housestags (tag) VALUES ('Pool');
INSERT INTO housestags (tag) VALUES ('Elevator');
INSERT INTO housestags (tag) VALUES ('Fireplace');
INSERT INTO housestags (tag) VALUES ('Walk-in closet');
INSERT INTO housestags (tag) VALUES ('Sea view');
INSERT INTO housestags (tag) VALUES ('Newly renovated');
INSERT INTO housestags (tag) VALUES ('Family friendly');
INSERT INTO housestags (tag) VALUES ('Central location');
INSERT INTO housestags (tag) VALUES ('Smart home');

INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 3, 1);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 9, 1);

INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 2, 2);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 4, 2);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 8, 2);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 9, 2);

INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 3, 3);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 5, 3);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 6, 3);

INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 7, 4);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 1, 4);
INSERT INTO houses_tags (housetag_id, houses_id) VALUES ( 8, 4);

INSERT INTO userfavs (user_id, houses_id) VALUES ( 1, 1);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 1, 3);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 2, 1);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 2, 4);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 3);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 2);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 1);

INSERT INTO userbids (user_id, houses_id, price) VALUES ( 1, 1, 5130000);
INSERT INTO userbids (user_id, houses_id, price) VALUES ( 3, 3, 6798900);
