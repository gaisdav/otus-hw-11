export const setTokenToPath = (
  path: string,
  queries?: { [key: string]: string }
) => {
  let fullPath = path + "?secret_token=" + localStorage.getItem("otus_token");
  if (queries) {
    for (const fullPathKey in queries) {
      fullPath += "&" + fullPathKey + "=" + queries[fullPathKey];
    }
  }
  return fullPath;
};
