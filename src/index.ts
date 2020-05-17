import Express = require("express")
const app = Express();

app.post("/webhooks/recordingComplete", (req, res)=>{
	const rqBody  = req.body;
	console.log(rqBody)

	res.send("")
})



app.listen(3030, ()=>{console.log("listenting on 3030")})