import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";

export interface IFields {
  name: string;
  description: string;
}

interface ICreateCourse {
  loading: boolean;
  onCreateCourse: (fields: IFields) => Promise<void>;
}

const initState: IFields = { name: "", description: "" };

export const CreateCourse: FC<ICreateCourse> = ({
  onCreateCourse,
  loading,
}) => {
  const [fields, setFields] = useState<IFields>({ ...initState });

  const handleChange = (e: any) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    await onCreateCourse(fields);
    setFields({ ...initState });
  };

  return (
    <form className="form">
      <TextField
        size="small"
        name="name"
        value={fields.name}
        onChange={handleChange}
        label="Название"
        disabled={loading}
      />
      <TextField
        multiline
        rows={4}
        name="description"
        value={fields.description}
        onChange={handleChange}
        disabled={loading}
        label="Описание"
      />
      <Button onClick={handleClick} variant="outlined" disabled={loading}>
        Создать курс
      </Button>
    </form>
  );
};
