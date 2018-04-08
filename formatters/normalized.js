module.exports = function (results) {

/* FORMAT (A sorted array, with nested elements for rule violations that are sorted by module name for minimal git diffs when commiting the csv or json results):
    [
        {
            rule: "no-deprecated-episerver-apis",
            violations: [
                {
                    module: "epi-cms/store/CustomQueryEngine",
                    usages: 2
                },
                {
                    module: "epi/shell/widget/_ActionProviderWidget",
                    usages: 3
                }
            ]
        },
        {
            rule: "no-internal-episerver-apis",
            violations: [
                {
                    module: "epi/shell/widget/dialog/_DialogContentMixin":,
                    usages: 5
                }
            ]
        }
    ]
*/

    const hasMessages = result => result.messages.length;

    const epiRulePlugin = "episerver-cms/";
    const ruleNameFromMessage = msg => msg.ruleId.replace(epiRulePlugin, "");

    const isEpiMessage = message => message.ruleId && message.ruleId.startsWith(epiRulePlugin);
    const areEpiMessages = result => result.messages.filter(isEpiMessage);

    const moduleNameFromMessage = msg => msg.message
        .replace(/'/g, "")
        .replace(" is an internal Episerver module and can have a breaking change in any release.", "")
        .replace(" is a deprecated Episerver module and will be removed in a future major version.", "");

    const countModules = (seq, current) => {
        current.messages
            .filter(isEpiMessage) // `areEpiMessages` doesn't seem to work. It includes linting errors from this file, which is strange.
            .forEach(msg => {
                const module = moduleNameFromMessage(msg);
                const rule = ruleNameFromMessage(msg);

                if (!seq[rule]) { seq[rule] = {}; }

                if (!seq[rule][module]) { seq[rule][module] = 0; }

                seq[rule][module]++;
            });

        return seq;
    };

    // This holds an object with module name and usage count as key and value.
    const hashmap = results
        .filter(hasMessages)
        .filter(areEpiMessages) // TODO: Why doesn't this work?
        .reduce(countModules, {
            // empty object to start with, to use as a simple hash map
        });


    return Object
        .keys(hashmap)
        .sort() // Sort on rule name, which are the keys
        .map(rule => {
            const violations = hashmap[rule];

            return {
                rule,
                violations: Object
                    .keys(violations)
                    .sort() // First sort on module name, which are the keys
                    .map(name => {
                        return {
                            module: name,
                            usages: violations[name]
                        };
                    })
                };
        });
};
