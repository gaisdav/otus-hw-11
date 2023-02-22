import { Card, Typography } from "@mui/material";
import "./styles.css";
import { CreateClass, IFields } from "./components/createClass";
import { Link, useParams } from "react-router-dom";
import { ICourse } from "./types";
import { useEffect, useState } from "react";
import { setTokenToPath } from "../../utils";

export const Course = () => {
  const [loading, setLoading] = useState(false);
  const [classLoading, setClassLoading] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(setTokenToPath("http://localhost:3001/courses/" + params.id)).then(
      async (res) => {
        if (res.status === 401) {
          window.location.replace("http://localhost:3000/login");
        }
        const data = await res.json();
        setCourse(data);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <Card variant="outlined" className="loading">
        <Typography>Загрузка...</Typography>
      </Card>
    );
  }

  if (!course) {
    return (
      <Card variant="outlined" className="loading">
        <Typography>Ошибка загрузки</Typography>
      </Card>
    );
  }

  const handleAddClass = async (fields: IFields) => {
    setClassLoading(true);
    const response = await fetch(
      setTokenToPath("http://localhost:3001/classes", {
        courseId: params.id || "",
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

    const updatedCourse = {
      ...course,
    };

    updatedCourse.classes.push(await response.json());
    setCourse(updatedCourse);
    setClassLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Курс {course.name}</Typography>

      <CreateClass onCreateClass={handleAddClass} loading={classLoading} />

      <div>
        <Typography variant="h5">Занятия:</Typography>
        <div className="classes-wrapper">
          {!course.classes.length ? (
            <Typography>Список пуст</Typography>
          ) : (
            course.classes.map((classEntity) => {
              return (
                <Card
                  variant="outlined"
                  className="class-item"
                  key={classEntity._id}
                >
                  <Typography>{classEntity.name}</Typography>
                  <Typography variant="body2">
                    {classEntity.description}
                  </Typography>
                  <Link to={"/class/" + classEntity._id}>Подробнее</Link>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
