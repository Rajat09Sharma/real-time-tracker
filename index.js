const express=require("express");
const path=require("path");
const http=require("http");
const {Server}=require("socket.io");

const app=express();
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static("public"))


const server=http.createServer(app);
const io=new Server(server);

app.get("/",(req,res)=>{
    res.render("index");
})

io.on("connection",(socket)=>{
    console.log("connected",socket.id);
    
    socket.on("send-location",(data)=>{     
        socket.emit("receive-location",{id:socket.id,...data})
    })
})

server.listen(3000,()=> console.log("server started on port 3000."))