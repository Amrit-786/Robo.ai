const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/Route/authRoute')
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('chatbot backend is running');
})

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log(err));


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;


//intialize the gemini api
const genAI = new GoogleGenerativeAI(process.env.api_key);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

//post route to handle request from the frontend
app.post('/api/chat', async(req,res)=>{

    try{
        const {userMessage,history} = req.body;

      // Start a chat or continue the conversation based on the history
       let chat = model.startChat({history});
       let result = await chat.sendMessage(userMessage);
       res.json({response: result.response.text()});
    }
    catch(error){
        console.error('Error :', error);
        res.status(500).json({error:'Internal server error'});
   }  
});


const genAI1 = new GoogleGenerativeAI(process.env.voice_KEY);

const model1 = genAI1.getGenerativeModel({
    model:"gemini-1.5-flash",
});


app.post('/api/voice', async(req,res)=>{
    const {message} = req.body;

    try{
        const result = await model1.generateContent([
            {text:message},
        ]);
        const aiResponse = result.response.text();
        res.json({response: aiResponse})
    }
    catch(error){
        console.error('Error generating AI response:', error);
        res.status(500).json({error:'Failed to generate content'});
    }
});


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
}); 

