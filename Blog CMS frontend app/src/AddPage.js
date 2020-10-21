import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";

import PageLayout from "./PageLayout";

import useAuth from "./useAuth";

const ADD_POST_API = process.env.REACT_APP_API_POST_ADD;

function AddPage() {
  const user = useAuth();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(ADD_POST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
      .then((response) => response.json())
      .then((data) => history.push("/list"))
      .catch((err) => console.log("error submitting", err));
  };

  return (
    <PageLayout title={`Add new post`}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="This is my post title"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            className="form-control"
            id="body"
            rows="5"
            placeholder="This is my post body."
            onChange={(e) => setBody(e.target.value)}
            required={true}
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Publish
        </button>
      </form>
    </PageLayout>
  );
}

export default withAuthenticator(AddPage);
