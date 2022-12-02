const { Router } = require("express");
const ClassModel = require("../Models/class.model");
const VolunteerModel = require("../Models/volunteer.model");

const volunteerRouter = Router();


volunteerRouter.post("/register", async (req, res) => {
  try {
    const { fullname, email, location, availability, spokenLanguages, phone } =
      req.body;
    const volunteer = new VolunteerModel(req.body);
    console.log(volunteer);
    await volunteer.save((err, succ) => {
      if (err) {
        return res.send({
          message: "Registration Unsuccessfull",
          error: "error",
        });
      } else {
        return res
          .status(201)
          .send({ message: "Volunteer added Successfully", success: "success" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});


volunteerRouter.get("/", async (req, res) => {
    let volunteers = await VolunteerModel.find();
    res.send(volunteers);
});


volunteerRouter.get("/allocate", async (req, res) => {
  let user = await ClassModel.find();
  
  res.send(user);
});



module.exports = volunteerRouter;
