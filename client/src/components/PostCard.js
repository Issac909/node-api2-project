import React, { useState, useEffect } from "react";
import axios from "axios";

const PostCard = () => {
  const [post, setPost] = useState([]);

  const getPosts = () => {
    return axios
      .get("http://localhost:4200/api/posts/")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log("This is getposts", err);
      });
  };

  const getPostById = (id) => {
    const postId = post.id;
    if (postId == id) {
      return axios
        .get(`localhost:4200/api/posts/${id}`)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <>
      {post.map((info) => {
        return (
          <>
            <h2>This should be title: {info.title}</h2>
            <p>This should be contents: {info.contents}</p>
          </>
        );
      })}
    </>
  );
};

export default PostCard;
