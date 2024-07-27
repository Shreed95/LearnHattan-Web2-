import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogInTutor = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const loginTutor = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/tutor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    const isTutor = json.isTutor;
    if (!json.success) {
      setIsLoading(false);
      setError(json.error);
    }
    if (json.success) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: { user: json, isTutor } });
      setIsLoading(false);
    }
  };

  return { loginTutor, error, isLoading };
};
