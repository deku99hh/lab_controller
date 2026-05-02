const express = require('express');

const app = express();
const port = 6010;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('working');
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});