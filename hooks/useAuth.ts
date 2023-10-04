import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "../config/firebase";

export function useAuth() {
  const auth = getAuth(app);
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return {
    user,
  };
}
