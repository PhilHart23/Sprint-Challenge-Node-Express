const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

const port = 8000


//middleware

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({}));


//////////////////////////////////////////// Actions endpoints ///////////////////////////////////////////////////////



//Get all actions

server.get("/actions", (req, res) => {
    actions
     .get()
     .then(actions => {
        res.status(200).json(actions);
    })
     .catch(err => {
        res.status(500).json({ message: "The action information could not be received", err })
    })
})

// Get actions by ID

server.get("/actions/:id", (req, res) => {
    const { id } = req.params
    actions
     .get(id)
     .then(action => {
         if (action) {
             res.status(200).json(action)
         } else {
             res.status(404).json({ message: "The action with the specified ID doe snot exist" })
         }
     })
     .catch(err => {
         res.status(500).json({ message: "the action information does not exist", err })
     })
})

















server.listen(port, () => console.log(`Server listening on ${port}`));