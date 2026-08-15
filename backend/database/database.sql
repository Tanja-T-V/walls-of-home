/*
    To read file in terminal do: \i database.sql
    Comando work also when render is used.

    If letters look wrong with åäö in database then it didnt read as UTF8. Run this inside Prosgresql:
    Run: SHOW client_encoding;
    If  ex on windows it says "WIN1252" its wrong settings.
    Run: SET client_encoding TO 'UTF8';
    Read again and it should say UFT8 and the letters should work again.
*/
SET client_encoding TO 'UTF8';

-- Tables with foregin keys
DROP TABLE IF EXISTS userfavs;
DROP TABLE IF EXISTS userbids;
DROP TABLE IF EXISTS houseimgs;


-- Tables without FK
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS houses;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE CHECK (length(username) > 3),
    password VARCHAR NOT NULL CHECK(length(password) >= 6)
);

-- DATE get automaticly including Timezone when read in Frontend JS
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
    publiched DATE NOT NULL DEFAULT CURRENT_DATE,
    tags TEXT[]
);

CREATE TABLE houseimgs (
    id SERIAL PRIMARY KEY,
    houses_id INTEGER UNIQUE NOT NULL REFERENCES houses(id),
    image_main TEXT,
    images TEXT[]
);

CREATE TABLE userfavs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts(id),
    houses_id INTEGER REFERENCES houses(id),

    UNIQUE (user_id, houses_id)
);

CREATE TABLE userbids (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES accounts(id),
    houses_id INTEGER REFERENCES houses(id),
    price INTEGER NOT NULL CHECK (price > 1),

    UNIQUE (user_id, houses_id)
);

--- Inserts

INSERT INTO accounts (username, password) VALUES ('Alice', 'test123');
INSERT INTO accounts (username, password) VALUES ('Lena', 'DoggosExtreme');
INSERT INTO accounts (username, password) VALUES ('Anderos', 'CakeIsALie');

INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description, tags ) VALUES (5120000, 'Linköping', 'Ekbackevägen 22, 582 45 Linköping', 'House', '155 m2', 6, 1994, 'Garage', 'Backyard', 'A spacious family villa located in a quiet residential area. The home offers bright living spaces, a large garden, and excellent outdoor areas for entertaining.', '{"Fireplace", "Smart home"}');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description, tags) VALUES (3450000, 'Gothenburg', 'Linnégatan 18C, 413 04 Gothenburg', 'Apartment', '72 m2', 3, 2016, 'Rent parking', 'Balcony', 'Modern apartment in a vibrant city district with open-plan design, balcony, and access to a shared rooftop terrace.', '{"Elevator", "Walk-in closet", "Central location", "Smart home"}');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description, tags ) VALUES (6780000, 'Växjo', 'Björkås Gård 7, 355 91 Växjö', 'Farm', '210 m2', 7, 1923, 'Garage', 'Farmland', 'A charming countryside farm with renovated main house, extensive land, and peaceful surroundings close to nature.', '{"Fireplace", "Sea view", "Newly renovated"}');
INSERT INTO houses (start_price, city, address, property_type, living_area, rooms, build_year, parking, exterior, description, tags ) VALUES (3980000, 'Malmö', 'Rosengången 11, 217 63 Malmö', 'House', '118 m2', 5, 2007, 'Private parking', 'Backyard', 'Well-planned townhouse with private outdoor spaces, located in a family-friendly neighborhood with good city access.','{"Family friendly", "Pool", "Central location"}');

INSERT INTO houseimgs (houses_id, image_main, images) VALUES ( 1, '../images/linkoping/linkop-house-outside-AI.png', '{"../images/linkoping/linkop-house-interior-AI.png", "../images/linkoping/linköp-house-floorplan-AI.png"}');
INSERT INTO houseimgs (houses_id, image_main, images) VALUES ( 2, '../images/gbg/gbg-apart-outside-AI.png', '{"../images/gbg/gbg-apart-interior-AI.png", "../images/gbg/gbg-apart-floorplan-AI.png"}');
INSERT INTO houseimgs (houses_id, image_main, images) VALUES ( 3, '../images/vaxjo/vaxjo-farm-outside-AI.png', '{"../images/vaxjo/vaxjo-farm-interior-AI.png", "../images/vaxjo/vaxjo-farm-floorplan-AI.png"}');
INSERT INTO houseimgs (houses_id, image_main, images) VALUES ( 4, '../images/malmo/malmo-house-outside-AI.png', '{"../images/malmo/malmo-house-interior-AI.png", "../images/malmo/malmo-house-floorplan-AI.png"}');



INSERT INTO userfavs (user_id, houses_id) VALUES ( 1, 1);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 1, 3);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 2, 1);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 2, 4);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 3);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 2);
INSERT INTO userfavs (user_id, houses_id) VALUES ( 3, 1);

INSERT INTO userbids (user_id, houses_id, price) VALUES ( 1, 1, 5130000);
INSERT INTO userbids (user_id, houses_id, price) VALUES ( 3, 3, 6798900);
