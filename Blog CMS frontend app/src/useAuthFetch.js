import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export default function useAuthFetch(url, options = {}, defaultValue) {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("got user", user);

        console.log("fetching...");
        fetch(url, {
          ...options,
          headers: {
            Authorization:
              "Bearer " + user.signInUserSession.accessToken.jwtToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("got data");
            setData(data);
          })
          .catch((err) => {
            console.log("error fetching data", err);
          });
      })
      .catch((err) => {
        console.log("error during auth", err);
      });
  }, [Auth]);

  return data;
}
