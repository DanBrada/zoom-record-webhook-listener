import express = require("express")
const app = express();
import {ZoomMediaWebHookData} from "./classes/recievedWebhook";
require("dotenv").config();

app.use(express.json())

app.options("/webhooks/recordone", (req,res)=>{
	res.set("Access-Control-Allow-Origin","*")
	res.set("Access-Control-Allow-Headers","*")
	res.status(200)
	res.send("")
})

app.post("/webhooks/recordone", (req, res)=>{
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Headers","Content-Type")
	console.log("Request coming!")
	console.log(req)
	console.log(req.body)
	const rqBody: ZoomMediaWebHookData = req.body;
	console.log(rqBody)

	res.status(418)
	res.send(req.body)
})

app.options("/getRecord/:meetId", (req, res)=>{
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Headers","*")
	res.status(200)
	res.send("")
})

app.get("/getRecord/:meetId",async (req,res)=>{
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Headers","*")
	let auth =""
	try{
		auth = res.get("authentication")
	}catch(e){
		res.status(401)
		res.send(JSON.stringify({
			code: 401,
			message: "[Unauthorized] You haven't supplied authentication token"
		}))
	}

	const sendFetch = await fetch(`https://api.zoom.us/v2/meetings/${req.params.meetId}/recordings`,{
		method: "GET",
		headers:{
			authentication: auth,
		}
	}).then(result=>{
		if(result.status == 401) {
			res.status(401)
			res.send(JSON.stringify({
				code: 401,
				message: "Zoom API returned that your supplied token is invalid"
			}))
		} //TODO Dan: process output
	})
})


app.get("/getToken?", (req, res)=>{

})


app.listen(3030, ()=>{console.log("listenting on 3030")})