/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-explicit-any */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tsc 컴파일 할때, (https://stackoverflow.com/questions/41010780/accessors-are-only-available-when-targeting-ecmascript-5-and-higher)
// 버젼명시:
// tsc -t es5 {파일명}.ts
// 커맨드실행시:
// clear && tsc --target es5 --allowJs --outDir 'dist' ./src/main.ts && node ./dist/main
// npm 실행 커맨드
// clear && tsc --build && node dist/main
//
// 추가 lib
// * underscore : https://underscorejs.org/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { FunctionRunner } from "./FunctionRunner";
import { TickPlay } from "./TickPlay";


//== 테스트 코드는 여기에서부터 작성 시작, 설명은 아래쪽에 =========================================================================

//====
// 함수형 파라미터 전달?
namespace FuncAsParamTest {
    function loadAD(onComplete: ((error: { code: string, message: string }) => void)) {
        console.log.apply(console, [onComplete]);
        onComplete({ code: "ON_LOADING", message: "Ad is still loading or loaded" });
    }
    function subFunc(error: { code: string, message: string }) {
        console.log('subFunc: ', error.code, ',', error.message);
    }
    export function run() {

        let fna = (error: { code: string, message: string }) => {
            console.log('fna:', 'acbcdde1', error.code);
        };

        let fnb = () => {
            console.log('acbcdde2');
        };
        subFunc({code:'111', message:'222'});

        // fna(..) 함수가 파라미터로 전달되기 보다, 먼저 실행 되어 fna()의 리턴값이 loadAd()로 전달된다.
        // 이 값은 loadAD()가 원하는 파라미터가 아니라서 에러.
        //loadAD( fna({code:'abc', message:'bbb'}) ); // 에러.

        loadAD( () => fna({code:'abc', message:'bbb'}) );
    }
}
FunctionRunner.add({ title: 'FuncAsParamTest', runFlag: true, func: FuncAsParamTest.run });

//====
// 함수에 배열처름 값 넣기 가능
namespace FuncAsObject {
    //const TRIED_COUNT = Symbol('SAMPLE_SYMBOL');
    const AA = () => {
        console.log('AA called');
    };
    function CC() {
        console.log('CC called');
    }
    function BB(func1: any) {
        if (func1['TRIED_COUNT']) {
            func1['TRIED_COUNT']++;
        }
        else {
            func1['TRIED_COUNT'] = 1;
        }
        console.log('func1[TRIED_COUNT] ', func1['TRIED_COUNT']);
        func1();
    }
    export function run() {
        BB(AA);
        BB(AA);
        BB(CC);
        console.log.apply(console, ['AA:', AA]);
        console.log.apply(console, ['CC:', CC]);
    }
}
FunctionRunner.add({ title: 'FuncAsObject', runFlag: false, func: FuncAsObject.run });

//=====================================================================================================================
// Date 비교함수
namespace DateTest {
    function getRandomDate(start: Date = new Date(2022, 12, 1, 0, 0, 0), end: Date = new Date(2022, 12, 31, 0, 0, 0)): Date {
        const startDate = start.getTime();
        const endDate = end.getTime();
        return new Date(startDate + Math.random() * (endDate - startDate));
    }
    export function run() {
        let dateList: Date[] = [];
        for (let i = 0; i < 10; i++) {
            dateList.push(getRandomDate());
        }
        let lfn_dump_date_array = () => {
            //console.log.apply(console, ['before:', dateList]);
            dateList.forEach(v => {
                console.log.apply(console, [v.toLocaleDateString(), v.toLocaleTimeString(), ' number: ', v.valueOf()]);
            });
        };
        lfn_dump_date_array();
        dateList.sort((a, b) => a.valueOf() - b.valueOf());
        console.log('');
        lfn_dump_date_array();
    }
}
FunctionRunner.add({ title: 'DateTest', runFlag: false, func: DateTest.run });

//=====================================================================================================================
// generic 클래스 static 변수
namespace GenericStaticTest {
    class GenericClass<T> {
        private _code: T;
        public get code(): T {
            return this._code;
        }
        public set code(v: T) {
            this._code = v;
        }
        public dump() {
            console.log('GenericClass:_code:', this.code);
        }

        constructor(value: T) {
            this.code = value;
        }

        public static staticVariable: string = 'stringABCDE';
        public static staticMethod() {
            console.log('GenericClass:staticMethod-1');
        }

        // Generic factory 함수 질문 (https://stackoverflow.com/questions/24291216/calling-a-static-function-on-a-generic-class-in-typescript)

        public static factory<T2>(value: T2) {
            return new GenericClass<T2>(value);
        }
    }
    export function run() {
        console.log('GenericStaticTest:', GenericClass.staticVariable);
        GenericClass.staticMethod();

        let gc2 = GenericClass.factory('abcd');
        gc2.dump();
    }
}
FunctionRunner.add({ title: 'GenericStaticTest', runFlag: false, func: GenericStaticTest.run });

//=====================================================================================================================
// 콜백,프로미스(callback, promise) 테스트
namespace PromiseTest {
    class TestResponse {
        protected _result: number = -1;
        public constructor() {
            this._result = 0;
        }
        set result(v: number) {
            this._result = v;
        }
    };
    async function sendRequest(): Promise<TestResponse> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let n = new TestResponse();
                n.result = 100;
                resolve(n);
            }, 2000);
        });
    }
    function nextCall() {
        console.log('async func reaction');
    }
    export function run() {
        sendRequest().then((v) => {
            nextCall();
        });
        console.log('called async func');
    }
}
FunctionRunner.add({ title: 'PromiseTest', runFlag: false, func: PromiseTest.run });


