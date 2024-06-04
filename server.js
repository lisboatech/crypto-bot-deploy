const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");


const dev = process.env.NODE_ENV != "production";

const nextServer = next({ dev });

const handle = nextServer.getRequestHandler();

dotenv.config({path: "./.env.local"});

const app = require("./app");


const DB = process.env.DATABASE.replace(
    "<PASSWORD>", 
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connection successful!"));


const port = 3000; 


nextServer.prepare().then(() => {

    
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    
    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
});