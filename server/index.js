const app = require("./app");

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3001, () => {
  console.log(`Server is running at: ${port}`);
});
