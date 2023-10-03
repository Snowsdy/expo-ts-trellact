import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../config/firebase";
import { ErrorType } from "../types/ErrorType";

export function auth(email: string, password: string) {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      if (user) {
        // router.push("/home/");
        if (!user.emailVerified) {
          // Send email verification
          sendEmailVerification(user)
            .catch((err) => {
              console.error(err);
            })
            .then(() => {
              console.log("Verification Email send."); //popup
            });
        }
      }
    })
    .catch((err) => {
      const error = err as ErrorType;
      alert(`Error Code ${error.code} \n ${error.message}`);
    });
}

export function signIn(email: string, password: string) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      if (userCredentials.user.emailVerified) {
        router.push("/home/");
      }
    })
    .catch((err) => {
      const error = err as ErrorType;
      console.error(`Error Code : ${error.code} \n ${error.message}`);
    });
}

export function logOut() {
  const auth = getAuth(app);
  signOut(auth).then(() => {
    router.push("/");
  });
}
