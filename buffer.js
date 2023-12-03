const buff = new Buffer.alloc(2, '\u03B1');
console.log(buff); //<Buffer ce b1>
console.log('\u03B1'); //α

const apple8 = new Buffer.from('', 'utf-8'); //utf-8 - default
console.log(apple8); //<Buffer ef a3 bf>
console.log(new Buffer.from('')); //<Buffer ef a3 bf>
console.log(apple8.toString()); //

const apple16 = new Buffer.from('', 'utf-16le');
console.log(apple16); //<Buffer ff f8>
console.log(apple16.toString()); //��
console.log(apple16.toString('utf-16le')); //

const buffString = new Buffer.from('I love you!');
console.log(buffString); //<Buffer 49 20 6c 6f 76 65 20 79 6f 75 21>

const buffString16 = new Buffer.from('I love you!', 'utf-16le');
console.log(buffString16); //<Buffer 49 00 20 00 6c 00 6f 00 76 00 65 00 20 00 79 00 6f 00 75 00 21 00>

console.log(
  String.fromCodePoint(
    0x49,
    0x20,
    0x6c,
    0x6f,
    0x76,
    0x65,
    0x20,
    0x79,
    0x6f,
    0x75,
    0x21
  )
); ///I love you!
console.log(buffString.toString()); //I love you!
console.log(buffString.toString('utf8')); //I love you!
console.log(buffString.toString('utf-16le')); //⁉潬敶礠畯
console.log(buffString16.toString('utf-16le')); //I love you!
console.log(buffString.toString('hex')); //49206c6f766520796f7521

console.log(buffString.toJSON());
//{
//   type: 'Buffer',
//   data: [
//      73,  32, 108, 111,
//     118, 101,  32, 121,
//     111, 117,  33
//   ]
// }

console.log(buffString[2].toString(2)); //1101100
console.log(buffString16[2].toString(2)); //100000
console.log(buffString[2].toString(10)); //108
console.log(buffString16[2].toString(10)); //32
console.log(buffString[2].toString(16)); //6c
console.log(buffString16[2].toString(16)); //20
console.log(buffString[2].toString()); //108

const buffCopy = new Buffer.from(buff);
console.log(buffCopy); //<Buffer ce b1>

const day = new Buffer.from('Sunday day');
day[0] = '0x004D';
day[1] = 111;
console.log(day.toString()); //Monday day

day.write('Sunday');
console.log(day.toString()); //Sunday day

apple16.copy(day);
console.log(day.toString()); //��nday dayday day (changed 2 bytes, which don't recognize in UTF-8)
console.log(day.toString('utf-16le')); //摮祡搠祡

apple8.copy(day);
console.log(day.toString()); //day day (changed 3 bytes)

const bigBuffer = new Buffer.alloc(20);
bigBuffer.write(`I'm forty`);
console.log(bigBuffer); //<Buffer 49 27 6d 20 66 6f 72 74 79 00 00 00 00 00 00 00 00 00 00 00>

const smallBuffer = new Buffer.from(`I'm forty`); //<Buffer 49 27 6d 20 66 6f 72 74 79>
console.log(smallBuffer);

const changedBuffer = new Buffer.from('fifty years old');

changedBuffer.copy(bigBuffer, 4, 0, changedBuffer.length);
console.log(bigBuffer.toString()); //I'm fifty years old

changedBuffer.copy(smallBuffer, 4, 0, changedBuffer.length);
console.log(smallBuffer.toString()); //I'm fifty
