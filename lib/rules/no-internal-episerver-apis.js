/**
 * @fileoverview Prohibits the use of internal Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const publicModules = require('../publicModules.json').map(name => name.toLowerCase());

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prohibits the use of internal Episerver API's.",
            category: "Episerver API",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // Helper to check if a dependency is public or report if it's not.
        function applyRule(dependency) {
            // It has to be a string, that starts with "epi" to be a possible Episerver module.
            if (dependency.type !== "Literal" || !dependency.value.toLowerCase().startsWith("epi")) { return; }

            // Check that it's not a internal module.
            const isInternal = publicModules.every(allowedDep => dependency.value.toLowerCase() !== allowedDep);
            if (!isInternal) { return; }

            // It was a internal module. Report.
            context.report({
                node: dependency,
                message: `'${dependency.value}' is an internal Episerver module and can have a breaking change in any release.`
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
