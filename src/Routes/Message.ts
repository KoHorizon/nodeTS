import express from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';

let routerMessage = express.Router();


routerMessage.post('/message', async (req, res) => {
    // @ts-ignore
    let user = await User.findOne({where: {id: req.user.id}})
    let message = new Message();
    

    message.content = req.body.content;
    message.user = user;

    let messageSend = await Message.save(message);
    res.json({status: 200, data: messageSend})
});



routerMessage.get('/message', async (req, res) => {
    // @ts-ignore
    let user = await User.findOne({where: {id: req.user.id}})
    let messages = await Message.find({where: {user: user}})

    res.json({status: 200, data: messages})
});


export default routerMessage;