import React, { useState, useContext, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { AuthContext } from "../../context/auth";

import "./Home.css";

const Home = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const { doRequest: getPostsRequest, errors: getPostsErrors } = useRequest({
    url: "/post",
    method: "get",
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  const { doRequest: deletePostRequest } = useRequest({
    url: "/post",
    method: "delete",
    onSuccess: async (data) => {
      await getPostsRequest();
    },
  });

  const { doRequest: createPostRequest, errors: createPostRequestErrors } =
    useRequest({
      url: "/post",
      method: "post",
      onSuccess: async (data) => {
        await getPostsRequest();
        setText("");
      },
    });

  const deletePost = async (id) => {
    await deletePostRequest(null, id);
  };

  useEffect(() => {
    async function getPostsFn() {
      await getPostsRequest();
    }

    getPostsFn();
  }, []);
  const renderButtons = () => {
    return (
      <div className="home">
        <div className="container">
          <div className="content">
            <h1>
              Connect and share <br />
              with the people
            </h1>
            <div className="buttons">
              <button
                className="btn login"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Log In
              </button>
              <button
                className="btn register"
                onClick={() => {
                  history.push("/register");
                }}
              >
                Create Merchant Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const createPost = async () => {
    await createPostRequest({ text });
  };
  const renderCreatePost = () => {
    return (
      <div className="create-post-card">
        <h3>Create a post</h3>
        <input
          type="text"
          value={text}
          placeholder="Hi World..."
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
        />
        {createPostRequestErrors ? createPostRequestErrors : null}
        <button className="btn" onClick={createPost}>
          submit
        </button>
      </div>
    );
  };

  const renderPosts = () => {
    return posts.map((post, index) => (
      <div className="post-card" key={index}>
        <h3>{post.user.username}</h3>
        <p>{post.text}</p>
        {user.role === "admin" || user.id === post.user._id ? (
          <button onClick={() => deletePost(post._id)}>delete</button>
        ) : null}
      </div>
    ));
  };
  return (
    <div>
      {!user ? (
        renderButtons()
      ) : (
        <>
          <div className="special-heading">Recent Posts</div>

          <div className="posts">
            <div className="posts-content">
              {renderCreatePost()}
              {!getPostsErrors ? (
                renderPosts()
              ) : (
                <h3>Not Available posts now</h3>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
