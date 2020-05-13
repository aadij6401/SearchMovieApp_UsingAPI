const express=require('express');
const app=express();
const path=require('path');
const request=require('request');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/search',(req,res)=>{
	res.render('homepage');
});

app.get('/results',(req,res)=>{
	let query=req.query.search;
   request('https://api.themoviedb.org/3/search/movie?api_key=bf9659a6dfa8121804edf328e27619cf&query='+query , (error,resp,body)=>{
    if(error){
    	console.log("Error: "+error);
    }
    let data=JSON.parse(body);
	res.render('movies',{data:data,searchQuery:query});

   });  
    
})
app.listen(3000,()=>{
	console.log("Server is started.")
})