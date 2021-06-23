const express = require('express');
const app = express();
const PORT = 5000

const customMiddleware = ()=>{
    console.log("middleware executed");
}

app.use(customMiddleware);

app.get('/',(req,res)=>{
    res.send("success app.get");
})

app.listen(PORT,()=>{
    console.log("server is running on", PORT);
});