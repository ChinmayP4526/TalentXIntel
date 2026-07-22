import React, { useEffect, useState } from "react";
import profile_picture_light from "../assets/profile-picture-light.png";
import profile_picture_dark from "../assets/profile-picture-dark.png";
import { useTheme } from "../context/ThemeContext";
const BASE_URL = "http://localhost:5000";

const ProfileNav = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
 const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/studauth/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="flex items-center gap-3">
      <img
        src={
          theme === "dark"
            ? profile_picture_dark
            : profile_picture_light
        }
        alt="Profile"
        className="w-10 h-10 rounded-full" style={{"width" : "40px"}}
      />

      <div>
        <h3 className="fs-5 justify-content-center align-center text-center mt-1 text-white">
          {user ? user.name : "Loading..."}
        </h3>
      </div>
    </div>
  );
};

export default ProfileNav;