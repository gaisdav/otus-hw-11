import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import "./styles.css";
import { Link } from "react-router-dom";
import { CreateCourse, IFields } from "./components/createCourse";
import { ICourse } from "../course/types";
import { setTokenToPath } from "../../utils";

export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(setTokenToPath("http://localhost:3001/courses")).then(async (res) => {
      if (res.status === 401) {
        window.location.replace("http://localhost:3000/login");
      }
      const arr = await res.json();
      setCourses(arr);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Card variant="outlined" className="loading">
        <Typography>Загрузка...</Typography>
      </Card>
    );
  }

  const handleCreateCourse = async (fields: IFields) => {
    setCourseLoading(true);
    try {
      const response = await fetch(
        setTokenToPath("http://localhost:3001/courses"),
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
      setCourses([...courses, await response.json()]);
    } finally {
      setCourseLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Курсы:</Typography>

      <CreateCourse
        onCreateCourse={handleCreateCourse}
        loading={courseLoading}
      />

      <div>
        {!courses.length ? (
          <Typography>Список пуст</Typography>
        ) : (
          courses.map((course) => {
            return (
              <Card variant="outlined" className="course-item" key={course._id}>
                <Typography>{course.name}</Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Link to={"/course/" + course._id}>Подробнее</Link>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
