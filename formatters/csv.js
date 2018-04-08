const normalizer = require("./normalized");

/* FORMAT (ordered by module name):
    Rule,Module name,Usage count
    no-deprecated-episerver-apis,epi/shell/widget/_ActionProviderWidget,3
    no-deprecated-episerver-apis,epi-cms/store/CustomQueryEngine,2
    no-internal-episerver-apis,epi-cms/contentediting/NotificationBar,8
    no-internal-episerver-apis,epi/shell/widget/_ModelBindingMixin,17
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
