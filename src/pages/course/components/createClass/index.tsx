import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";

export interface IFields {
  name: string;
  video: string;
  description: string;
}

interface ICreateClass {
  loading: boolean;
  onCreateClass: (fields: IFields) => Promise<void>;
}

const initState: IFields = { name: "", video: "", description: "" };

export const CreateClass: FC<ICreateClass> = ({ onCreateClass, loading }) => {
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
    await onCreateClass(fields);
    setFields({ ...initState });
  };

  return (
    <form className="form">
      <TextField
        size="small"
        onChange={handleChange}
        name="name"
        value={fields.name}
        disabled={loading}
        label="Название"
      />
      <TextField
        size="small"
        onChange={handleChange}
        name="video"
        value={fields.video}
        label="Ссылка на видео"
        disabled={loading}
      />
      <TextField
        multiline
        rows={4}
        onChange={handleChange}
        name="description"
        value={fields.description}
        label="Описание"
        disabled={loading}
      />
      <Button variant="outlined" onClick={handleClick} disabled={loading}>
        Создать занятие
      </Button>
    </form>
  );
};
