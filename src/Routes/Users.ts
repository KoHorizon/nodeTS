import express from 'express';
import { User } from '../models/User';
import * as sha512 from 'js-sha512';


let routerUser = express.Router();

routerUser.get('/users/message', async(req,res) => {
    let users = await User.find({relations: ["message"]})

    res.json({status: 200, data: users})

})


routerUser.get('/users', async(req,res) => {
    let users = await User.find()

    res.json({status: 200, data: users})

})

routerUser.post('/users', async (req, res) => {
    let user = new User();

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = sha512.sha512(req.body.password);

    let savedUser = await User.save(user);
    res.json({status: 200, data: savedUser})
})



export default routerUser;