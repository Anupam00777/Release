const app = require("./app");

const port = process.env.PORT || 3001;

app.get("/testing", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});
