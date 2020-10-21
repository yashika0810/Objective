import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import slugify from "slugify";

import PageLayout from "./PageLayout";

import useAuth from "./useAuth";
import useAuthFetch from "./useAuthFetch";

const GET_POSTS_API = process.env.REACT_APP_API_POST_LIST;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_SITE_URL;

function ListPage() {
  const user = useAuth();
  const posts = useAuthFetch(GET_POSTS_API, {}, []);

  return (
    user &&
    posts && (
      <PageLayout title={`Posts by ${user.username}`}>
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.title}>
                <td>
                  <a
                    href={`${PUBLIC_URL}/${user.username}/${slugify(
                      post.title
                    )}.html`}
                  >
                    {post.title}
                  </a>
                </td>
                <td>{post.date || "n/a"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageLayout>
    )
  );
}

export default withAuthenticator(ListPage);
