import { loglevel } from "./log";


export interface ITickWork
{
    tick:number;
    func:()=>void;
    delete:boolean;
}

/**
 * 틱에 작업을 넣고 때가 되면 실행 되게 하는 작업 스케쥴러.
 * @example
 * let tickPlay = new TickPlay();
 * tickPlay.start(); // 스케쥴러 시작
 * tickPlay.reserveBy(0.1, () => { // 0.1초 뒤에 실행
 *   console.log('workdone: ', tickPlay.getNowTick());
 * });
 */
export class TickPlay
{
    protected _tickNowIndex:number = 0;
    protected _tickMaxPerSec:number = 10;

    /** 게임이 끝나는 틱 */
    protected _tickCleared:number = -1;
    /** 게임이 끝나는 시간 */
    protected _expectEndTime:number = 0;
    protected _expectEndTick:number = 0;
    protected _tickTimerId:number = -1;
    protected _loopStarted:boolean = false;

    /** 작업 목록 */
    protected _workTodo:ITickWork[] = [];


    getNowTick() {
        return this._tickNowIndex;
    }

    getNowAsTime() {
        return this._tickNowIndex * this._tickMaxPerSec;
    }

    /**
     * @param {number} expectEndTick Tick의 개수
     */
    start(expectEndTick?:number)
    {
        this._expectEndTick = expectEndTick;
        this._expectEndTime = this._tickMaxPerSec * (expectEndTick ? expectEndTick : (12*60));
        this._tickNowIndex = 0;
        this._workTodo = [];
        this._tickTimerId = setInterval( this.onTick.bind(this), 1000 / this._tickMaxPerSec );
        this._loopStarted = true;
        console.log('TickPlay : start : ', Date.now.toString());
    }

    stop()
    {
        clearInterval(this._tickTimerId);
    }

    onTick()
    {
        this._tickNowIndex += 1;
        if(this._tickNowIndex > this._expectEndTick) {
            this.stop();
            console.log('TickPlay : onTick() : looping end');
            return;
        }

        if(loglevel.toomuch) { console.log('TickPlay : onTick() : ', this._tickNowIndex, ', work count: ', this._workTodo.length); }

        for(let i = 0; i < this._workTodo.length; i++) {
            let item = this._workTodo[i];
            if(item.tick > this._tickNowIndex) { break; }
            if(item.tick <= this._tickNowIndex) {
                item.delete = true;
                item.func();
            }
        }

        let tmp_ar:ITickWork[] = [];
        for(let i = 0; i < this._workTodo.length; i++) {
            let item = this._workTodo[i];
            if(item.delete === false) {
                tmp_ar.push(item);
            }
        }
        this._workTodo = tmp_ar;
    }

    /**
     * @param {number} tick - 예약 시간. 틱값 입력.
     * @param {function} callback - 호출 함수
     */
    reserveOnTick(tick:number, callback:(()=>void))
    {
        if(!this._loopStarted) { console.warn('TickPlay : not started'); return; }
        let nx_tick = tick;
        this._workTodo.push({ tick:nx_tick, func:callback, delete:false });
    }

    reserveOnNextTick(tickFuture:number, callback:(()=>void))
    {
        // prev code : // Math.floor( (this._tickNowIndex + tick) * this._tickMaxPerSec );
        this.reserveOnTick( this._tickNowIndex + tickFuture, callback );
    }

    /**
     * @param {number} [time] - 예약 시간, 지금에서 얼마 뒤. ms
     * @param {function} [callback] - 호출 함수
     * @param {number} [repeatCnt]
     * @param {number} [repeatTime]
     */
    reserveOnTime(time:number, callback:(()=>void), repeatCnt:number = 1, repeatTime?:number)
    {
        if(!this._loopStarted) { console.warn('TickPlay : not started'); return; }

        let repeat_time = repeatTime ? repeatTime : time;

        for(let i = 0; i < repeatCnt; i++)
        {
            let nx_tick = this._tickNowIndex + Math.ceil(time*this._tickMaxPerSec);

            if(loglevel.verydetail) { console.log('tickplay : now: ', this._tickNowIndex, ' expect at : ', nx_tick, ', time:', time.toFixed(4)); }

            this._workTodo.push({tick: nx_tick, func:callback, delete:false});

            time += repeat_time;
        }
    }
}
