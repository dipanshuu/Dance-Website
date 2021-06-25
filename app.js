const express=require("express");
const path=require("path");
const app=express();
const bodyparser=require("body-parser")
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=8000;

var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
   

});
var Contact=mongoose.model('Contact',contactSchema);
// app.use(express.static('static',options))
app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('view-engine','pug')
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    const con="This is the best content on the internet so far so use it wisely"
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const con="This is the best content on the internet so far so use it wisely"
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
  var myData=new Contact(req.body)
  myData.save().then(()=>{
      res.send("This item has saved to the database")
  }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
  });
// res.status(200).render('contact.pug');
})
  
app.listen(port, ()=>{
    console.log(`The application started succesfully on port ${port}`);
});
