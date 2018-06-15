import * as express from 'express'
const mysql2promise = require('mysql2/promise');
const mysql2 = require('mysql2');
const app = express();

/**
 * ASYNC
 */
let asyncConn;
(async function () {
    try {
        asyncConn = await mysql2promise.createConnection({ host: "127.0.0.1", user: "root", password: "", database: "users" });
    } catch (err) {
        throw err
    }
})()

app.get('/async/', async function (req, res) {
    let [r, f] =  await asyncConn.execute('SHOW DATABASES', [1]).catch((e) => { return res.json({ message: 'MYSQL failed' }) })
    res.json({ 'r': r, 'f': f });
});

/**
 * SYNC
 */
const syncConn = mysql2.createConnection({ host: "127.0.0.1", user: "root", password: "", database: "users" });

app.get('/sync/', function (req, res) {
    let execution = syncConn.execute('SHOW DATABASES', [1], function (error, results, fields) {
        res.json( {query: execution.sql, 'r': results, 'f': fields} )
    })
});

const server = app.listen(7080, '0.0.0.0', function () { console.log('LIVE @ http://0.0.0.0:7080/') })
