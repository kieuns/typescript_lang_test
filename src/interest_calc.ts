
export class InterestCalc {
    test()
    {
        console.log('~~~~ main ~~~~');

        let base_money = 100;

        let calc1 = (money:number) => {
            let m1 = money + (money * 0.1);
            return m1;
        }

        let m1 = base_money;
        for(let i = 0; i < 5; i++)
        {
            m1 = m1 * 1.1;
            console.log('calc1 > ', m1);
        }

        /** 복리 : 원금 * ((1+이율) ^ 기간(이나 회수)) */
        let FN_BokRi = (baseValue:number, interestRate:number, count:number) => {
            return baseValue * (interestRate ** count);
        }

        /** 단리 : 원금 * ((1+이율) * 기간(이나 회수)) */
        let FN_DanRi = (baseValue:number, interestRate:number, count:number) => {
            return baseValue * (interestRate * count);
        }

        for(let i = 0; i <= 5; i++)
        {
            console.log('bk > ', i, ' > ', FN_BokRi(base_money, 1.1, i));
        }
    }
}
//interestCalc.test();
