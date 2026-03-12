import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const db = mysql.createConnection(process.env.DATABASE_URL);

app.use(express.json())

app.use(express.static('public'));

app.get("/showTables", (req, res) => {
    const q = "SHOW TABLES;";
    db.query(q, (err, data) => {
        if(err) throw err;
        return res.json(data);
    });
});

app.get("/test2", (req, res) => {
    const q = "";
    db.query(q, (err, data) => {
        if(err) throw err;
        return res.json(data);
    });
});


app.get("/", (req, res) => {
    res.json("Hello, this is backend for the project");
    //res.status(200).send('<h1>Helloo</h1>')
});

app.get("/oneRecord", (req, res) => {
    const q = "SELECT * FROM updated_dataset_2 WHERE COLLISION_ID = '999956';";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/mostCollisionsStreetName", (req, res) => {
    const q = "SELECT ON_STREET_NAME, COUNT(ON_STREET_NAME) AS Number_Of_Collisions " + 
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY Number_Of_Collisions DESC, ON_STREET_NAME ASC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/leastCollisionsStreetName", (req, res) => {
    const q = "SELECT ON_STREET_NAME, COUNT(ON_STREET_NAME) AS Number_Of_Collisions " + 
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY Number_Of_Collisions ASC, ON_STREET_NAME ASC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/mostNumberOfPeopleK", (req, res) => {
    const q = "SELECT ON_STREET_NAME, SUM(NUMBER_OF_PERSONS_KILLED) AS TotalPersonsKilled " +
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY TotalPersonsKilled DESC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/leastNumberOfPeopleK", (req, res) => {
    const q = "SELECT ON_STREET_NAME, SUM(NUMBER_OF_PERSONS_KILLED) AS TotalPersonsKilled " +
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY TotalPersonsKilled ASC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/mostNumberOfPeopleInjured", (req, res) => {
    const q = "SELECT ON_STREET_NAME, SUM(NUMBER_OF_PERSONS_INJURED) AS TotalPersonsInjured " +
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY TotalPersonsInjured DESC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/leastNumberOfPeopleInjured", (req, res) => {
    const q = "SELECT ON_STREET_NAME, SUM(NUMBER_OF_PERSONS_INJURED) AS TotalPersonsInjured " +
    "FROM updated_dataset_2 " +
    "GROUP BY ON_STREET_NAME " +
    "ORDER BY TotalPersonsInjured ASC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/mostVehicleType", (req, res) => {
    const q = "SELECT VEHICLE_TYPE_CODE_1 AS VEHICLE_TYPE, COUNT(VEHICLE_TYPE_CODE_1) AS CollisionCount " +
    "FROM updated_dataset_2 " +
    "WHERE VEHICLE_TYPE_CODE_1 IS NOT NULL " +
    "GROUP BY VEHICLE_TYPE_CODE_1 " +
    "ORDER BY CollisionCount DESC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/leastVehicleType", (req, res) => {
    const q = "SELECT VEHICLE_TYPE_CODE_1 AS VEHICLE_TYPE, COUNT(VEHICLE_TYPE_CODE_1) AS CollisionCount " +
    "FROM updated_dataset_2 " +
    "WHERE VEHICLE_TYPE_CODE_1 IS NOT NULL " +
    "GROUP BY VEHICLE_TYPE_CODE_1 " +
    "ORDER BY CollisionCount ASC " +
    "LIMIT 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/mostContributingFactor", (req, res) => {
    const q = "SELECT CONTRIBUTING_FACTOR_VEHICLE_1 AS CONTRIBUTING_FACTOR, COUNT(CONTRIBUTING_FACTOR_VEHICLE_1) AS FactorCount " +
    "FROM updated_dataset_2 " +
    "WHERE CONTRIBUTING_FACTOR_VEHICLE_1 IS NOT NULL " +
    "GROUP BY CONTRIBUTING_FACTOR_VEHICLE_1 " +
    "ORDER BY FactorCount DESC " +
    "LIMIT 1 OFFSET 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/leastContributingFactor", (req, res) => {
    const q = "SELECT CONTRIBUTING_FACTOR_VEHICLE_1 AS CONTRIBUTING_FACTOR, COUNT(CONTRIBUTING_FACTOR_VEHICLE_1) AS FactorCount " +
    "FROM updated_dataset_2 " +
    "WHERE CONTRIBUTING_FACTOR_VEHICLE_1 IS NOT NULL " +
    "GROUP BY CONTRIBUTING_FACTOR_VEHICLE_1 " +
    "ORDER BY FactorCount ASC " +
    "LIMIT 1 OFFSET 1;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/getLatLong2", (req, res) => {
    const q = "SELECT Latitude, Longitude FROM updated_dataset_2 LIMIT 100000;";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/getLatLong", (req, res) => {
    const rowsPerPage = 100000;
    let currentPage = 1;
    let allData = [];

    // Function to fetch data for a specific page
    const fetchDataForPage = (page) => {
        const offset = (page - 1) * rowsPerPage;
        const q = `SELECT Latitude, Longitude FROM updated_dataset_2 LIMIT ${rowsPerPage} OFFSET ${offset};`;

        db.query(q, (err, data) => {
            if (err) {
                return res.json(err);
            }

            // Add the fetched data to the result
            allData = allData.concat(data);

            // If there are more rows, fetch the next page
            if (data.length === rowsPerPage) {
                currentPage++;
                fetchDataForPage(currentPage);
            } else {
                // All data fetched, return the result
                return res.json(allData);
            }
        });
    };

    // Start fetching data for the first page
    fetchDataForPage(currentPage);
});




app.listen(8700, () => {
    console.log("Connected to port 8700 ...");
});

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log(`Connected to port ${PORT} ...`);
// });

process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.message);
        } else {
            console.log('Database connection closed.');
            process.exit();
        }
    });
});


