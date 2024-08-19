const axios = require("axios");
require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");

// Authentification Sendinblue
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SENDINBLUE_API_KEY;

const contactEmail = require("../services/sendinblue/contactEmail");

module.exports.contact = async (req, res) => {
  console.log("HELLO");
  let contactData = req.body;

  try {
    contactEmail(contactData, res);
  } catch (err) {
    res.status(500).json("Can't send contact email");
  }
};


module.exports.sendContact= async(req,res) => {
     
    try{ 
      let data=req.body;
		console.log(data);
      const { captchaToken} = req.body;
 	  console.log(captchaToken);
 // Call Google's API to get score
       const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${`6Lcr1lIiAAAAAKiLgpdVDYlbZEA8ybAlRPt7I1vW`}&response=${captchaToken}`
      );  
     
      let username=data.username;
      let email=data.email;
      let phone=data.phone; 
      let message=data.message;
      let societe=data.societe
      let langue=data.langue;
      let subjectType=data.subjectType;
      let wallet=data.walllet;
      let templateIdL="";
      let numberid=await whereLangue(langue);
      
      if(response.status === 200){
        
        let sendOza=await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
            sender: { email: "info@ozalentour.com", name: "Ozalentour" },
            subject: subjectType+username,
            templateId: numberid.templateIdL,
            params: {
              EMAIL: email,
              USERNAME :username,
              MESSAGE:message,
              SOCIETE: societe,
              PHONE:phone,
              WALLET:wallet,
              SUBJECTTYPE:subjectType
              
            },
            messageVersions: [
              {
                to: [
                  {
                    email: "contact@ozalentour.fr",
                  },
                ],
              },
            ],
          }).then(res=>{return true}).catch((err)=>{return false});
           let reply= await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
            sender: { email: "info@ozalentour.com", name: "Ozalentour" },
            subject: numberid.templateIdSubjetResendPass,
            templateId: numberid.sendEmailUser,
            params: {

              USERNAME :username,
            },
            messageVersions: [
              {
                to: [
                  {
                    email:email,
                  },
                ],
              },
            ],
          }).then(res=>{return true}).catch((err)=>{return false}); 

           res.status(200).json({
        message: true,
        templateIdSubjetResendPass: numberid.templateIdSubjetResendPass,
      });
        }
        }
        catch(err){res.status(404).json({message:err})}; 
      }
  
      const whereLangue= (langue,res)=>{
        
        if(langue=="fr"){
            let templateIdL = {
              templateIdL: 98,
              sendEmailUser:99,
            templateIdSubjetResendPass:"Votre demande est pris en compte",
            }
            return templateIdL;  
        }
        else if(langue=="en"){
                 let templateIdL = {
              templateIdL: 100,
              sendEmailUser:101,
            templateIdSubjetResendPass:"Your request is taken into account",
            }
			return templateIdL; 
        }
        else if (langue=="es"){
            templateIdL=84;
            return templateIdL;
        }
        else{
            return false;
        }
      }