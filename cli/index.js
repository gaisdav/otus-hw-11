const { Command } = require("commander");
const axios = require("axios");
const fs = require("fs");

const baseURL = "http://localhost:3001";
const program = new Command();
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
});

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-lg, --login <value>", "Your login")
  .option("-ps, --password <value>", "Your password")
  .option("-i, --course <value>", "Find course by id")
  .option("-cs, --courses", "Courses list")
  .option("-dl, --delete <value>", "Delete course by id")
  .option("-mk, --create", "Create test course")
  .parse(process.argv);

const options = program.opts();

if (Object.keys(options).length === 0) {
  program.help();
}

// Авторизация
if (options.login && options.password) {
  axiosInstance
    .post("/login", {
      email: options.login,
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
}

// Получение списка курсов
if (options.courses) {
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
}

// Получение курса по id
if (options.course) {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .get(`/courses/${options.course}?secret_token=${token}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Создание курса
if (options.create) {
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
}

// Удаление курса
if (options.delete) {
  const storage = fs.readFileSync("./cli/storage.json");
  const { token } = JSON.parse(storage);

  axiosInstance
    .delete(`/courses/${options.delete}?secret_token=${token}`)
    .then(() => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log(error);
    });
}
