import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function useAuth() {
  const [isSignIn, setIsSignIn] = useState(null);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if(user){
              setIsSignIn(true);
            }
            else {
              setIsSignIn(false);
            }
          });
    },[]);

  return isSignIn;
}

export { useAuth }