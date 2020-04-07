import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [newPost, setnewPost] = useState({
    title: "",
    contents: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setnewPost({
      ...newPost,
      [e.target.title]: e.target.value,
    });
  };

  const makepost = post => {
    return axios
      .post("http://localhost:5000/api/posts", post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(console.log("This is makeposts", err));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makepost(newPost);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          title="title"
          placeholder="title"
          value={newPost.title}
          onChange={onChange}
        />

        <input
          type="text"
          title="contents"
          placeholder="contents"
          value={newPost.contents}
          onChange={onChange}
        />

        <input type="submit" />
      </form>
    </>
  );
};

export default PostForm;