/**
 * @fileoverview Prohibits the use of deprecated Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const deprecatedModules = require('../deprecated.json').map(name => name.toLowerCase());
const analyseDefine = require('../helpers').analyseDefine;


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
        fixable: null,
        schema: [],
        messages: {
            deprecatedModule: "'{{moduleName}}' is a deprecated Episerver module and will be removed in a future major version."
        }
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        const isViolation = dependency => deprecatedModules.includes(dependency);

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "CallExpression:exit": function(node) {
                if (node.callee.name !== 'define') { return; }
                analyseDefine(context.report, isViolation, "deprecatedModule", node);
            }

        };
    }
};
