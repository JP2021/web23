import { describe, test, beforeAll,expect } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

describe("Block tests", () => {
    let genesis : Block;
    beforeAll(() =>{
        genesis = new Block (0, "", "Genesis Bock");
    })

    test('Should be valid', () => {
        const block = new Block(1, genesis.hash, "bloco 2");
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeTruthy();
    })

       test('Should NOT be valid (previous hash)', () => {
        const block = new Block(1, "abc", "bloco 3");
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeFalsy();
    })
    test('Should NOT be valid (timestamp)', () => {
        const block = new Block(1, genesis.hash, "bloco 2");
        block.timestamp = -1;
        block.hash = block.getHash();
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeFalsy();
    })

    test('Should NOT be valid (hash)', () => {
        const block = new Block(1, genesis.hash, "bloco 2");
        block.hash = "";
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeFalsy();
    })
    test('Should NOT be valid (data)', () => {
        const block = new Block(1, genesis.hash, "");
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeFalsy();
    })

    test('Should NOT be valid (index)', () => {
        const block = new Block(-1, genesis.hash, "bloco 2");
        const valid = block.isValid(genesis.hash,genesis.index);
        expect(valid).toBeFalsy();
    })
    
    
   

})