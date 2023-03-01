const favicon = require("serve-favicon");
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });
app.use(express.static("public"));
const mergepdf_fun = require("./mergepdf");
app.use(favicon(__dirname + "/favicon.ico"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 100), async (req, res, next) => {
  console.log(req.files);
  let d;
  if (req.files) {
    d = await mergepdf_fun(req.files);
  }
  res.redirect(`http://localhost:3000/static/merged_${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
