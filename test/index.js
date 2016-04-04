var test = require('tape');
var equal = require('../');

test('equal', function (t) {
    t.ok(equal(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ 4 ] }
    ));
    t.end();
});

test('not equal', function (t) {
    t.notOk(equal(
        { x : 5, y : [6] },
        { x : 5, y : 6 }
    ));
    t.end();
});

test('object vs null', function (t) {
    t.notOk(equal({}, null));
    t.end();
});

test('nested nulls', function (t) {
    t.ok(equal([ null, null, null ], [ null, null, null ]));
    t.end();
});

test('non-objects', function (t) {
    t.ok(equal(3, 3));
    t.ok(equal('beep', 'beep'));
    t.notOk(equal('3', 3));

    t.notOk(equal('3', [3]));
    t.end();
});

test('arguments class', function (t) {
    t.ok(equal(
        (function(){return arguments})(1,2,3),
        (function(){return arguments})(1,2,3),
        "compares arguments"
    ));
    t.notOk(equal(
        (function(){return arguments})(1,2,3),
        [1,2,3],
        "differenciates array and arguments"
    ));
    t.end();
});

test('dates', function (t) {
    var d0 = new Date(1387585278000);
    var d1 = new Date('Fri Dec 20 2013 16:21:18 GMT-0800 (PST)');
    t.ok(equal(d0, d1));
    t.end();
});

test('buffers', function (t) {
    t.ok(equal(Buffer('xyz'), Buffer('xyz')));
    t.end();
});

test('booleans and arrays', function (t) {
    t.notOk(equal(true, []));
    t.end();
});

test('null != undefined', function (t) {
    t.notOk(equal(null, undefined));

    t.end();
});

test('cyclic references', function (t) {
    var x1 = {},
        x2 = {};

    x1.x = x2;
    x2.x = x1;

    t.ok(equal(x1, x2));
    t.end();
});