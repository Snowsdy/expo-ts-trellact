import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  updatePassword,
  User,
} from "firebase/auth";
import app from "../config/firebase";
import { ErrorType } from "../types/ErrorType";

export const auth = getAuth(app);

export function createUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      if (user) {
        // router.push("/home/");
        if (!user.emailVerified) {
          // Send email verification
          sendEmailVerification(user)
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              console.log("Verification Email send.");
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
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      if (userCredentials.user.emailVerified) {
        router.push("/home/");
      }
    })
    .catch((err) => {
      const error = err as ErrorType;
      console.log(`Error Code : ${error.code} \n ${error.message}`);
    });
}

export function logOut() {
  signOut(auth).then(() => {
    router.push("/");
  });
}

export function sendResetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * @param code
 * @returns the email address if valid
 */
export function confirmResetPasswordCode(code: string) {
  return verifyPasswordResetCode(auth, code);
}

export function confirmResetPassword(code: string, newPassword: string) {
  return confirmPasswordReset(auth, code, newPassword);
}

export function updateUserPassword(user: User, newPassword: string) {
  return updatePassword(user, newPassword);
}
