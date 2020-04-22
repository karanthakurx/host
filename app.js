const express =require("express");
const path =require("path");
const fs=require("fs");
const app = express();
const port=80;
const bodyparser =require("body-parser")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'), {useNewUrlParser: true};


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'),) // For serving static files
app.use(express.urlencoded({ extended: true }))



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// define mongoose schema
var contactSchema = new mongoose.Schema({
   Fullname: String,
   Email: String,
   Phonenumber: String,
   Website: String,
   
  });


  //modling of schema

  var contact = mongoose.model('contact', contactSchema);
 





// ENDPOINTS
app.get('/', (req, res)=>{ 
    
    res.status(200).render('index');
})
app.get('/contact', (req, res)=>{ 
    
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{ 
    var mydata =new contact(req.body);
    mydata.save().then(()=>{})
    res.send("form saved") 
})
    

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});