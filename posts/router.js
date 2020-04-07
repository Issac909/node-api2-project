const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

//RETURN AN ARRAY OF ALL POSTS
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((hub) => {
      res.status(200).json(hub);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the Posts",
      });
    });
});

//CREATES A POST USING THE INFORMATION SENT INSIDE THE `REQUEST BODY`
router.post("/", (req, res) => {
  if (!req.body.title && !req.body.contents) {
    return res.status(400).json({
      message: "Please enter info for title and contents for the post",
    });
  } else {
    Posts.insert({ title: req.body.title, contents: req.body.contents })
      .then((hub) => {
        res.status(201).json(hub);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error while attempting to save. Check data structure.",
        });
      });
  }
});

//RETURNS THE POST OBJECT WITH THE SPECIFIED ID
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((hub) => {
      if (hub.length > 0) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({
          message: "Request not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Your request does not exist",
      });
    });
});

//CREATES A COMMENT FOR THE POST WITH THE SPECIFIED ID USING INFORMATION SENT INSIDE OF THE `REQUEST BODY`
router.post("/:id/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      message: `Can't submit with empty field`,
    });
  } else {
    Posts.findPostComments(req.params.id).then((hub) => {
      if (hub.length > 0) {
        Posts.insertComment({ text: req.body, post_id: req.params.id })
          .then((data) => {
            res
              .status(201)
              .json({ text: req.body.text, post_id: req.params.id });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Posting failed. Check data structure.",
            });
          });
      } else {
        res.status(404).json({
          error: "The post requested does not exist.",
        });
      }
    });
  }
});

//RETURNS AN ARRAY OF ALL THE COMMENT OBJECTS ASSOCIATED WITH SPECIFIED ID
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          error: "The requested post does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The information can not be recieved.",
      });
    });
});

//REMOVES THE POST ASSOCIATED WITH ID AND RETURNS
router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((data) => {
      if (data.length > 0) {
        Posts.remove(req.params.id)
          .then((post) => {
            res.status(200).json({ deleted: true, message: "Terminated" });
          })
          .catch((err) => {
            res.status(500).json({
              error: "The post can not be removed.",
            });
          });
      } else {
        res.status(404).json({
          message: `Requested data doesn't exist`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Couldn't remove requested data`,
      });
    });
});

//UPDATES THE POST WITH THE SPECIFIED 'id' USING DATA FROM THE `request body`
//RETURNS THE MODIFIED OBJECT IF CHANGES WERE MADE
//THIS IS A LITTLE LONG, BUT IT WILL UPDATE THE TITLE *OR* DESCRIPTION *OR* BOTH
router.put("/:id", (req, res) => {
  if (req.body.title && req.body.contents) {
    Posts.update(
      req.params.id,
      { title: req.body.title },
      { contents: req.body.contents }
    )
      .then((hub) => {
        if (hub == 1) {
          res
            .status(201)
            .json({ title: req.body.title, contents: req.body.contents });
        } else {
          res.status(404).json({
            message: `Requested endpoint does not exist`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: `Couldn't update data. Check the structure thats being passed.`,
        });
      });
  // } else if (req.body.title) {
  //   Posts.update(req.params.id, { title: req.body.title })
  //     .then((hub) => {
  //       if (hub == 1) {
  //         res.status(201).json({ title: req.body.title });
  //       } else {
  //         res.status(404).json({
  //           message: `Requested endpoint does not exist`,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         message: `Couldn't update data. Check the structure thats being passed.`,
  //       });
  //     });
  // } else if (req.body.contents) {
  //   Posts.update(req.params.id, { contents: req.body.contents })
  //     .then((hub) => {
  //       if (hub == 1) {
  //         res.status(201).json({ contents: req.body.contents });
  //       } else {
  //         res.status(404).json({
  //           message: `Requested endpoint does not exist`,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         message: `Couldn't update data. Check the structure thats being passed.`,
  //       });
  //     });
  } else {
    return res.status(400).json({
      message: "Cannot submit empty fields",
    });
  }
});

module.exports = router;
