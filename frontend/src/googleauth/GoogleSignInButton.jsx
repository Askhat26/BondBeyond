import { auth, provider } from "../firebase/firebase.js"
import { signInWithPopup } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast.js";
import { Button } from "@chakra-ui/react";



const GoogleSignInButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        localStorage.setItem("user-threads", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} colorScheme="red" width="full">
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
