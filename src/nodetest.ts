import * as crypto from 'crypto';

///////////////////////////////////////////////////////////////////////////////

// crypto_facebooktoken_like_1
function test_1() {
    // console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
    // console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
    // console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
}

// crypto_facebooktoken_like_2
function test_2() {
    // console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
    // console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
    // console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
}

///////////////////////////////////////////////////////////////////////////////

class SharedConstant {
    NAME = {
        ITEM: {
            INGAME: {
                COIN: 'COIN',
                EMPTY_SLOT_ALL: 'EMPTY_SLOT_ALL',
                EMPTY_SLOT_RIGHT_1: 'EMPTY_SLOT_RIGHT_1',
                ZOOM_OUT: 'ZOOM_OUT',
                HINT: 'HINT',
                ERASE_WRONG: 'ERASE_WRONG'
            },
            SHOP: {
                COIN_200: 'COIN_200',
                COIN_625: 'COIN_625',
                COIN_1100: 'COIN_1100',
                COIN_2400: 'COIN_2400',
                COIN_5200: 'COIN_5200',
                COIN_14000: 'COIN_14000',
                COIN_30000: 'COIN_30000',
                STARTER_PACK_1: 'STARTER_PACK_1',
                EXPERT_PACK_1: 'EXPERT_PACK_1',
                MASTER_PACK_1: 'MASTER_PACK_1',
                REMOVE_AD_7D: 'REMOVE_AD_7D',
                REMOVE_AD_30D: 'REMOVE_AD_30D',
                REMOVE_AD_NOLIMIT: 'REMOVE_AD_NOLIMIT'
            }
        }
    };

    SHOP_ITEM = {
        [this.NAME.ITEM.SHOP.COIN_200]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 200 }
        ],
        [this.NAME.ITEM.SHOP.STARTER_PACK_1]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 400 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_ALL, amount: 1 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_RIGHT_1, amount: 1 },
            { name: this.NAME.ITEM.INGAME.ZOOM_OUT, amount: 1 }
        ],
        [this.NAME.ITEM.SHOP.EXPERT_PACK_1]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 800 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_ALL, amount: 2 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_RIGHT_1, amount: 2 },
            { name: this.NAME.ITEM.INGAME.ZOOM_OUT, amount: 2 }
        ],
        [this.NAME.ITEM.SHOP.MASTER_PACK_1]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 1800 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_ALL, amount: 4 },
            { name: this.NAME.ITEM.INGAME.EMPTY_SLOT_RIGHT_1, amount: 4 },
            { name: this.NAME.ITEM.INGAME.ZOOM_OUT, amount: 4 }
        ],
        [this.NAME.ITEM.SHOP.REMOVE_AD_7D]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 50 }
        ],
        [this.NAME.ITEM.SHOP.REMOVE_AD_30D]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 100 }
        ],
        [this.NAME.ITEM.SHOP.REMOVE_AD_NOLIMIT]: [
            { name: this.NAME.ITEM.INGAME.COIN, amount: 300 }
        ]
    };

    /** 공유 상수 획득 */
    public static get () {
        return SC
    }

    /**
     * 공유 상수 설정
     * @param {SharedConstant} newConstant
     */
    public static set (newConstant: SharedConstant) {
        Object.assign(SC, newConstant)
        SC.init()
    }

    public constructor () { this.init() }

    private init () { }
}
const SC = new SharedConstant();

export const INGAME_ITEM_TYPE = {
    EMPTY_SLOT_ALL: SC.NAME.ITEM.INGAME.EMPTY_SLOT_ALL,
    EMPTY_SLOT_RIGHT_1: SC.NAME.ITEM.INGAME.EMPTY_SLOT_RIGHT_1,
    ZOOM_OUT: SC.NAME.ITEM.INGAME.ZOOM_OUT,
    HINT: SC.NAME.ITEM.INGAME.HINT,
    ERASE_WRONG: SC.NAME.ITEM.INGAME.ERASE_WRONG
} as const
export type IngameItemType = typeof INGAME_ITEM_TYPE[keyof typeof INGAME_ITEM_TYPE];

function test_3() {
    console.log('test_3');
    console.log(SC.SHOP_ITEM);
    console.log(SC.SHOP_ITEM[SC.NAME.ITEM.SHOP.STARTER_PACK_1]);

    const item1:IngameItemType = INGAME_ITEM_TYPE.EMPTY_SLOT_ALL;
    console.log(item1);
    console.log(typeof item1);
}

///////////////////////////////////////////////////////////////////////////////

export const GAME_ITEM_TYPE = {
    COIN: 1
} as const
export type GameItemType = typeof GAME_ITEM_TYPE[keyof typeof GAME_ITEM_TYPE];

export const ITEM_KIND = {
    COIN: 200,
    INGAME: 201,
    TILE: 202,
    FRAME: 203,
    SHOP: 204
} as const
export type ItemKind = typeof ITEM_KIND[keyof typeof ITEM_KIND];

const SHOP_ITEM_2 = {
    COIN_200: {
        product_id: '',
        items: [
            { id: GAME_ITEM_TYPE.COIN, type: ITEM_KIND.COIN, amount: 200 }
        ]
    },
    EVENT: {
        INVITE_FREND: {
            REWARD_LEVEL_TO_THRESH_FRIEND_COUNT: {
                1: 1,
                2: 3,
                3: 6,
                4: 10,
            }
        }
    }
};

function test_4() {
    console.log('test_4');
    console.log('SHOP_ITEM_2.COIN_200 :', SHOP_ITEM_2.COIN_200);
    console.log('SHOP_ITEM_2.COIN_200 keys :', Object.keys(SHOP_ITEM_2.COIN_200));
    console.log('SHOP_ITEM_2 keys :', Object.keys(SHOP_ITEM_2));
    console.log('SHOP_ITEM_2[\'COIN_200\']:', SHOP_ITEM_2['COIN_200']);
    console.log('- :', Object.getOwnPropertyNames(SHOP_ITEM_2.COIN_200));    
    console.log('SHOP_ITEM_2.COIN_200 :', SHOP_ITEM_2.COIN_200.toString());
}

function test_5() {
    console.log('test_5');
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT );
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[1] :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[1] );
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[3] :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[3] );
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[\'2\'] :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT['2'] );
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[2] :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[2] );
    const idx:number = 1;
    console.log('SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[1] :', SHOP_ITEM_2.EVENT.INVITE_FREND.REWARD_LEVEL_TO_THRESH_FRIEND_COUNT[`${idx}`] );
}


///////////////////////////////////////////////////////////////////////////////

let TestFunctionRunFlag:number[] = [ 5 ];

TestFunctionRunFlag.forEach((value) => {
    // eval() 은 사악하다는데.. 테스트용에서는 괜찮겠지. <https://stackoverflow.com/questions/496961/call-a-javascript-function-name-using-a-string>
    if(value) {
        eval('test_' + value).call();
    }
});

///////////////////////////////////////////////////////////////////////////////
