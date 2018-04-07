const normalizer = require("./normalized");

/* FORMAT:
    no-deprecated-episerver-apis,epi/shell/widget/_ActionProviderWidget,3
    no-deprecated-episerver-apis,epi-cms/store/CustomQueryEngine,2
    no-internal-episerver-apis,epi/shell/widget/dialog/_DialogContentMixin,5
*/

module.exports = function (results) {
    return normalizer(results)
        .reduce((results, summary) => {
            return results.concat(
                summary.violations.map(violation => {
                    return `${summary.rule},${violation.module},${violation.usages}`;
                })
            )
        }, ["Rule,Module name,Usage count"])
        .join("\n");
};
