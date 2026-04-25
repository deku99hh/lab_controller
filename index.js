const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/clint', (req, res) => {
    res.send('here')
})

app.post('/clint/info', (req, res) => {
    const clint = req.body
    res.json(clint)
    // update database with (clint)
})

app.get('/clint/info', (req, res) => {
    res.json()
    // sind all info in database
})
















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
