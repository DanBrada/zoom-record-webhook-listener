import Express = require("express")
const app = Express();

app.use(Express.json())

app.post("/webhooks/recordone", (req, res)=>{
	res.set("Access-Controll-Allow-Origin", "*")
	console.log("Request coming!")
	console.log(req)
	console.log(req.body)
	const rqBody = req.body;
	console.log(rqBody)

	res.send("")
})



app.listen(3030, ()=>{console.log("listenting on 3030")})