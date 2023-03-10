//=====================================================================================================================
// runner (테스트 러너) 맨 위에 둘 것. 테스트 코드는 아래 부분에 작성.
// example: FunctionRunner.add({title:'MatrixTest', runFlag:true, func:mathjs.run});
export namespace FunctionRunner
{
    export interface RunParam {
        title?:string;
        runFlag:boolean;
        func:Function;
    }
    let funcArr:RunParam[] = [];
    export function clear() {
        funcArr = [];
    }
    export function add(runParam:RunParam) {
        funcArr.push(runParam);
    }
    export function run() {
        funcArr.forEach(v => {
            if(!v.func) { console.log('runFlag.func not exist'); }
            //console.log.apply(console, [v]);
            if(v.runFlag) {
                if(v.title) {
                    console.log('====', v.title, '====');
                    console.log.apply(console, ['[run: ] ', v.title]);
                }
                v.func && v.func();
            }
        });
    }
}
