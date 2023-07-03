const { Command } = require("commander");
const {
  login,
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
} = require("./actions");

const program = new Command();
program.version("1.0.0").description("An example CLI for managing a directory");

program
  .command("login")
  .description("Авторизация")
  .option("-u, --user <value>", "Your login")
  .option("-p, --password <value>", "Your password")
  .action(async (options) => {
    await login(options);
  });

program
  .command("courses")
  .description("Получение списка курсов")
  .action(async () => {
    await getCourses();
  });

program
  .command("course")
  .description("Получение курса по id")
  .option("-id, --courseId <value>", "Set course id")
  .action(async (options) => {
    await getCourse(options);
  });

program
  .command("create")
  .description("Создание курса")
  .action(async () => {
    await createCourse();
  });

program
  .command("delete")
  .description("Удаление курса по id")
  .option("-id, --courseId <value>", "Set course id")
  .action(async (options) => {
    await deleteCourse(options);
  });

program.parse(process.argv);
