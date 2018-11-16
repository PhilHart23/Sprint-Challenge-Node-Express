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
  
  // Delete a action 

  server.delete("/actions/:id", (req, res) => {
      const { id } = req.params
      actions
       .remove(id)
       .then(action => {
           res.status(200).json(action)
       })
       .catch(err => {
           res.status(500).json({ message: "There was an error deleting the action" })
       })
  })

  //////////////////////////////////////////// Projects endpoints ///////////////////////////////////////////////////////

// Get all projects

server.get("/projects", (req, res) => {
    projects
     .get()
     .then(projects => {
        res.status(200).json(projects);
    })
     .catch(err => {
        res.status(500).json({ message: "The action information could not be received", err })
    })
})

// Get project by ID

server.get("/projects/:id", (req, res) => {
    const { id } = req.params
    projects
     .get(id)
     .then(project => {
         if (project) {
             res.status(200).json(project)
         } else {
             res.status(404).json({ message: "The project with the specified ID doe snot exist" })
         }
     })
     .catch(err => {
         res.status(500).json({ message: "the project information does not exist", err })
     })
})


// Post a new Project

server.post("/projects", (req, res) => {  
    projects
     .insert(req.body)
     .then(project => {
         res.status(201).json(project);
     })
     .catch(err => {
         res.status(500).json({ message: "There was an error creating a new project" })
     })
})

// Update a project

server.put("/projects/:id", (req, res) => {
    const { id } = req.params
    const  changes  = req.body
    projects
     .update(id, changes)
     .then(project => {
         if (project) {
             res.status(200).json({ message: "project updated" })
         } else {
           res.status(500).json({ message: "There was an error updating the project" })  
         }
     })
     .catch(err => {
        res.status(500).json({ message: "There was a error creating a new project", err });
      });
  });

  // Delete a project

  server.delete("/projects/:id", (req, res) => {
    const { id } = req.params
    projects
     .remove(id)
     .then(project => {
         res.status(200).json(project)
     })
     .catch(err => {
         res.status(500).json({ message: "There was an error deleting the project" })
     })
})

// Get projects actions

server.get("/projects/actions/:id", (req, res) => {
    const { id } = req.params;
    projects
      .getProjectActions(id)
      .then(actions => {
        if (actions) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: "the project actions with the specified ID do not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "The project actions info could not be received", err });
      });
  });

















server.listen(port, () => console.log(`Server listening on ${port}`));