import express = require("express")
const app = express();

app.use(express.json())

app.options("/webhooks/recordone", (req,res)=>{
	res.set("Access-Control-Allow-Origin","*")
	res.set("Access-Control-Allow-Headers","*")
	res.status(200)
	res.send("")
})

app.post("/webhooks/recordone", (req, res)=>{
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Headers","*")
	console.log("Request coming!")
	console.log(req)
	console.log(req.body)
	const rqBody = req.body;
	console.log(rqBody)

	res.status(418)
	res.send(req.body)
})



app.listen(3030, ()=>{console.log("listenting on 3030")})