import { describe, test, jest, expect } from '@jest/globals';
import Blockchain from '../src/lib/blockchain';
import Block from '../src/lib/block';

jest.mock('../src/lib/block')

describe("Blockchain tests", () => {

    test('Should be has genesis ', () => {
        const blockchain = new Blockchain();
        
        expect(blockchain.blocks.length).toEqual(1);
    })
    test('Should be valid (genesis', () => {
        const blockchain = new Blockchain();
        
        expect(blockchain.isValid().success).toEqual(true);
    })
    test('Should be  not valid (genesis', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            data:  "bloco2"
        } as Block));
        blockchain.blocks[1].index = -1  ;      
        expect(blockchain.isValid().success).toEqual(false);
    })

    test('Should addBlock', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            data:  "bloco2"
        } as Block));
        console.log(result.message);
        expect(result.success).toEqual(true);
    })
    test('Should getblock', () => {
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash);
        expect(block).toBeTruthy();
    })

    test('Should NOT addBlock', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: -1,
            previousHash: blockchain.blocks[0].hash,
            data:  "bloco2"
        } as Block));
        expect(result.success).toEqual(false);
    })
   

    test('Should valid (two blocks ', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            data:  "bloco2"
        } as Block));
        expect(blockchain.isValid().success).toEqual(true);
    })

   

})