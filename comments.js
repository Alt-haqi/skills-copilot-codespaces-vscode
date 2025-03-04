// Create web server
// 1. Create a web server
// 2. Load the comments.json file
// 3. Create a route to get all comments
// 4. Create a route to get a comment by its id
// 5. Create a route to add a new comment
// 6. Create a route to update a comment
// 7. Create a route to delete a comment
// 8. Start the server

// 1. Create a web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 2. Load the comments.json file
const commentsPath = path.join(__dirname, 'comments.json');

// 3. Create a route to get all comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading comments file');
      return;
    }

    try {
      const comments = JSON.parse(data);
      res.json(comments);
    } catch (err) {
      res.status(500).send('An error occurred while parsing comments file');
    }
  });
});

// 4. Create a route to get a comment by its id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading comments file');
      return;
    }

    try {
      const comments = JSON.parse(data);
      const comment = comments.find((c) => c.id == id);

      if (comment) {
        res.json(comment);
      } else {
        res.status(404).send('Comment not found');
      }
    } catch (err) {
      res.status(500).send('An error occurred while parsing comments file');
    }
  });
});

// 5. Create a route to add a new comment
app.post('/comments', express.json(), (req, res) => {
  const comment = req.body;

  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading comments file');
      return;
    }
    // Add code to handle the data
    try {
      const comments = JSON.parse(data);
      comment.id = comments.length + 1;
      comments.push(comment);

      fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('An error occurred while writing comments file');
          return;
        }

        res.json(comment);
      });
    } catch (err) {
      res.status(500).send('An error occurred while parsing comments file');
    }
  });
});