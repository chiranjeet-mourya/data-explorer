import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  res.header(
    "Access-Control-Expose-Headers",
    "X-Total-Count, Link"
  );

  next();
});

server.use(router);

server.listen(3001, () => {
  console.log(
    "JSON Server running at http://localhost:3001"
  );
});