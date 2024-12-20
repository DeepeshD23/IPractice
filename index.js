const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const { json } = require('stream/consumers');
const { error } = require('console');

const app = express();
const PORT = 8000;

// app.get('/users',(req,res)=>{
//     const html=`<ul>${users.map((user)=>`<li>${user.first_name}<li/>`)}</ul>`;
//     res.send(html);
// });

//Middleware-Plugin
app.use(express.urlencoded({ extended : false}))


//Rest Api  

app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id",(req,res)=>{
    const id =Number(req.params.id);
    const user = users.find(user => user.id === id );
    return res.json(user);
});

app.post('/api/users',(req,res)=>{
    
    //Create new user
    const body = req.body;
    // console.log("Body",body);
    users.push({...body,id : users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id : users.length+1});
    });
   
});

app.patch('/api/users/:id',(req,res)=>{
    //edit the user     
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find(user => user.id === id);
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success"});
    });
});

app.delete('/api/users/:id',(req,res)=>{
    //delete user`
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    users.splice(users.indexOf(user),1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success"});
    });
});

app.listen(PORT,()=> console.log('Server Started at PORT : 8000'));