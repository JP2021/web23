import express from 'express';
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
const PORT : number = 3002;


const app = express();

app.use(morgan('tiny'));
app.use(express.json());

const blockchain = new Blockchain();

app.get('/status',( req, res, next)=>{
  res.json({
    numberOfBlocks : blockchain.blocks.length,
    isValid : blockchain.isValid(),
    lastBlock: blockchain.getLastBlock()
  })
})

app.get('/blocks/:indexOrhash', (req ,res, next)=>{

  let block;
  if(/^[0-9]+$/.test(req.params.indexOrhash))
  
 block = blockchain.blocks[parseInt(req.params.indexOrhash)];
else
block = blockchain.getBlock(req.params.indexOrhash);

if (!block)
return res.sendStatus(404);
else 
return res.json(block)
})

app.listen(PORT, () =>{
  console.log(`BlockChain is running at ${PORT}`);
})