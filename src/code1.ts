///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// To summarize(non - exhaustively) bash's command operators/separators:
//
// | pipes(pipelines) the standard output(stdout) of one command into the standard input of another one.Note that stderr still goes into its default destination, whatever that happen to be.
// |& pipes both stdout and stderr of one command into the standard input of another one.Very useful, available in bash version 4 and above.
// && executes the right - hand command of && only if the previous one succeeded.
// || executes the right - hand command of || only it the previous one failed.
// ; executes the right - hand command of; always regardless whether the previous command succeeded or failed.Unless set - e was previously invoked, which causes bash to fail on an error.
//
// tsc 컴파일 할때, (https://stackoverflow.com/questions/41010780/accessors-are-only-available-when-targeting-ecmascript-5-and-higher)
// 버젼명시:
// tsc -t es5 {파일명}.ts
// 커맨드실행시:
// clear && tsc --target es5 --allowJs --outDir 'dist' ./src/code1.ts && node ./dist/code1
// npm 실행 커맨드
// clear && tsc --build && node dist/code1
// 커맨드실행시:
// clear &&  tsc -t es5 ./src/code1.ts && node ./dist/code1
//
// 추가 lib
// * underscore : https://underscorejs.org/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import * as _ from "lodash"; // import _ = require('lodash');
import {TickPlay} from './TickPlay';

//=====================================================================================================================

// command pattern sample code

namespace PatCmd {
    export function run() {
        let cmd = make_moveUnitCommand(null, 1, 1);
        cmd.execute();
        cmd.undo();
    }

    function make_moveUnitCommand(unit:any, x:number, y:number):any {
        let xBefore:number, yBefore:number;
        return {
            execute: function() {
                console.log('make_moveUnitCommand: execute()');
            },
            undo: function() {
                console.log('make_moveUnitCommand: undo()');
            }
        };
    }
}
PatCmd.run();

//=====================================================================================================================

/**
 * @see array_test 배열테스트
 * @see runTick 틱 시작함수
 * @see test_lodash lodash 테스트 함수
 */

//=====================================================================================================================

/** @type {TickPlay} */
let tickPlay = null;
function runTick() {
    tickPlay = new TickPlay();
    tickPlay.start(20);
    //tickPlay.reserveOnTime(0.5, () => { test_lodash(); } );
}
//runTick();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JS Library : lodash
// npm install --save @types/lodash
// 타입이 명확하지 않으면 이런걸 쓰는 건가 ( https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html )

function test_lodash()
{
    console.log('test_lodash');

    console.log('test_lodash : before bind-delay');
    //var log = _.bind(console.log, console);
    //_.delay(log, 1000, 'test_lodash : delay ended');
    console.log('test_lodash : after bind-delay');
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JS Library : underscore

function test_underscore()
{
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shuffle

function testSort()
{
    let msg = '';
    let a1:number[] = [11,2,22,1];
    msg = '';
    a1.forEach(elem => msg += elem + ', '); console.log(msg);

    let b1:number[] = a1.sort((a, b) => a - b);
    msg = '';
    b1.forEach(elem => msg += elem + ', '); console.log(msg);

    let b3:number[] = b1.sort(() => 0.5 - Math.random());
    msg = '';
    b3.forEach(elem => msg += elem + ', '); console.log(msg);
}
//testSort();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default function test

function checkDefaultParam(check:boolean = true, strArr:string[] = null)
{
    let str_smp_arr:string[] = ['a', 'b', 'c', 'd'];
    let str_arr = strArr ? strArr : str_smp_arr;

    console.log('checkDefaultParam : ', str_arr);

    if(check) {
        console.log('checkDefaultParam: check true');
    }
    else {
        console.log('checkDefaultParam: check false');
    }
}

//checkDefaultParam(false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tween bounce test

function easeOutBounceOriginal(x: number): number
{
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) { return n1 * x * x; }
  else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; }
  else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; }

  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

// cocos-creator 2.4.6, CCActionEase.js
function _bounceTime (time1) {
    if (time1 < 1 / 2.75) {
        return 7.5625 * time1 * time1;
    }
    else if (time1 < 1.93 / 2.75) {
        time1 -= 1.5 / 2.75;
        return 7.5625 * time1 * time1 + 0.75;
    }
    time1 -= 2.75 / 2.75;
    return 7.5625 * time1 * time1 + 1;
};

function easeOutBounceMod(x: number): number
{
  const n1 = 8; const d1 = 2;
  if (x < 1 / d1) { return n1 * x * x * x; }
  return n1 * (x -= 2 / d1) * x * x + 1;
}

function easeOutBounceMod2(x: number): number
{
    const n1 = 6;
    const d1 = 4;

    if (x < 1 / d1) { return n1 * x * x; }
    else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; }
    else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; }

    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}


function test_easing()
{
    for(let t:number = 0; t <= 1.05; t += 0.05)
    {
        let v = easeOutBounceMod2(t);
        console.log('easeBounceOut(t) > ', t.toFixed(4), ' -> ', v.toFixed(4));
    }
}

//test_easing();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface XY {
    x:number;
    y:number;
};

