const chalk = require("chalk");
const emoji = require("node-emoji");
const normalizer = require("./normalized");
const rules = require("../lib/resources").rules;

module.exports = function (results) {
/* FORMAT
 API        Module name                                         Usages
 deprecated epi/shell/widget/_ActionProviderWidget              1
 internal   epi-cms/contentediting/NotificationBar              8 🔥
 internal   epi/shell/widget/_ModelBindingMixin                 8 🔥
 internal   epi-cms/widget/Breadcrumb                           5 🔥
 internal   epi/shell/command/_CommandModelBindingMixin         2
 internal   epi/shell/widget/dialog/_DialogContentMixin         1
  💣 Deprecated API's used 1 times
  ⚠️ Internal API's used 23 times
*/


    // Helper methods to set up the table

    const lengthOfLongest = (prop, array) =>
        array.reduce(
            (length, obj) => Math.max(length, obj[prop].toString().length),
            0
        );

    const countPropValues = (prop, term, array) => array.filter(element => element[prop].includes(term)).reduce((sum, element) => sum += element.usages, 0);


    // Transform the data into something we want to print

    const tableData = normalizer(results)
        .reduce((results, summary) => {
            return results.concat(
                summary.violations
                    .sort((vA, vB) => vB.usages - vA.usages) // Sort by usage
                    .map(violation => {
                        return {
                            rule: rules.shortNames[summary.rule],
                            module: violation.module,
                            usages: violation.usages
                        };
                    })
            );
        }, []);

    const ruleMaxLen = lengthOfLongest("rule", tableData) + 1;
    const moduleMaxLen = lengthOfLongest("module", tableData) + 1;
    const usagesMaxLen = lengthOfLongest("usages", tableData) + 1;

    const totalDeprecated = countPropValues("rule", rules.NO_DEPRECATED_EPISERVER_APIS.shortName, tableData);
    const totalInternal = countPropValues("rule", rules.NO_INTERNAL_EPISERVER_APIS.shortName, tableData);


    // Formatting and output (yes, we're using emojis ;) )

    const many = 5;
    const headers = ["API", "Module name", "Usages"];
    const deprecatedEmoji = rules.NO_DEPRECATED_EPISERVER_APIS.emoji;
    const internalEmoji = rules.NO_INTERNAL_EPISERVER_APIS.emoji;
    const tooManyEmoji = emoji.get("fire");
    const tooMany = usages => chalk`{red ${usages}} ${tooManyEmoji}`;
    const noteUsages = (usages) => usages >= many ? tooMany(usages) : usages.toString();

    // The table we output

    const output =
        // Header
        "\n" +
        chalk.white.bgGreen(` ${headers[0].padEnd(ruleMaxLen)}${headers[1].padEnd(moduleMaxLen)}${headers[2].padEnd(usagesMaxLen)} \n`) +
        // Data
        tableData.map(row => chalk` {gray ${row.rule.padEnd(ruleMaxLen)}}${row.module.padEnd(moduleMaxLen)}${noteUsages(row.usages).padEnd(usagesMaxLen)} `).join("\n") + "\n" +
        // Summary
        chalk.keyword("orange")(`  ${deprecatedEmoji} Deprecated API's used ${totalDeprecated} times\n`) +
        chalk.keyword("orange")(`  ${internalEmoji} Internal API's used ${totalInternal} times\n`) +
        "\n";

    return output;
}
