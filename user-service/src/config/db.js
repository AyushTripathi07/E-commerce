const { Pool } = require('pg');
require('dotenv').config({path: './.env'});
// require('dotenv').config({path: '../../.env'});
// console.log(process.env.DATABASE_URL);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// pool.connect((err, client, release) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database');
//     }
//     release();
// });

module.exports = { 
    query: (text, params) => pool.query(text, params),
};