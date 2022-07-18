
class ATester
{
    myNumber1 = 12;

    Is = {
    };
}

let tester = new ATester();

console.log('smp1.js : run');

let js_mapdata;
try {
js_mapdata = JSON.parse('\
{ \
  "id": "abcdef", \
  "frameX": 0, \
  "frameY": 0, \
  "name": "abcdef", \
  "sub_name": "abcdef", \
  "prefab": "Stage", \
  "preview": "", \
  "description": "", \
  "moves": 13, \
  "missions": [], \
  "replay": [], \
  "offline": "false", \
  "stage": {} \
}');
} catch(err_) {
    console.log(err_);
}

