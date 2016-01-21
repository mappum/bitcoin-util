var buffertools = require('buffertools')
var BN = require('bn.js')

function isHexString (str) {
  return !(typeof str !== 'string' || str.length === 0 || str.length % 2)
}

function toHash (hex) {
  if (hex.length !== 64 || !isHexString(hex)) {
    throw new Error('argument must be a hex string')
  }
  return buffertools.reverse(new Buffer(hex, 'hex'))
}

function toCompactTarget (target) {
  if (!target.bitLength) {
    // if target is not a BN
    if (Buffer.isBuffer(target)) {
      // target is Buffer
      target = new BN(target.toString('hex'), 16)
    } else if (isHexString(target)) {
      // target is hex string
      var buf = new Buffer(target, 'hex')
      buf = buffertools.reverse(buf)
      target = new BN(buf.toString('hex'), 16)
    } else {
      throw new Error('target must be of type "BN" (from bn.js package), "Buffer", or a hex string')
    }
  }

  var bits = target.bitLength()
  var targetString = target.toString(16)
  var exponent = Math.ceil(bits / 8)
  if (targetString.length % 2 === 1) targetString = '0' + targetString
  var mantissa = Number.parseInt(targetString.substr(0, 6), 16)
  if (mantissa & 0x800000) {
    mantissa >>= 8
    exponent++
  }
  return (exponent << 24) | mantissa
}

module.exports = {
  toHash: toHash,
  toCompactTarget: toCompactTarget
}
