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
const io = new Server(server)

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
const chatRooms = [
  {users:new Set(),chat:globalrecords}
]

io.on('connection',(socket)=>{
  console.log('connected')
})

// app.ws('/msgr',(ws,req)=>{
//   let username = ''
//   let room = -1
//   console.log('Client connected')

// // message event
//   ws.on('message',(message)=>{
//     const inbound = JSON.parse(message)

//     switch(inbound[0]){
//       case 'Username':
//         username = inbound[1]
//         room = inbound[2]
//         chatRooms[inbound[2]].users.add(ws)
//         ws.send(JSON.stringify(['chatRecordTransfer',chatRooms[room].chat]))
//         break;
//       case 'MessageRequest':
//         const clock = new Date()[Symbol.toPrimitive]('number')
//         chatRooms[room].chat.push({sender:username,message:inbound[1],time:clock})
//         chatRooms[room].users.forEach((localUsers)=>{
//           localUsers.send(JSON.stringify(['chatRecordTransfer',chatRooms[room].chat]))
//         })
//         break;
//     }
//   })

//   ws.on('close',()=>{
//     chatRooms[room].users.delete(ws)
//     console.log('socket closed')
//   })
// })


server.listen(port, () => {
  console.log("Server Running on Port:", port);
});