import { Card, Typography } from "@mui/material";
import "./styles.css";
import { AddComment, IFields } from "./components/addComment";
import { useEffect, useState } from "react";
import { IClass } from "./types";
import { useParams } from "react-router-dom";
import { setTokenToPath } from "../../utils";

export const ClassEntity = () => {
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [classEntity, setClassEntity] = useState<IClass | null>(null);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(setTokenToPath("http://localhost:3001/classes/" + params.id)).then(
      async (res) => {
        if (res.status === 401) {
          window.location.replace("http://localhost:3000/login");
        }
        const arr = await res.json();
        setClassEntity(arr);
        setLoading(false);
      }
    );
  }, []);

  const handleAddComment = async (fields: IFields) => {
    setCommentLoading(true);
    const response = await fetch(
      setTokenToPath("http://localhost:3001/comments", {
        classId: params.id || "",
      }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      }
    );

    if (response.status === 401) {
      window.location.replace("http://localhost:3000/login");
    }

    const updatedClass = await response.json();

    setClassEntity(updatedClass);
    setCommentLoading(false);
  };

  if (loading) {
    return (
      <Card variant="outlined" className="loading">
        <Typography>Загрузка...</Typography>
      </Card>
    );
  }

  if (!classEntity) {
    return (
      <Card variant="outlined" className="loading">
        <Typography>Ошибка загрузки</Typography>
      </Card>
    );
  }

  return (
    <div>
      <Typography variant="h4">Занятие: {classEntity.name}</Typography>
      <Typography variant="h5">Описание:</Typography>
      <Typography variant="body1">{classEntity.description}</Typography>

      <a href={classEntity.video} target="_blank">
        ссылка на запись занятия
      </a>

      <AddComment onAddComment={handleAddComment} loading={commentLoading} />

      <div className="comments-wrapper">
        <Typography variant="h5">Комментарии:</Typography>

        <div>
          {classEntity.comments.map((comment) => {
            return (
              <Card
                variant="outlined"
                className="comment-item"
                key={comment._id}
              >
                <Typography>{comment.author}</Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
