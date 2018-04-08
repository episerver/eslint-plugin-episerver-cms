const normalizer = require("./normalized");

/* FORMAT (pretty printed version of 'normalized'):
    [
        {
            "rule": "no-deprecated-episerver-apis",
            "violations": [
                {
                    "module": "epi/shell/widget/_ActionProviderWidget",
                    "usages": 3
                },
                {
                    "module": "epi-cms/store/CustomQueryEngine",
                    "usages": 2
                }
            ]
        },
        {
            "rule": "no-internal-episerver-apis",
            "violations": [
                {
                    "module": "epi/shell/widget/dialog/_DialogContentMixin":,
                    "usages": 5
                }
            ]
        }
    ]
*/

module.exports = function (results) {
    return JSON.stringify(normalizer(results), null, 4);
};
