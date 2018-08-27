const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/index');
const P2pServer = require('./p2p-server');

// allow us to run Port 3001 (or whichever port is specified) when running local server
const HTTP_PORT = process.env.HTTP_PORT || 3001;

// creates express app
const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

// receive JSON in post requests
app.use(bodyParser.json());

app.get('/blocks',(req,res)=>{
  res.json(bc.chain); // send json back to user
})

app.post('/mine',(req,res)=>{
  const block = bc.addBlock(req.body.data);
  console.log(`new block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect('/blocks');
})

//
app.listen(HTTP_PORT, ()=>console.log(`Listening on Port ${HTTP_PORT}`));
p2pServer.listen();
