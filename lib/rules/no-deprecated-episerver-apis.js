/**
 * @fileoverview Prohibits the use of deprecated Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const deprecatedModules = require('../deprecated.json').map(name => name.toLowerCase());


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prohibits the use of deprecated Episerver API's.",
            category: "Episerver API",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // Helper to check if a dependency is deprecated and report if it is.
        function applyRule(dependency) {
            // It has to be a string, that starts with "epi" to be a possible Episerver module.
            if (dependency.type !== "Literal") { return; }
            const dep = dependency.value.toLowerCase();
            if (!dep.startsWith("epi")) { return; }

            // Check that it's not a deprecated module.
            const isDeprecated = deprecatedModules.includes(dep);
            if (!isDeprecated) { return; }

            // It was a internal module. Report.
            context.report({
                node: dependency,
                message: `'${dependency.value}' is a deprecated Episerver module and will be removed in a future major version.`
            });
        }

        // Helper to apply the rule to all the dependencies.
        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === 'ArrayExpression');

            if (!dependencyNode) { return; }

            dependencyNode.elements.forEach(applyRule);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "CallExpression:exit": function(node) {
                if (node.callee.name !== 'define') { return; }
                analyseDefine(node);
            }

        };
    }
};
