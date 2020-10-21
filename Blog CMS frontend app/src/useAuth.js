import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export default function useAuth() {
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("got user", user);
        setUser(user);
      })
      .catch((err) => {
        console.log("error getting auth", err);
      });
  }, []);

  return user;
}
