/**
 * @fileoverview Prohibits the use of internal Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const publicModules = require("../references/base_api_overview.json").public.map(name => name.toLowerCase());
const xProductModules = require("../references/base_api_overview.json").xproduct.map(name => name.toLowerCase());
const allowedNamespaces = require("../references/namespaces.json").map(name => name.toLowerCase());


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prohibits the use of internal Episerver API's.",
            category: "Episerver API",
            recommended: true,
            url: "https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/docs/rules/no-internal-episerver-apis.md"
        },
        schema: [
            // Allow for one optional flag for internal Episerver usage.
            // I.e. "@episerver/cms/no-internal-episerver-apis": ["error", "xproduct"]
            {
                enum: ["xproduct"]
            }
        ]
    },

    create: function(context) {
        // Check for options given in the rule configuration.
        const xProduct = (context.options[0] === "xproduct");

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // Helper to check if a dependency is public or report if it's not, unless excluded by the "xproduct" option.
        function applyRule(dependency) {
            // It has to be a string, that starts with "epi" to be a possible Episerver module.
            if (dependency.type !== "Literal") { return; }

            // If it's a resource, then parse out the module.
            const depModule = dependency.value.split("!")[0];

            // Check if it's an Episerver module.
            const dep = depModule.toLowerCase();
            if (!allowedNamespaces.some(ns => dep.startsWith(`${ns}/`))) { return; }

            // Check that it's not an internal module.
            const isInternal = publicModules.every(allowedDep => dep !== allowedDep);
            if (!isInternal) { return; }

            // It was an internal module, but can be exempt for Episerver products.
            if (xProduct && xProductModules.includes(dep)) { return; }

            // It was an internal module and it's not for Episerver. Report.
            context.report({
                node: dependency,
                message: `'${depModule}' is an internal Episerver module and can have a breaking change in any release.`
            });
        }

        // Helper to apply the rule to all the dependencies.
        function analyseDefine(defineNode) {
            const dependencyNode = defineNode.arguments.find(node => node.type === "ArrayExpression");

            if (!dependencyNode) { return; }

            dependencyNode.elements.forEach(applyRule);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "CallExpression:exit": function(node) {
                if (node.callee.name !== "define") { return; }
                analyseDefine(node);
            }

        };
    }
};