//=====================================================================================================================
// 물음표(Optional) 변수 테스트
namespace OptionalVariableTest {
    interface IOptionVar {
        msg?: string;
        num?: number;
        boolValue?: boolean;
    }
    export function run() {
        let param1 = { msg: 'abcde', boolValue: false };
        checkParameter(param1);
    }

    function checkParameter(optVar: IOptionVar) {
        if (optVar.msg) {
            console.log('OptionalVariableTest:msg:', optVar.msg);
        }
        else {
            console.log('OptionalVariableTest:msg:ignore');
        }

        if (optVar.num) {
            console.log('OptionalVariableTest:num:', optVar.num);
        }
        else {
            console.log('OptionalVariableTest:num:ignore');
        }

        if (optVar.boolValue) {
            console.log('OptionalVariableTest:boolValue:', optVar.boolValue);
        }
        else {
            console.log('OptionalVariableTest:boolValue:ignore');
        }
    }
}
FunctionRunner.add({ title: 'OptionalVariableTest', runFlag: false, func: OptionalVariableTest.run });

//=====================================================================================================================
// const 에 제이슨 대입 테스트
namespace JsonToConstVariableTest {
    let sample_json = {
        asid: 'asid',
        signedSignature: '사인리퀘스트',
        isLogin: true, // 결과가 궁금하면 주석으로 만들어보기
        friendIds: ['a', 'b', 'c'],
    }
    export function run() {
        const { asid, signedSignature, isLogin, friendIds } = sample_json;
        console.log('asid:', asid);
        console.log('signedSignature:', signedSignature);
        console.log('isLogin:', isLogin);
        console.log.apply(console, ['friendIds:', friendIds]);
    }
}
FunctionRunner.add({ title: '제이슨2const변수Test', runFlag: false, func: JsonToConstVariableTest.run });

//=====================================================================================================================
// Const Variable Test
// example:
namespace ConstVariableTest {
    const BT_A = 'A';
    const BT_B:any = undefined;
    export function run() {
        if (BT_A) {
            console.log('BT_A:exist');
        }
        else {
            console.log('BT_A:NOT exist');
        }
        if (BT_B) {
            console.log('BT_B:exist');
        } else {
            console.log('BT_B:NOT exist');
        }
    }
}
FunctionRunner.add({ title: 'ConstVariableTest', runFlag: false, func: ConstVariableTest.run });

//=====================================================================================================================
// https://mathjs.org/docs/getting_started.html
// https://mathjs.org/examples/matrices.js.html

