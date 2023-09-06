import sha256 from 'crypto-js/sha256';
import Validation from './validation';
export default class Block {
    index: number;
    timestamp: number;
    hash: string;
    previousHash: string;
    data: string;


    constructor(index: number, previousHash: string, data: string){
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.getHash();
    }

    getHash(): string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash).toString();

    }

    isValid(previousHash: string, previousIndex: number): Validation {
        if (previousIndex !== this.index -1) return new Validation(false, "Invalid index");
        if (this.hash !== this.getHash()) return new Validation(false, "Invalid hash");
        if(!this.data)return new Validation(false, "Invalid data");
        if(this.timestamp < 1)return new Validation(false, "Invalid timestamp");
        if(this.previousHash !== previousHash)return new Validation(false, "Invalid previous hash");
        return new Validation();
    }
}