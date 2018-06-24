const emoji = require("node-emoji");

const NO_DEPRECATED_EPISERVER_APIS = "no-deprecated-episerver-apis";
const NO_INTERNAL_EPISERVER_APIS = "no-internal-episerver-apis";

const resources = {
    rules: {
        enums: {
            NO_DEPRECATED_EPISERVER_APIS,
            NO_INTERNAL_EPISERVER_APIS,
        },

        // These helpers can be used with the enums.
        // Useful when you have the rules as a variable, like when working with formatters.
        // Example: rules.emojis[someRule](module) -> the emoji corresponding to the `someRule` variable value
        messages: {
            [NO_DEPRECATED_EPISERVER_APIS]: depModule =>
                `'${depModule}' is a deprecated Episerver module and will be removed in a future major version.`,
            [NO_INTERNAL_EPISERVER_APIS]: depModule =>
                `'${depModule}' is an internal Episerver module and can have a breaking change in any release.`,
        },
        shortNames: {
            [NO_DEPRECATED_EPISERVER_APIS]: "deprecated",
            [NO_INTERNAL_EPISERVER_APIS]: "internal",
        },
        emojis: {
            [NO_DEPRECATED_EPISERVER_APIS]: emoji.get("bomb"),
            [NO_INTERNAL_EPISERVER_APIS]: emoji.get("warning"),
        },
    },
};

// Create a direct mapping. Useful when you know the rule you want, and just want its value.
// Example: rules.NO_DEPRECATED_EPISERVER_APIS.emoji
// corresponds to:
// {
//     rules: {
//         NO_DEPRECATED_EPISERVER_APIS: {
//             message:  depModule => `'${depModule}' is a deprecated Episerver module and will be removed in a future major version.`,
//             shortName: "deprecated",
//             emoji: emoji.get("bomb")
//         },
//     }
// }
let rules = resources.rules;
Object.keys(rules.enums).forEach(ruleEnum => {
    const rule = rules.enums[ruleEnum];
    rules[ruleEnum] = {
        message: rules.messages[rule],
        shortName: rules.shortNames[rule],
        emoji: rules.emojis[rule],
    };
});

module.exports = resources;
