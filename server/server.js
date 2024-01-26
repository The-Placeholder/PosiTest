import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from 'pg';
import http from 'http'
import { Server } from 'socket.io'

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

  // Socket Server based on http server
const server = http.createServer(app)
const io = new Server(server,{cors:{origin:'*'}})
  // Socket Server

//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

//  ------------------------------------------------------------ DB API ROUTES


/* Example route to query the database */
app.get('/instructor/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM user WHERE id = $1 OR assigned_to = $1', [id]);
      const instructor = result.rows[0]; // Assuming you expect one instructor with the provided ID
      client.release();
      res.json(instructor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching instructor');
    }
  });

  // TEST CHATHISTORY
const globalrecords = [
  {sender:'senderA',message:'hello',time:'2 hours ago'},
  {sender:'senderB',message:'hello, how are you',time:'2 hours ago'},
  {sender:'senderA',message:'good, how are you',time:'2 hours ago'},
  {sender:'senderB',message:'I\'m doing good as well',time:'2 hours ago'},
  {sender:'senderA',message:'how can I help you',time:'2 hours ago'},
  {sender:'senderB',message:'I\'m having trouble with problem A',time:'2 hours ago'},
  {sender:'senderA',message:'sorry i\'ll help you in 1 sec, brb',time:'2 hours ago'}
]
  // TEST CHATHISTORY

// Chatrooms, 0th index for global chat
const chatRooms = [globalrecords]
// Chatrooms

// variable for saving previous sockets, to reduce redundant sockets
const userSockets = {}

io.on('connection',(socket)=>{
  let room = -1
  let username = null

  socket.on('ComponentLoad',(userArr)=>{
    if(room>=0){ //leaves previous room
      socket.leave(`${room}`)
    }else if(userSockets[userArr[0]]){ //disconnects redundant sockets
      userSockets[userArr[0]].disconnect()
    }

    if(!chatRooms[userArr[1]]){ //creates chatroom 
      chatRooms[userArr[1]]=[]
    }

    username=userArr[0]
    room=userArr[1]
    userSockets[username]=socket //saves socket to username key

    socket.join(`${userArr[1]}`)
    socket.emit('chatRecordTransfer',chatRooms[userArr[1]])
    console.log(`user: ${userArr[0]} joined room ${userArr[1]}`)
  })

  socket.on('MessageRequest',(message)=>{
    const clock = new Date()[Symbol.toPrimitive]('number')
    chatRooms[room].push({sender:username,message:message,time:clock})
    io.to(`${room}`).emit('chatRecordTransfer',chatRooms[room])
  })
})

server.listen(port, () => { //needs to be server.listen not app.listen
  console.log("Server Running on Port:", port);
});