var buffertools = require('buffertools')

module.exports = {
  toHash: function (hex) {
    return buffertools.reverse(new Buffer(hex, 'hex'))
  },

  toCompactTarget: function (target) {
    var exponent = Math.ceil(target.bitLength() / 8)
    var targetString = target.toString(16)
    if (targetString.length % 2 === 1) targetString = '0' + targetString
    var mantissa = Number.parseInt(targetString.substr(0, 6), 16)
    if (mantissa & 0x800000) {
      mantissa >>= 8
      exponent++
    }
    return (exponent << 24) | mantissa
  }
}