// namespace mathjs {
//     export function run() {
//         const a = matrix([1, 2, 3])
//         const b = matrix([[1, 2, 3], [1, 2, 3]]);
//         let c = multiply(a, b);
//         console.log.apply(console, [c]);
//     }
// }
// FunctionRunner.add({ title: 'MatrixTest', runFlag: false, func: mathjs.run });

//=====================================================================================================================

// command pattern sample code

namespace PatCmd {
    export function run() {
        let cmd = make_moveUnitCommand(null, 1, 1);
        cmd.execute();
        cmd.undo();
    }

    function make_moveUnitCommand(unit: any, x: number, y: number): any {
        let xBefore: number, yBefore: number;
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
FunctionRunner.add({ title: 'PatternTest', runFlag: false, func: PatCmd.run });

//=====================================================================================================================

/**
 * @see array_test 배열테스트
 * @see runTick 틱 시작함수
 * @see test_lodash lodash 테스트 함수
 */

//=====================================================================================================================

let tickPlay:TickPlay = null;
function runTick() {
    tickPlay = new TickPlay();
    tickPlay.start(20);
    //tickPlay.reserveOnTime(0.5, () => { test_lodash(); } );
}
FunctionRunner.add({ runFlag: false, func: runTick });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JS Library : lodash
// npm install --save @types/lodash
// 타입이 명확하지 않으면 이런걸 쓰는 건가 ( https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html )

function test_lodash() {
    console.log('test_lodash');

    console.log('test_lodash : before bind-delay');
    //var log = _.bind(console.log, console);
    //_.delay(log, 1000, 'test_lodash : delay ended');
    console.log('test_lodash : after bind-delay');
}
FunctionRunner.add({ title: 'lodash', runFlag: false, func: test_lodash });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JS Library : underscore

function test_underscore() {
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shuffle

function testSort() {
    let msg = '';
    let a1: number[] = [11, 2, 22, 1];
    msg = '';
    a1.forEach(elem => msg += elem + ', '); console.log(msg);

    let b1: number[] = a1.sort((a, b) => a - b);
    msg = '';
    b1.forEach(elem => msg += elem + ', '); console.log(msg);

    let b3: number[] = b1.sort(() => 0.5 - Math.random());
    msg = '';
    b3.forEach(elem => msg += elem + ', '); console.log(msg);
}
FunctionRunner.add({ title: 'testSort', runFlag: false, func: testSort });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default function test

function checkDefaultParam(check: boolean = true, strArr: string[] = null) {
    let str_smp_arr: string[] = ['a', 'b', 'c', 'd'];
    let str_arr = strArr ? strArr : str_smp_arr;

    console.log('checkDefaultParam : ', str_arr);

    if (check) {
        console.log('checkDefaultParam: check true');
    }
    else {
        console.log('checkDefaultParam: check false');
    }
}
FunctionRunner.add({ title: 'checkDefaultParam', runFlag: false, func: checkDefaultParam });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tween bounce test

function easeOutBounceOriginal(x: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) { return n1 * x * x; }
    else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; }
    else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; }

    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

// cocos-creator 2.4.6, CCActionEase.js
function _bounceTime(time1 : number) {
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

function easeOutBounceMod(x: number): number {
    const n1 = 8; const d1 = 2;
    if (x < 1 / d1) { return n1 * x * x * x; }
    return n1 * (x -= 2 / d1) * x * x + 1;
}

function easeOutBounceMod2(x: number): number {
    const n1 = 6;
    const d1 = 4;

    if (x < 1 / d1) { return n1 * x * x; }
    else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; }
    else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; }

    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}


function test_easing() {
    for (let t: number = 0; t <= 1.05; t += 0.05) {
        let v = easeOutBounceMod2(t);
        console.log('easeBounceOut(t) > ', t.toFixed(4), ' -> ', v.toFixed(4));
    }
}

FunctionRunner.add({ title: 'test_easing', runFlag: false, func: test_easing });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface XY {
    x: number;
    y: number;
};

