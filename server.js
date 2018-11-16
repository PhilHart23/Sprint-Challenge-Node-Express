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

// Post a new action

server.post("/actions", (req, res) => {  
    actions
     .insert(req.body)
     .then(action => {
         res.status(201).json(action);
     })
     .catch(err => {
         res.status(500).json({ message: "There was an error creating a new action" })
     })
})

// Update a action 

server.put("/actions/:id", (req, res) => {
    const { id } = req.params
    const  changes  = req.body
    actions
     .update(id, changes)
     .then(action => {
         if (action) {
             res.status(200).json({ message: "Action updated" })
         } else {
           res.status(500).json({ message: "There was an error updating the action" })  
         }
     })
     .catch(err => {
        res.status(500).json({ message: "There was a error creating a new action", err });
      });
  });
  


















server.listen(port, () => console.log(`Server listening on ${port}`));