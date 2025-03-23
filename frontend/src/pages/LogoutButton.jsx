import React from "react";
import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/auth"); // Redirect to the auth page
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <div className="container">
      <Button
        position="fixed"
        top="3px"
        left="3px"
        size="sm"
        colorScheme="teal"
        onClick={handleLogout}
        borderRadius="sm"
        borderWidth="1px"
      >
        <FiLogOut size={15} />
        
      </Button>
    </div>
  );
};



export default LogoutButton;
