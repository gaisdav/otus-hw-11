import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";

export interface IFields {
  email: string;
  password: string;
}

const initState: IFields = { email: "", password: "" };

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<IFields>({ ...initState });

  const handleChange = (e: any) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequest = async (fields: IFields) => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const result = await response.json();

    localStorage.setItem("otus_token", result.token);
    window.location.replace("http://localhost:3000");
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      await handleRequest(fields);
      setFields({ ...initState });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form">
      <TextField
        name="email"
        disabled={loading}
        value={fields.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        disabled={loading}
        value={fields.password}
        type="password"
        onChange={handleChange}
      />
      <Button disabled={loading} onClick={handleClick}>
        LOGIN
      </Button>
    </form>
  );
};
