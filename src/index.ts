import app from "./app.js";
import env from "./utils/env.js";

console.log("SERVER BOOT");

const server = app.listen(env.get("port"), () => {
  console.log(`Server running on port ${env.get("port")}`);
});

const shutdown = () => {
  console.log("SHUTDOWN");
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
