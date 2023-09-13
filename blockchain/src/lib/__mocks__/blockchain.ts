import Block from './block';
import Validation from '../validation';

export default class Blockchain {
  blocks : Block[]
  nextindex : number = 0;

  constructor(){
    this.blocks = [ new Block({
      index: 0,
      hash: "abc",
      previousHash: "",
      data: "genesis",
      timestamp: Date.now()
    } as Block)];
    this.nextindex++;
  
  }
  getLastBlock(): Block {
    return this.blocks[this.blocks.length -1]
  }

  addBlock(block : Block) : Validation {
    if(block.index < 0)  return new Validation(false, " Invalid mock block");

  
    this.blocks.push(block);
    this.nextindex++;
    return new Validation();
  }

  getBlock(hash: string) : Block | undefined {
    return this.blocks.find(b => b.hash === hash);
  }

  isValid() : Validation {
       
    return new Validation;
  }
}