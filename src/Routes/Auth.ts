import { User } from '../models/User';
import * as jwt from 'jsonwebtoken'
import * as sha512 from 'js-sha512';


import express from 'express';

let routerAuth = express.Router();

routerAuth.post('/auth', async (req, res) => {
    let user = await User.findOne({where: {  
        firstname: req.body.firstname,
        password: sha512.sha512(req.body.password)
    }})

    let token = jwt.sign({ id: user.id }, 'ThisIsMySecretSentenceBlaBlaBla');

    res.json({status: 200, data: token})
});







export default routerAuth;