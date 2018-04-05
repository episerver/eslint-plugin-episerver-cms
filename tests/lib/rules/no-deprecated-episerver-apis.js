/**
 * @fileoverview Prohibits the use of deprecated Episerver API&#39;s.
 * @author John-Philip Johansson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-deprecated-episerver-apis"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-deprecated-episerver-apis", rule, {

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
            code: "define(['epi-cms/widget/_DndStateMixin'],function (_DndStateMixin) { return {}; });",
            errors: [{
                message: "'epi-cms/widget/_DndStateMixin' is a deprecated Episerver module and will be removed in a future major version.",
                type: "Literal"
            }]
        },
        {
            code: "define(['epi-cms/widget/_dndstatemixin'],function (_DndStateMixin) { return {}; });",
            errors: [{
                message: "'epi-cms/widget/_dndstatemixin' is a deprecated Episerver module and will be removed in a future major version.",
                type: "Literal"
            }]
        }

    ]
});
