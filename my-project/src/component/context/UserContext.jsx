import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");

  // ----------- AUTO LOGIN ON PAGE REFRESH -----------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // Backend se user fetch karega
    fetch("http://localhost:5000/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user); // Login restore
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  // Update job preparation
  const updateJobPreparation = (job_preparation) => {
    setUser((prev) =>
      prev ? { ...prev, job_preparation } : { job_preparation }
    );
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateJobPreparation, language, setLanguage }}
    >
      {children}
    </UserContext.Provider>
  );
};
