const express       = require('express');
const redis         = require('redis');
const { Client }    = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Postgres connection
const pgClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'devs_db',
    password: 'postgres',
    port: 5432,
});

pgClient.connect();
pgClient.on("connect", () => {
    console.log("Postgres connected successfully");
});    

pgClient.on("end", () => {
    console.log("Postgres Connection end");
});


// Redis connection

const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on("connect", () => {
    console.log("Redis connected successfully");
});



// Cache middleware
function cache(req, res, next){
    const id = parseInt(req.params.id)
    redisClient.get(id, (err, data)=>{
        if(err)
            throw err
        if(data !== null){
            console.log("Redis Cache Hit...");
            // res.status(200).json(data)
            res.send(setResponse(JSON.parse(data)))
        }
        else
            next()
    })
}

// Express 

// get all users on "/users"
const getUsers = async (req, res) => {
    await pgClient.query('SELECT * FROM dummy ORDER BY id ASC', (err, data) => {
        if (err) {
            throw err
        }
        res.status(200).json(data.rows)
    })
}

const setResponse = (data) => {
    const id = data.id
    const name = data.name
    const age = data.age
    return `<h2>Id = ${id}  Name = ${name}  Age = ${age}</h2>`
}

// get all users on "/users/:id"
const getUserById = async (req, res) => {

    try {
        const id = parseInt(req.params.id)
        console.log("Fetching from database...");
        
        const data = await pgClient.query(`SELECT * FROM dummy WHERE id = $1`, [id]);
        // res.status(200).json(data.rows)
        
        redisClient.set(id, JSON.stringify(data.rows[0]))
        
        if(data.rows !== null)
            res.send(setResponse(data.rows[0]))
        else    
            res.send({'msg':'Data Not Found'})
    } catch(err) {
        res.send(err)
    }
}

// Routes
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, Redis and Postgres Connection' })
})

app.get("/users", getUsers);

app.get("/users/:id", cache, getUserById);

// pgClient.end();

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});