function test_interface() {
    let smp_arrary = [];

    let na = 100;
    let nb = -200;

    smp_arrary.push({ x: 0, y: 1 });
    smp_arrary.push([-2, 9]);
    smp_arrary.push({ x: na, y: nb });

    let aa: XY = smp_arrary[0];
    let bb: XY = smp_arrary[1];
    console.log(aa.x, ',', aa.y);
    console.log(bb.x);

    let cc: XY = smp_arrary[2];
    console.log(smp_arrary[2]);
    console.log(cc.y);
}

FunctionRunner.add({ title: 'test_interface', runFlag: false, func: test_interface });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export enum EAnything {
    None = -1,
    One, Two, Three,
    ABC = 2000,
    ABCD = 2001
}

export enum BlockType {
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

function test_value_from_enum() {
    if (ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce) {
        console.log('ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce : exist');
    } else {
        console.log('ConstV.IngameDesignGuide[BlockType[BlockType.A]].abce : undefined');
    }

    let v = BlockType.C;
    console.log.apply(console, [ 'IngameDesignGuide[BlockType[BlockType.C]]', ConstV.IngameDesignGuide[BlockType[v] as keyof typeof ConstV.IngameDesignGuide] ]);

    console.log.apply(console, ['IngameDesignGuide[BlockType[BlockType.C]].yPosition: '
        , ConstV.IngameDesignGuide[BlockType[BlockType.C] as keyof typeof ConstV.IngameDesignGuide].yPosition]);

    console.log('\n');

    let va = 0;
    switch (va) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
}
FunctionRunner.add({ title: 'test_value_from_enum', runFlag: false, func: test_value_from_enum });

//=============================================================================================================================================================

class ATester {
    private myNumber1: Number = 12;
    private obj1: any = null;

    constructor() { console.log("constructor ATester");; }

    public do_no_override(): ATester {
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

    public do_override() {
        console.log('ATester : do_override');
    }

    public buildSelf() {
        console.log('ATester : buildSelf');
    }

    public static do_static_func<T extends ATester>(TYPE: new () => T): any {
        console.log('ATester : do_static_func');
        let new_object = new TYPE();
        new_object.buildSelf();
        return new_object;
    }
}

class BTester extends ATester {
    constructor() { super(); console.log("constructor BTester"); }

    public do_override(): BTester {
        console.log('BTester : do_override');
        //super.do_override();
        return this;
    }

    public buildSelf() {
        console.log('BTester : buildSelf');
    }


