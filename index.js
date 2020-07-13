const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const questions = require("./questions");

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const Rooms = {};
const Users = {};

const gameTime = 120; // time in seconds

io.on("connection", (socket) => {
  socket.on("create-room", (data) => {
    const room = data.room;
    if (io.sockets.adapter.rooms[room] === undefined) {
      socket.join(room, () => {
        Rooms[room] = {
          players: [{ id: socket.id }],
          length: 1,
          submitCount: 0,
          maxScore: {score: -1}
        };
        Users[socket.id] = { name: data.name, room: room, hasSubmitted: false };
        socket.emit("room-entered");
      });
    } else {
      socket.emit("room-error",{message:"Room already exists"});
    }
  });

  socket.on("join-room", (data) => {
    if (Object.keys(socket.rooms).length === 1) {
      const roomObj = io.sockets.adapter.rooms[data.room];
      if (roomObj !== undefined) {
        if (roomObj.length < 2) {
          socket.join(data.room, () => {
            Rooms[data.room].players.push({ id: socket.id });
            Rooms[data.room].length += 1;
            Users[socket.id] = { name: data.name, room: data.room, hasSubmitted: false };
            if (roomObj.length === 2) {
              socket.emit("room-entered");
              io.to(data.room).emit(
                "questions",{questions:
                questions
                  .map((q) => {
                    return { text: q.text, id: q.id, choices: q.choices };
                  })
                  .sort(() => 0.5 - Math.random()), time: gameTime}
              );
            }
            else{
              socket.emit("room-entered");
            }
          });
        } else {
          socket.emit("room-error",{message:"Room is full"});
        }
      } else {
        socket.emit("room-error",{message:"You are inside of a room"});
      }
    } else {
      console.log(socket.rooms, socket.id);
      console.log("Get out");
    }
  });

  socket.on("submit-answer", (data) => {

    if (Users[socket.id].hasSubmitted === true) {
      return;
    }

    const room = Users[socket.id].room;
    const answers = data.answers;


    let score = 0; // calculate score
    questions.forEach((question) => {
      if (question.correct === answers[question.id]) {
        score++;
      }
    });

    //store score 
    Users[socket.id].score = score;
    Users[socket.id].hasSubmitted = true;

    Rooms[room].submitCount += 1;
    
    if(Rooms[room].maxScore.score < score){
      Rooms[room].maxScore = Users[socket.id];
    }
   
    // If everyone submitted the answers 
    if (Rooms[room].submitCount === Rooms[room].length) {
      const scores = Rooms[room].players.map((player) => {
        if (Users[player.id].score !== undefined) {
          const { name, score } = Users[player.id];
          return { name, score };
        }
      });
      let winCount = 0;
      Rooms[room].players.forEach((player) => {
        if (Users[player.id].score === Rooms[room].maxScore.score) {
          winCount++;
        }
      });

      const winner = {
        result: winCount > 1 ? "draw" : "win",
        name: winCount > 1 ? "" : Rooms[room].maxScore.name,
      };
      io.to(room).emit("result", { scores, winner });
      Rooms[room].players.forEach( player => {
        delete Users[player.id];
      });
      delete Rooms[room];
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Backend server started at ${PORT}`));
