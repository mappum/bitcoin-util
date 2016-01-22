var test = require('tap').test
var BN = require('bn.js')
var u = require('./')

var buffertools
try {
  buffertools = require('buffertools')
} catch (e) {
  buffertools = require('browserify-buffertools')
}

test('toHash', function (t) {
  t.throws(function () { u.toHash('012345') }, 'throws for invalid hash length')
  t.throws(function () { u.toHash('') }, 'throws for empty string')
  var actual = u.toHash('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')
  var expected = new Buffer([
    0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
  ])
  t.equal(actual.compare(expected), 0)
  t.end()
})

test('compressTarget', function (t) {
  var targets = [
    {
      expanded: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      compact: 0x2200ffff
    },
    {
      expanded: 'ffff0000000000000000000000000000000000000000000000000000',
      compact: 0x1d00ffff
    },
    {
      expanded: 'ffff0000000000000000000000000000000000000000000000000001',
      compact: 0x1d00ffff
    },
    {
      expanded: '7fff0000000000000000000000000000000000000000000000000000',
      compact: 0x1c7fff00
    },
    {
      expanded: '00',
      compact: 0
    }
  ]
  t.test('bn.js', function (t) {
    targets.forEach(function (target) {
      var bn = new BN(target.expanded, 'hex')
      t.equal(u.compressTarget(bn), target.compact, target)
    })
    t.end()
  })
  t.test('Buffer', function (t) {
    targets.forEach(function (target) {
      var buf = new Buffer(target.expanded, 'hex')
      t.equal(u.compressTarget(buf), target.compact, target)
    })
    t.end()
  })
  t.test('hex string', function (t) {
    targets.forEach(function (target) {
      var reversed = new Buffer(target.expanded, 'hex')
      reversed = buffertools.reverse(reversed).toString('hex')
      t.equal(u.compressTarget(reversed), target.compact, target)
    })
    t.end()
  })
  t.test('invalid type', function (t) {
    t.throws(function () {
      u.compressTarget(123)
    })
    t.end()
  })
  t.end()
})

test('expandTarget', function (t) {
  var targets = [
    {
      expanded: 'ffff0000000000000000000000000000000000000000000000000000',
      compact: 0x1d00ffff
    },
    {
      expanded: '7fff0000000000000000000000000000000000000000000000000000',
      compact: 0x1c7fff00
    },
    {
      expanded: '9b31b000000000000000000000000000000000000000000',
      compact: 0x1809b31b
    },
    {
      expanded: '0',
      compact: 0
    }
  ]
  targets.forEach(function (target) {
    t.equal(u.expandTarget(target.compact).toString('hex'), target.expanded, target)
  })
  t.throws(function () {
    u.expandTarget(0xff00ff00ff)
  })
  t.end()
})