    // public static do_static_func(TYPE: new () => BTester): any
    // {
    //     console.log('BTester : do_static_func');
    //     return new TYPE();
    // }
}

function test_overriding() {
    let test_a = new ATester();

    console.log('ts_test.ts : run');
    console.log('myNumber1 > ', test_a.Has.Number);
    console.log('Object1 is null? > ', test_a.Has.Object1());
    console.log('Object2 is null? > ', test_a.Has.Object2);

    let test_b = new BTester();
    let test_ba = test_b as ATester;

    test_ba.do_override();
    test_ba.do_no_override();

    let test_bb: BTester = ATester.do_static_func(BTester);
    console.log.apply(console, ['test_bb is ', test_bb]);

    test_bb.do_override();

    console.log('');
}

FunctionRunner.add({ title: 'test_overriding', runFlag: false, func: test_overriding });

//=============================================================================================================================================================


/** array test
 * {@link array_test}
 */
function array_test() {
    console.log('~~ Test 1 ~~');
    let arrays: number[] = [1, 9, 23, 87, 53, 88];
    let _ret = arrays.map((value: number, index: number): string => `index is ${index} and value is ${value}`);
    console.log(_ret);

    console.log('~~ Test 2 ~~');
    let _ret2 = arrays.map(row => { return `row is what? is ${row}`; });
    console.log(_ret2);

    console.log('~~ Test 3 ~~');
    arrays.splice(2, 1);
    console.log.apply(console, ['after array: ', arrays]);

    console.log('~~ Test 4 ~~ : 삭제 테스트');
    let array2: number[] = [22, 1, 44, 1, 66, 1, 88];
    let str = '';
    array2.forEach((v, i, ar) => { str += ',' + v });
    console.log.apply(console, ['before array: ', str]);
    for (let i = array2.length - 1; i >= 0; i--) {
        if (array2[i] === 1) {
            array2.splice(i, 1);
            str = 'after: '; array2.forEach((v, i, ar) => { str += ',' + v }); console.log.apply(console, ['array: ', str]);
        }
    }
    str = 'after: '; array2.forEach((v, i, ar) => { str += ',' + v }); console.log.apply(console, ['array: ', str]);
}
FunctionRunner.add({ title: 'array_test', runFlag: false, func: array_test });

//=============================================================================================================================================================
// https://yamoo9.gitbook.io/typescript/classes/getter-setter

class ACubeInfo {
    public _array: number[] = [-1, -1, -1];
    public setFromJson(jsn: number[]) {
        this._array = jsn;
    }
    get ground(): number { return this._array[0]; }
    get cube(): number { return this._array[1]; }
}

function test_cubeinfo() {
    let cubeinfo: ACubeInfo = new ACubeInfo();
    //cubeinfo._array = [9, 10, 17];
    cubeinfo.setFromJson(JSON.parse('[9, 10, 17]'));
    console.log(cubeinfo);
    console.log(cubeinfo._array[0], ",", cubeinfo._array[2]);
    console.log(cubeinfo.ground, ",", cubeinfo.cube);
}
FunctionRunner.add({ title: 'test_cubeinfo', runFlag: false, func: test_cubeinfo });

//=============================================================================================================================================================

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

function test_a() {
    let sxy = new JustXY(-1, -10);
    console.log('SimpleXY: width: ', sxy.width, ', height: ', sxy.height);
    sxy.width = 11;
    sxy.height = 22;
    console.log('SimpleXY: width: ', sxy.width, ', height: ', sxy.height);

    let sxy2 = JustXY.new(-100, 100);
    console.log('SimpleXY2: x: ', sxy2.x, ', y: ', sxy2.y);

    ///////////////////////////////////////////////////////////////////////////////

    let multiArray: number[][] = [];
    multiArray.push([1, 2, 3, 4]);
    console.log("multiArray: (0,1) value is : ", (multiArray[0][1] === null) ? 'null' : 'has value ', multiArray[0][1]);
    console.log("multiArray: (2,) value is : ", (multiArray[2] === undefined) ? 'null' : 'has value ', multiArray[2]);
    let singleArray: number[] = [];
    console.log("singleArray: (2) value is : ", (singleArray[2] === undefined) ? 'null' : 'has value ', singleArray[2]);
    singleArray = [null, null, null, null];
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
    console.log('name: ', _js_obj.name);
    console.log('type: ', _js_obj.type);
}

FunctionRunner.add({ title: 'test_a', runFlag: false, func: test_a });

//=============================================================================================================================================================

FunctionRunner.run();


//=====================================================================================================================
// 한번만 실행 여부 확인용 클래스
// namespace RunOnce_Test {
//     class RunOnce<T> {
//         protected inst: T = null;
//         protected static usedCount = new Map<any, number>();
//         public init(sampleInst: T) {
//             //RunOnce.usedCount--;
//             this.inst = sampleInst;
//         }
//         public canRun(sampleInst: T) {
//             //return this.inst === sampleInst && RunOnce.usedCount === 1;
//             return false;
//         }
//     }
//     class A {
//         protected runOnce = new RunOnce<A>();
//         constructor() {
//             this.runOnce.init(this);
//         }
//         public run() {
//             if (this.runOnce.canRun(this)) {
//                 console.log('class-A:run:O');
//             }
//             else {
//                 console.log('class-A:run:x');
//             }
//         }
//     }
//     class B {
//         protected runOnce = new RunOnce<B>();
//         constructor() {
//             this.runOnce.init(this);
//         }
//         public run() {
//             if (this.runOnce.canRun(this)) {
//                 console.log('class-B:run:O');
//             }
//             else {
//                 console.log('class-B:run:x');
//             }
//         }
//     }
//     export function run() {
//         let ra1 = new A();
//         let ra2 = new A();
//         let rb1 = new B();
//         ra1.run();
//         ra1.run();
//         ra2.run();
//         rb1.run();
//     }
// }
// FunctionRunner.add({ title: 'RunOnce_Test', runFlag: true, func: RunOnce_Test.run });
