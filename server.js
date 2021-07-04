const express = require('express') // require the express package
const cors = require('cors');
const app = express() // initialize your express app instance
const PORT = process.env.PORT;
const mongoose = require ('mongoose');
const axios = require('axios'); // require the package
app.use(cors()) // after you initialize your express app instance
app.use(express.json())
require('dotenv').config();


mongoose.connect('mongodb://localhost:27017/exam', {useNewUrlParser: true, useUnifiedTopology: true});

const digimonSchema = new mongoose.Schema({
    name: String,
    img:String,
    level:String
  });
  const digimonModal = mongoose.model('digion', digimonSchema);

// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })

app.get('/getData', getDataHandler)
server.post('/addToFav',addToFavHandler);
server.get('/getFavData',getFavDataHandler);


class Digimon {
    constructor(item) {
        this.name = item.name;
        this.img = item.img;
        this.level = item.level;
    }

}
 function getDataHandler(req, res){
    const url = `https://digimon-api.vercel.app/api/digimon`;
    axios.get(url).then(result => {
        let digimonArr = result.data.map(item => {
            return new Digimon(item);
        })
        res.send(digimonArr);
    })
}

function addToFavHandler(req,res){
    const {name,img,level}=req.body;

    let newDigimon= new digimonModal({
        name:name,
        img:img,
        level:level
    })
    newDigimon.save();
}
function getFavDataHandler(req,res){
    digimonModal.find({},(error,data)=>{
        res.send(data)
    })
}


// inside your callback function
// axios.get(url).then(response => response.data).catch(error => console.log(error));
// app.listen(PORT,()=>{
//     console.log(`Worked!! ${PORT}`);
// })

// app.listen(8080)

app.listen(8080, console.log(`Listening on 8080 `)); // kick start the express server to work