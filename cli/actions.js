const axios = require("axios");
const fs = require("fs");

const baseURL = "http://localhost:3001";
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
});

//actions
// Авторизация
const login = (options) =>
  axiosInstance
    .post("/login", {
      email: options.user,
      password: options.password,
    })
    .then((response) => {
      fs.writeFile(
        "./cli/storage.json",
        JSON.stringify(response.data),
        function (err) {
          if (err) throw err;
          console.log("File is created successfully.");
        }
      );
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

// Получение списка курсов
const getCourses = () => {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .get("/courses?secret_token=" + token)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Получение курса по id
const getCourse = (options) => {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .get(`/courses/${options.courseId}?secret_token=${token}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Создание курса
const createCourse = () => {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .post(`/courses?secret_token=${token}`, {
      name: "test",
      description: "test",
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// удаление курса
const deleteCourse = (options) => {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .delete(`/courses/${options.courseId}?secret_token=${token}`)
    .then(() => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { login, getCourses, getCourse, createCourse, deleteCourse };
