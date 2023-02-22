import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";

export interface IFields {
  author: string;
  text: string;
}

interface IAddComment {
  loading: boolean;
  onAddComment: (fields: IFields) => Promise<void>;
}

const initState: IFields = { author: "", text: "" };

export const AddComment: FC<IAddComment> = ({ onAddComment, loading }) => {
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
    await onAddComment(fields);
    setFields({ ...initState });
  };

  return (
    <form className="form" method="POST" action="http://localhost:3001/comment">
      <TextField
        size="small"
        name="author"
        id="author"
        label="Автор"
        required
        disabled={loading}
        value={fields.author}
        onChange={handleChange}
      />
      <TextField
        multiline
        rows={4}
        name="text"
        id="text"
        value={fields.text}
        label="Текст"
        required
        disabled={loading}
        onChange={handleChange}
      />

      <Button variant="outlined" onClick={handleClick} disabled={loading}>
        Добавить коммент
      </Button>
    </form>
  );
};
