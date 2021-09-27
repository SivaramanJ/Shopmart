import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserApi(token) {
  const [isLoggged, setisLoggged] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          
          setisLoggged(true);
          res.data.role === 1 ? setisAdmin(true) : setisAdmin(false);
          
        } catch (err) {
          alert(err.response.data.msg);
        }
      }
    };
    getUser();
  }, [token]);
  return {
    isLoggged: [isLoggged, setisLoggged],
    isAdmin: [isAdmin, setisAdmin],
  };
}
