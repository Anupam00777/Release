const app = require("./app");

const port = process.env.PORT || 3001;

app.get("/testing", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});
