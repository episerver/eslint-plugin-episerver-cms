/**
 * @fileoverview Prohibits the use of internal Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const publicModulesWorkarounds = require('../publicModulesWorkarounds.json').map(name => name.toLowerCase());
const publicModules = require('../publicModules.json').map(name => name.toLowerCase()).concat(publicModulesWorkarounds);
const analyseDefine = require('../helpers').analyseDefine;


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
        fixable: null,
        schema: [],
        messages: {
            internalModule: "'{{moduleName}}' is an internal Episerver module and can have a breaking change in any release."
        }
    },

    create: function(context) {

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        const isViolation = dependency => publicModules.every(allowedDep => dependency !== allowedDep);

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "CallExpression:exit": function(node) {
                if (node.callee.name !== 'define') { return; }
                analyseDefine(context.report, isViolation, "internalModule", node);
            }

        };
    }
};
