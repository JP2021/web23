import Block from './block';
import Validation from './validation';

export default class Blockchain {
  blocks : Block[]
  nextindex : number = 0;

  constructor(){
    this.blocks = [ new Block({
      index: this.nextindex,
      previousHash: "",
      data: "genesis"
    } as Block)];
    this.nextindex++;
  
  }
  getLastBlock(): Block {
    return this.blocks[this.blocks.length -1]
  }

  addBlock(block : Block) : Validation {
    const lastBlock= this.getLastBlock();
    const validation = block.isValid(lastBlock.hash, lastBlock.index);
    if(!validation.success)
    return new Validation(false, `Inavalid block ${validation.message}`);
  
    this.blocks.push(block);
    this.nextindex++;
    return new Validation();
  }

  getBlock(hash: string) : Block | undefined {
    return this.blocks.find(b => b.hash === hash);
  }

  isValid() : Validation {
    for (let i = this.blocks.length -1; i > 0; i--){
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i-1];
      const validation = currentBlock.isValid(previousBlock.hash,previousBlock.index);
      if(!validation.success) 
      return new Validation(false, `Inavlid block #${currentBlock.index}: ${validation.message}`);
    }
    return new Validation;
  }
}