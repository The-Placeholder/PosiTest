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

const server = http.createServer(app)
const io = new Server(server,{cors:{origin:'*'}})

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

// TEST USERS DATA... 0INDEX for GLBOAL CHAT
const chatRooms = [globalrecords]

io.on('connection',(socket)=>{
  let room = -1
  let username = null

  socket.on('ComponentLoad',(userArr)=>{
    if(room>=0){
      socket.leave(`${room}`)
    }

    if(!chatRooms[userArr[1]]){
      chatRooms.push([])
    }

    username=userArr[0]
    room=userArr[1]

    socket.join(`${userArr[1]}`)
    socket.emit('chatRecordTransfer',chatRooms[userArr[1]])
    console.log(`user: ${userArr[0]} joined room ${userArr[1]}`)
  })

  socket.on('MessageRequest',(message)=>{
    const clock = new Date()[Symbol.toPrimitive]('number')
    chatRooms[room].push({sender:username,message:message,time:clock})
    console.log(`responding to message request`)
    io.to(room).emit('chatRecordTransfer',chatRooms[room])
  })
})

server.listen(port, () => {
  console.log("Server Running on Port:", port);
});