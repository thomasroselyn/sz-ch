const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: process.env.DATABASE_URL || 'sezzle_challenge',
    host: 'ec2 - 23 - 21 - 109 - 177.compute- 1.amazonaws.com' || 'localhost',
    port: process.env.PGPORT || 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

module.exports = pool;