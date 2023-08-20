const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

let requests = 0

let videoStatus = {
    playing: false,
    started: null
}


app.get('/', (req, res) => {
    requests += 1

    res.sendFile('videoStr.html', { root: path.join(__dirname + '/public') })
    console.log("Requests: " + requests);


})

let post = 0

app.post('/stream', (req, res) => {


    if (!post) {
        let content = req.body

        console.log(content);

        videoStatus = content
        post += 1
    }
    console.log("Posts: " + post);

})



app.get('/started', (req, res) => {

    let current_status = videoStatus
        // current_status = JSON.stringify(current_status)


    res.json(current_status)
})




app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} `))