const SHA256 = require('crypto-js/sha256')

class Block {
  // special function to define unique attributes for any instance of this class
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  toString() {
    return `Block -
    Timestamp: ${this.timestamp}
    lastHash : ${this.lastHash.substring(0, 10)}
    Hash     : ${this.hash.substring(0, 10)}
    Data     : ${this.data}`;
  }
  // static means we can use directly without needing to create a new instance
  static genesis() {
  	return new this('Genesis time', '-----', 'f1r57-h45h', ['']);
  }

  static mineBlock(lastBlock, data){
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.createHash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }

  static createHash(timestamp, lastHash, data){
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
  	const { timestamp, lastHash, data } = block;
    return Block.createHash(timestamp, lastHash, data);
  }
}

module.exports = Block; // node module
