const express = require("express");
const rootRouter = require("./Routes/v1");

const app = express();
app.use(express.json());

app.use("/api/v1", rootRouter);
app.listen("8080", () => {});
