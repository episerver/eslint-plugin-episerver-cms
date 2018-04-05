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
        "define(function() {});",
        "define([a], function(a) { });",
        "define(['a'], function() {});",
        "define('id', ['a'], function() {});",

        "define(['epi/shell/TypeDescriptorManager'],function (TypeDescriptorManager) { return {}; });",
        "define(['epi/shell/typedescriptormanager'],function (TypeDescriptorManager) { return {}; });"
    ],

    invalid: [
        {
            code: "define(['epi/shell/widget/_ModelBindingMixin'],function (_ModelBindingMixin) { return {}; });",
            errors: [{
                message: "This is an internal Episerver module. Do not use it. Its behaviour can have a breaking change in any release.",
                type: "Literal"
            }]
        },
        {
            code: "define(['epi/shell/widget/_modelbindingmixin'],function (_ModelBindingMixin) { return {}; });",
            errors: [{
                message: "This is an internal Episerver module. Do not use it. Its behaviour can have a breaking change in any release.",
                type: "Literal"
            }]
        }
    ]
});
