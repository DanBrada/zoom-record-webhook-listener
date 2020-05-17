import express = require("express")
const app = express();
import {ZoomMediaWebHookData} from "./classes/recievedWebhook";
require("dotenv").config();
const path = require("path")
import fetch = require("node-fetch")

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


app.get("/getToken", (req, res)=>{
	res.set("Access-Control-Allow")
	try{
		const code = req.query.code;
		const appId = process.env.APPID
		const appSecret = process.env.APPSECRET
		fetch(`https://api.zoom.us/oauth/token?grant_type=authorization&code=${code}&redirect_uri=${escape("localhost:3000")}`,{
			method: "POST",
			headers: {
				authentication: `Base ${new Buffer(`${appId}:${appSecret}`).toString('base64')}`
			}
		}).then(async rez=>{
			console.log(rez.body)
			const responseBody = await parseResponseStream(rez)
			const responseJSON = JSON.parse(responseBody)
			if(rez.status == 200 && responseJSON.access_token){
				res.status(200).send(JSON.stringify({
					token: responseJSON.access_code
				}))
			}else{
				res.status(rez.status)
				res.send(responseJSON)
			}
		})
	}catch(e){
		res.status(500).send(e.message)
	}
})

app.get("/backendTest",(req,res)=>{
	res.set("Content-Type","text/html")
	res.status(200)
	res.sendFile(path.resolve("index.html"))
})

app.listen(3030, ()=>{console.log("listenting on 3030")})


async function parseResponseStream(response){
	const reader = response.body.getReader()
	let outString = ""
	await reader.read().then(function cytac({done,value}){
		if(done) return
		value.forEach(e=>outString += String.fromCharCode(e))
		return reader.read.then(cytac)
	})

	return outString
}