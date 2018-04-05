/**
 * @fileoverview Prohibits the use of internal Episerver API's.
 * @author John-Philip Johansson
 */
"use strict";

const publicModulesWorkarounds = require('../publicModulesWorkarounds.json').map(name => name.toLowerCase());
const publicModules = require('../publicModules.json').map(name => name.toLowerCase()).concat(publicModulesWorkarounds);
const helpers = require('../helpers');


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
                if (!helpers.isDefine(node)) { return; }

                node.elements
                    .filter(helpers.shouldApplyRule)
                    .forEach(dependency => {
                        if (isViolation(dependency)) {
                            context.report({
                                node: dependency,
                                messageId: "internalModule",
                                data: { moduleName: helpers.getModuleName(dependency) }
                            });
                        }
                    });

            }

        };
    }
};
