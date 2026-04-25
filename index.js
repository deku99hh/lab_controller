const express = require('express')
const app = express()
const port = 6000

const mongoose = require('mongoose')
const DBurl = 'mongodb+srv://omarrashed1000:bodo@learn-mango-db.ixz7ecc.mongodb.net/lab_controller_DB?appName=learn-mango-db'
mongoose.connect(DBurl).then(()=>{
    console.log('connected to db');
})

app.use(express.json())

const lab_router = require('./routes/routes.lab_controller')

app.use('/', lab_router)








app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


// const now = new Date();
// const options = {
//   year: 'numeric', month: '2-digit', day: '2-digit',
//   hour: '2-digit', minute: '2-digit', second: '2-digit',
//   hour12: false
// };
// const formatter = new Intl.DateTimeFormat('en-CA', options); // en-CA uses YYYY-MM-DD
// const formatted = formatter.format(now).replace(', ', ' ');
// // Result: "2024-07-23 08:00:00"
// console.log(formatted)
