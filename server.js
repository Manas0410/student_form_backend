const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const subjectsList = require("./endPoints.json");
app.get("/subjects", (req, res) => {
  try {
    // console.log({ res })
    res.send(subjectsList);
  } catch (error) {
    res.send({ msg: "there is no subject list" });
  }
});

app.get("/subjects/:rollNo", (req, res) => {
  try {
    const { rollNo } = req.params;
    const findingId = subjectsList.find((items) => items.rollNo === rollNo);
    if (findingId === -1) {
      res.send({ msg: "no rollNo is found" });
    }
    res.send({ data: findingId, msg: "Okay, you got the data" });
  } catch (error) {
    res.status(500).send({ msg: "we are facing an issue" });
  }
});

app.post("/subjects", (req, res) => {
  try {
    const newSubjectsList = {
      rollNo: req.body.rollNo,
      name: req.body.name,
      extraSubject: req.body.extraSubject,
      subjects: req.body.subjects,
    };

    if (Object.keys(newSubjectsList).length === 0) {
      res.send({ msg: "You have enter all the fields" });
      return;
    }
    subjectsList.push(newSubjectsList);
    res.send({ msg: "succesfully posted" });
  } catch (error) {
    res.status(500).send({ msg: "failed to post the list" });
  }
});

app.delete("/subjects/:id", (req, res) => {
  try {
    const { rollNo } = req.params;
    const findIdInList = subjectsList.find((items) => items.rollNo === +rollNo);
    if (findIdInList === -1) {
      res.send({ msg: "failed to delete the list" });
      return;
    }
    subjectsList.splice(findIdInList, 1);
    res.send({ deleted: "successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "we are facing an issue please try again later" });
  }
});

app.listen(port, () => {
  console.log(`localhost:${port} todo api`);
});
