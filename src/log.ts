//
// 로그에 대한 기능을 모아두는
//

export class LogUtil
{
    private logLevel = 5;

    get few() { return this.logLevel > 0; }        // 1
    get basic() { return this.logLevel > 1; }      // 2
    get detail() { return this.logLevel > 2; }     // 3
    get verydetail() { return this.logLevel > 4; } // 5
    get toomuch() { return this.logLevel > 5; }    // 6
}

export var loglevel = new LogUtil();
