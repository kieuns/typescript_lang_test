import * as crypto from "crypto"; // js: const crypto = require('crypto');

///////////////////////////////////////////////////////////////////////////////

let TestFunctionRunFlag:number[] = [
    1
];
TestFunctionRunFlag.forEach((value, index) => {
    // eval() 은 사악하다는데.. 테스트용에서는 괜찮겠지. <https://stackoverflow.com/questions/496961/call-a-javascript-function-name-using-a-string>
    if(value) {
        eval('test_' + (index+1)).call();
    }
});

///////////////////////////////////////////////////////////////////////////////

function test_1() {
    console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
    console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
    console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
}

// reg test
function test_2() {
    console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
    console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
    console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
}