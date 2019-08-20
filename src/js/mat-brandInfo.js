/*!
    *
    * Date: 2018-03-02
    */

(function (global) {
    var 
    
    getSubBrands = {
        'FisherPriceBrands': {
            'brand': 'FP',
            'subBrand': 'FISHER-PRICE BRANDS',
            'displayName': 'FISHER-PRICE BRANDS'
        },
        'FisherPriceFriends': {
            'brand': 'FP',
            'subBrand': 'FISHER-PRICE FRIENDS',
            'displayName': 'FISHER-PRICE FRIENDS'
        },
        'MattelBoys': {
            'brand': 'MAT',
            'subBrand': 'BOYS',
            'displayName': 'Mattel Boys'
        },
        'MattelGirls': {
            'brand': 'MAT',
            'subBrand': 'GIRLS',
            'displayName' :'Mattel Girls'
        }
    }
    global.mattelSite.getSubBrands = getSubBrands;
}(typeof window !== "undefined" ? window : this));