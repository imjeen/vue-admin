export default {
    // just for testing
    common: ['GET', 'api/test/common'],
    AAA: {
        list: ['GET', 'api/test/aaa/list'],
        post: ['POSt', 'api/test/aaa/post'],
    },
    BBBB: {
        post: ['POSt', 'api/test/bbb/post'],
        sku: {
            list: ['GET', 'api/test/bbb/sku/list'],
            getDetail() {
                return {
                    detail: 'get detail for SKU',
                };
            },
        },
    },
    CCC() {
        return {
            test: 'CCCC',
        };
    },
    // DDD: 'invalid value', // not be allowed
};
