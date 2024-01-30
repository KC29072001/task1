const express = require("express");
const createContact = require("./controllers/createContact");
const getContact = require("./controllers/getContact");
const updateContact = require("./controllers/updateContact");
const deleteContact = require("./controllers/deleteContact");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

//REPLACE THESE

const url = "https://YOURDOMAIN.freshsales.io/api/contacts";

const apiKey = process.env.YOURAPIKEY; 



const headers = 
{
  Authorization: `Token token=${apiKey}`,
  "Content-Type": "application/json",
};

app.post("/createContact", (req, res) => {
  createContact.createContactHandle(req, res, url , headers);
});


app.post("/getContact", (req, res) => {
  getContact.getContactHandle(req, res, url, headers);
});



app.post("/updateContact", (req, res) => {
  updateContact.updateContactHandle(req, res, url, headers);
});


app.post("/deleteContact", (req, res) => {
  deleteContact.deleteContactHandle(req, res, url, headers);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
