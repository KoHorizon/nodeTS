import express from 'express';
import RandomUser from "./services/randomUser";
import { User } from './models/User';
import { Message } from './models/Message';

import { createConnection, getConnection } from "typeorm";
import "reflect-metadata";
import * as bodyParser from 'body-parser';
import * as sha512 from 'js-sha512';
import * as jwtexpress from 'express-jwt';
import * as jwt from 'jsonwebtoken'
import routerAuth from './Routes/Auth';
import routerMessage from './Routes/Message';
import routerUser from './Routes/Users';

var jwtexpress = require('express-jwt');



const app = express();
const port = 3000;

app.use(bodyParser.json())

app.use(jwtexpress({ secret: 'ThisIsMySecretSentenceBlaBlaBla', algorithms: ['HS256']}).unless({
  path: [
      '/auth',
      { url: "/users", methods: ['POST'] }
  ]
}));



createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "tiger",
  database: "nodeDB",
  entities: [
      User,
      Message
  ],
  synchronize: true,
  logging: false
})



app.get('/', async (req, res) => {
// Test route
  let result = await User.find({relations:[ "message" ], where: {firstname: "John"}})
  console.log(result);
});


// Routes

app.use(routerAuth);
app.use(routerMessage);
app.use(routerUser);


app.listen(port);

