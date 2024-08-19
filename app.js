require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");

// We import all the routers
const user = require("./router/user");
const backOffice = require("./router/backOffice");
const newsletter = require("./router/newsletter");
const register = require("./router/register");
const login = require("./router/login");
const transaction = require("./router/transaction");
const dataProtectionConsent = require("./router/dataProtectionConsent");
//const coinpayments = require("./router/coinpayements");
const stripe = require("./router/stripe");
const activity = require("./router/activity");
//const KYC = require("./router/KYC");
const contact = require("./router/contact");

const PORT = process.env.PORT || 5000;

const app = express();

const http = require("http");

//const { default: Coinpayments } = require("coinpayments");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:19006", "http://127.0.0.1:5173","https://testnjs.ozalentour.com", "https://ozalabs.com","https://testfr.ozalabs.com","https://testfr.ozapay.me","https://fr.ozalentour.com","https://en.ozalentour.com","https://esp.ozalentour.com", "https://de.ozalentour.com","https://backoffice.ozalentour.com"],
  })
);
// We call all the routers
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use("/register", register);
app.use("/login", login);
app.use("/user", user);
app.use("/transaction", transaction);
app.use("/dataProtectionConsent", dataProtectionConsent);
//app.use("/coin", coinpayments);
app.use("/stripe", stripe);
app.use("/activity", activity);
//app.use("/KYC", KYC);
app.use("/contact", contact);
app.use("/backOffice", backOffice);
app.use("/newsletter", newsletter);

app.get("/", (req,res)=> {
	res.send("test api");
});


app.get("/downloadApplication",(req,res)=> {
	res.download("./OzalentourAndroid.apk", function(error){
		if (error) {
			console.log("Error : ", error);
		} else {
			console.log("ok");
		}
        
	});
});

http.createServer(app).listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
