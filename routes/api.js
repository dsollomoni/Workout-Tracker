const app = require("express").Router();
const db = require("../models");

app.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([
    { 
      $set: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.json(err)
    })
})


app.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
      $set: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    },
    { 
      $sort: { day: -1 }
    },
    { $limit: 7 } 
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout.reverse())
    })
    .catch((err) => {
      res.json(err)
    })
})

    app.post("/api/workouts/", (req, res) => {
        db.Workout.create(req.body).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
          });
      });

      app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
          { _id: req.params.id }, { $push: {exercises: req.body} }
        ).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
          res.status(400).json(err);
        });
    });

module.exports = app;