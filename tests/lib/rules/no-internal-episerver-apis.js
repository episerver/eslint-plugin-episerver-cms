/**
 * @fileoverview Prohibits the use of internal Episerver API&#39;s.
 * @author John-Philip Johansson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-internal-episerver-apis"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-internal-episerver-apis", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "define([\"epi-cms/compare/command/CompareCommandProvider.js\"], function (CompareCommandProvider) {});",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
