import { describe, test, beforeAll,expect } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

describe("Block tests", () => {
    let genesis : Block;
    beforeAll(() =>{
        genesis = new Block ({
            data: "Genesis Bock"
        } as Block);
    })

    test('Should be valid', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data:  "bloco2"
        } as Block);
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeTruthy();
    })

    test('Should be not valid fallbacks', () => {
        const block = new Block();
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
    })


       test('Should NOT be valid (previous hash)', () => {
        const block = new Block({
            index: 1,
            previousHash: "abc",
            data:  "bloco2"
        } as Block);
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
    })
    test('Should NOT be valid (timestamp)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data:  "bloco2"
        } as Block);
        block.timestamp = -1;
        block.hash = block.getHash();
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (hash)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data:  "bloco2"
        } as Block);
        block.hash = "";
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
    })
    test('Should NOT be valid (data)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            data:  ""
        } as Block);
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
        
    })

    test('Should NOT be valid (index)', () => {
        const block = new Block({
            index: -1,
            previousHash: genesis.hash,
            data:  "bloco2"
        } as Block);
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid.success).toBeFalsy();
    })
    
    
   

})