function test_interface()
{
    let smp_arrary = [];

    let na = 100;
    let nb = -200;

    smp_arrary.push({x:0,y:1});
    smp_arrary.push([-2,9]);
    smp_arrary.push({x:na, y:nb});

    let aa:XY = smp_arrary[0];
    let bb:XY = smp_arrary[1];
    console.log(aa.x, ',', aa.y);
    console.log(bb.x);

    let cc = smp_arrary[2];
    console.log(smp_arrary[2]);
    console.log(cc.y);
}

//test_interface();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export enum EAnything {
    None = -1,
    One, Two, Three,
    ABC = 2000,
    ABCD = 2001
}

export enum BlockType
{
    None,
    A = 100, B = 101, C = 102,
}

namespace ConstV {
export const IngameDesignGuide =
{
    'A': { xPositon: 0, yPosition: 0, xScale: 1, yScale: 1, xAnchor: 0.5, yAnchor: 0.5, },
    'B': { xPositon: 0, yPosition: 0, xScale: 1, yScale: 1, xAnchor: 0.5, yAnchor: 0.5, },
    'C': { xPositon: 0, yPosition: 0, xScale: 1, yScale: 1, xAnchor: 0.5, yAnchor: 0.5, },
};
};

function test_value_from_enum()
{
    if(ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce){
        console.log('ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce : exist');
    }else {
        console.log('ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce : undefined');
    }

    let v = BlockType.C;
    console.log.apply(console, ['IngameDesignGuide[BlockType[BlockType.C]]'
        , ConstV.IngameDesignGuide[BlockType[v]] ]);

    console.log.apply(console, ['IngameDesignGuide[BlockType[BlockType.C]].yPosition: '
        , ConstV.IngameDesignGuide[BlockType[BlockType.C]].yPosition ]);

    console.log('\n');

    let va = 0;
    switch(va)
    {
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    }
}
//test_value_from_enum();

//=============================================================================================================================================================

class ATester {
    private myNumber1: Number = 12;
    private obj1: any = null;

    constructor() { console.log("constructor ATester");; }

    public do_no_override() : ATester
    {
        console.log('ATester : do_no_override');
        return this;
    }

    public Has = {
        Number: this.myNumber1,
        Object1: (): boolean => {
            return (this.obj1 !== null);
        },
        Object2: (this.obj1 !== null),
    };

    public do_override()
    {
        console.log('ATester : do_override');
    }

    public buildSelf()
    {
        console.log('ATester : buildSelf');
    }

    public static do_static_func<T extends ATester>(TYPE: new () => T): any
    {
        console.log('ATester : do_static_func');
        let new_object = new TYPE();
        new_object.buildSelf();
        return new_object;
    }
}

class BTester extends ATester {
    constructor() { super(); console.log("constructor BTester"); }

    public do_override() : BTester
    {
        console.log('BTester : do_override');
        //super.do_override();
        return this;
    }

    public buildSelf()
    {
        console.log('BTester : buildSelf');
    }


    // public static do_static_func(TYPE: new () => BTester): any
    // {
    //     console.log('BTester : do_static_func');
    //     return new TYPE();
    // }
}

function test_overriding()
{
    let test_a = new ATester();

    console.log('ts_test.ts : run');
    console.log('myNumber1 > ', test_a.Has.Number);
    console.log('Object1 is null? > ', test_a.Has.Object1());
    console.log('Object2 is null? > ', test_a.Has.Object2);

    let test_b = new BTester();
    let test_ba = test_b as ATester;

    test_ba.do_override();
    test_ba.do_no_override();

    let test_bb:BTester = ATester.do_static_func(BTester);
    console.log.apply(console, ['test_bb is ', test_bb]);

    test_bb.do_override();

    console.log('');
}
//test_overriding();

//=============================================================================================================================================================


/** array test
 * {@link array_test}
 */
function array_test()
{
    console.log('~~ Test 1 ~~');
    let arrays: number[] = [1, 9, 23, 87, 53, 88];
    let _ret = arrays.map( (value: number, index: number): string => `index is ${index} and value is ${value}`);
    console.log(_ret);

    console.log('~~ Test 2 ~~');
    let _ret2 = arrays.map( row => { return `row is what? is ${row}`; });
    console.log(_ret2);

    console.log('~~ Test 3 ~~');
    arrays.splice( 2, 1 );
    console.log.apply(console, ['after array: ', arrays]);

    console.log('~~ Test 4 ~~ : 삭제 테스트');
    let array2: number[] = [22, 1, 44, 1, 66, 1, 88];
    let str = '';
    array2.forEach((v, i, ar) => { str += ','+v});
    console.log.apply(console, ['before array: ', str]);
    for(let i = array2.length-1; i >= 0; i--) {
        if(array2[i] === 1) {
            array2.splice(i, 1);
            str = 'after: '; array2.forEach((v, i, ar) => { str += ','+v}); console.log.apply(console, ['array: ', str]);
        }
    }
    str = 'after: '; array2.forEach((v, i, ar) => { str += ','+v}); console.log.apply(console, ['array: ', str]);
}
array_test();


