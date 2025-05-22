
const express = require('express')
const router = express.Router()
require('dotenv').config()

const VoicebotAPI = process.env.OPENROUTER_API

router.post('/chat',async(req,res)=>{
    const message = req.body.message
    try {
        const apiresponse = await fetch("https://openrouter.ai/api/v1/chat/completions",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${VoicebotAPI}`,
            },
            body : JSON.stringify({
                model:'mistralai/devstral-small:free',
                messages:[{role:"user",content:message}]
            })
    })
    const data = await apiresponse.json()
    
    const reply = data.choices?.[0]?.message?.content || 'Sorry no response for this question'
    
    res.json({reply})

    } 
    catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to get AI response" });
    }

})

module.exports = router