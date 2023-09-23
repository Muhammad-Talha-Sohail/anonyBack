const express = require("express");
require("dotenv").config({ path: "./.env" });
const app = express();
const Port = process.env.PORT;
const path = require("path");
const server = require("http").createServer(app);
const cors = require("cors");
const otpRoutes = require("./routes/otpRoutes");
const activate = require("./routes/activateRoutes");
const roomRoutes = require("./routes/roomRoutes")
const connectDb = require("./Db/conDb");

const peerConnection = new RTCPeerConnection()
peerConnection.onicecandidate=()=>console.log('iceCandidate',JSON.stringify(peerConnection.localDescription))
let dataChannel;
peerConnection.ondatachannel=(e)=>{
  dataChannel = e.channel;
  dataChannel.onopen=()=>console.log('channel open')
  dataChannel.onmessage = (e)=>console.log('Message',e.data)}





// middlewareuse
const io = require('socket.io')(server,{
  origin: 'http://localhost:5173',
  methods: 'GET,POST',

})
app.use(express.json({ limit: "8mb" }));
const corsOption = {
  credentials: true,
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use("/api/", otpRoutes);
app.use("/api/", activate);
app.use("/api/", roomRoutes);



let answer;
app.use("/storage", express.static("storage"));
//connectDb
connectDb();
// socket
io.on("connection", (socket) => {


socket.on('user-joined',(data)=>{
  answer = peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})

socket.on('offer',offer=>{
const receive =offer;
peerConnection.setRemoteDescription(receive)


  
}


  




)

  
});
server.listen(Port, () => console.log(`server is running at port ${Port}`));
//run server