//=============================================================================================================================================================
// https://yamoo9.gitbook.io/typescript/classes/getter-setter

class ACubeInfo {
    public _array: number[] = [-1, -1, -1];
    public setFromJson(jsn:number[]) {
        this._array = jsn;
    }
    get ground():number { return this._array[0]; }
    get cube(): number { return this._array[1]; }
}

function test_cubeinfo()
{
    let cubeinfo: ACubeInfo = new ACubeInfo();
    //cubeinfo._array = [9, 10, 17];
    cubeinfo.setFromJson(JSON.parse('[9, 10, 17]'));
    console.log(cubeinfo);
    console.log(cubeinfo._array[0], ",", cubeinfo._array[2]);
    console.log(cubeinfo.ground, ",", cubeinfo.cube);
}

//test_cubeinfo();

/**
 * xy 등의 단순 좌표값을 저장할 클래스. 단순 숫자를 저장하는데 cc.Vec2를 쓰는 대신 정수형 좌표계로.
 * - 단순한 x,y좌표 또는 width,height 값을 저장/로드 용도.
 * - width/height 는 x,y변수를 공유하고 getter/setter로만 작성 되었다.
 * @example
 * // 생성. 생성자에 값을 넣거나 그냥 만들거나.
 * let position = new JustXY();
 * let position2 = new JustXY( 1, 1 );
 * // xy 변수 사용
 * position.x = 111;
 * let other_x = position.x;
 * // width, height 사용
 * position.width = 1000;
 * let other_width = position.width;
 */
 export class JustXY {
    public x: number = -1;
    public y: number = -1;
    get width() { return this.x; }
    get height() { return this.y; }
    set width(value: number) { this.x = value; }
    set height(value: number) { this.y = value; }
    //constructor() { this.x = -1; this.y = -1; }
    constructor(x_: number = -1, y_: number = -1) { this.x = x_; this.y = y_; }
    public set(x_: number, y_: number) { this.x = x_; this.y = y_; }
    public copyTo(otherJustXy: JustXY) { otherJustXy.x = this.x; otherJustXy.y = this.y; }
    public copyFrom(otherJustXy: JustXY) { this.x = otherJustXy.x; this.y = otherJustXy.y; }
    public equal(otherJustXy: JustXY): boolean { return otherJustXy.x === this.x && otherJustXy.y === this.y; }
    public toString() { return '(' + this.x + ',' + this.y + ')'; }
    public static new(x: number = -1, y: number = -1) { return new JustXY(x, y); }
}

function test_a()
{
    let sxy = new JustXY(-1, -10);
    console.log('SimpleXY: width: ', sxy.width, ', height: ', sxy.height);
    sxy.width = 11;
    sxy.height = 22;
    console.log('SimpleXY: width: ', sxy.width, ', height: ', sxy.height);

    let sxy2 = JustXY.new(-100, 100);
    console.log('SimpleXY2: x: ', sxy2.x, ', y: ', sxy2.y);

    ///////////////////////////////////////////////////////////////////////////////

    let multiArray : number [][] = [];
    multiArray.push([ 1, 2, 3, 4]);
    console.log("multiArray: (0,1) value is : ", (multiArray[0][1] === null) ? 'null' : 'has value ', multiArray[0][1]);
    console.log("multiArray: (2,) value is : ", (multiArray[2] === undefined) ? 'null' : 'has value ', multiArray[2]);
    let singleArray: number[] = [];
    console.log("singleArray: (2) value is : ", (singleArray[2] === undefined) ? 'null' : 'has value ', singleArray[2]);
    singleArray = [ null, null, null, null ];
    console.log("singleArray: (2) value is : ", (singleArray[2] === null) ? 'null' : 'has value ', singleArray[2]);

    ///////////////////////////////////////////////////////////////////////////////

    // // fill 을 사용한 배열 초기화. 안되는 건가?
    // // tsc 컴파일 옵션을 -> 'tsc -t es6 ' 로 하면 컴파일 에러 없는데..
    // singleArray = ([...Array(11).fill(0)]);
    // singleArray.length = 20;
    // singleArray.fill(-1);
    // console.log.apply(console, ["singleArray: lenght(%d), and all: ", singleArray.length, singleArray]);

    ///////////////////////////////////////////////////////////////////////////////

    console.log('~~ Array Push Test ~~');
    singleArray = [];
    console.log('- push 1, 3, 8, 9, 12');
    singleArray.push(1);
    singleArray.push(3);
    singleArray.push(8);
    singleArray.push(9);
    singleArray.push(12);
    console.log(singleArray);
    console.log.apply(console, ['- ARR : %d, %d, %d, %d, %d', singleArray[0], singleArray[1], singleArray[2], singleArray[3], singleArray[4]]);

    ///////////////////////////////////////////////////////////////////////////////

    //let _js_str = '{ "name":"' + 'abcde' + '","type":' + 22 + '}';
    let _js_str = '{ "name": "cube_purple", "type": 105 }';
    let _js_obj = JSON.parse(_js_str);
    console.log(_js_str);
    console.log(_js_obj);
    console.log('name: ' , _js_obj.name);
    console.log('type: ' , _js_obj.type);
}

test_a();