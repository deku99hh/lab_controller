// const express = require('express')
// const app = express()
// const port = 6000

// const mongoose = require('mongoose')
// const DBurl = 'mongodb+srv://omarrashed1000:bodo@learn-mango-db.ixz7ecc.mongodb.net/lab_controller_DB?appName=learn-mango-db'
// mongoose.connect(DBurl).then(()=>{
//     console.log('connected to db');
// })

// app.use(express.json())

// const lab_router = require('./routes/routes.lab_controller')

// app.use('/', lab_router)



// app.listen(port, '0.0.0.0', () => {
//   console.log(`app listening on port ${port}`)
// })


// =============================================================================================================




const express = require('express');
const http = require('http'); // بنحتاجه عشان الـ WebSocket
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app); // إنشاء سيرفر HTTP
const io = new Server(server, {
    cors: { origin: "*" } // عشان يسمح بالاتصال من أي مكان حالياً
});

const port = 5000;

// المانجو دي بي
const DBurl = 'mongodb+srv://omarrashed1000:bodo@learn-mango-db.ixz7ecc.mongodb.net/lab_controller_DB?appName=learn-mango-db';
mongoose.connect(DBurl)
    .then(() => console.log('connected to db'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        // كده السيرفر هيفضل شغال حتى لو الداتا بيز وقعت، وهيديك رسالة واضحة
    });


app.use(express.json());
const cors = require('cors');
app.use(cors()); // قبل الـ routes


// هنمرر الـ io للـ controller عشان يقدر يبعت رسايل
const lab_controller = require('./controllers/controllers.lab_controller');
lab_controller.setSocketIo(io); 

const lab_router = require('./routes/routes.lab_controller');
app.use('/', lab_router);

// إدارة اتصالات الـ WebSocket
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
    
    // الكلاينت لما يفتح يسجل نفسه بغرفة (Room) برقم الجهاز والسكشن
    socket.on('register', (data) => {
        const roomName = `lab_${data.labNumber}_pc_${data.pcNumber}`;
        socket.join(roomName);
        console.log(`PC ${data.pcNumber} in Lab ${data.labNumber} joined room ${roomName}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});