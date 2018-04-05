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
        // Dependencies that aren't ours.
        "define(function() {});",
        "define([a], function(a) { });",
        "define(['a'], function() {});",
        "define('id', ['a'], function() {});",

        // Case insensitive
        "define(['epi/shell/TypeDescriptorManager'],function (TypeDescriptorManager) { return {}; });",
        "define(['epi/shell/typedescriptormanager'],function (TypeDescriptorManager) { return {}; });",

        // Resources loaded by us (actual resource can be ours and others, doesn't matter right now)
        "define(['epi/i18n!epi/shell/ui/nls/episerver.cms.compare'],function (resources) { return {}; });",
        "define(['epi/i18n!epi/cms/nls/commerce.contentediting.editors.variantcollectioneditor'],function (resources) { return {}; });",
        // Resources loaded by dojo or something else
        "define(['dojo/has!host-browser?doh/_browserRunner'],function () { return {}; });",
    ],

    invalid: [
        {
            code: "define(['epi/shell/widget/_ModelBindingMixin'],function (_ModelBindingMixin) { return {}; });",
            errors: [{
                message: "'epi/shell/widget/_ModelBindingMixin' is an internal Episerver module and can have a breaking change in any release.",
                type: "Literal"
            }]
        },
        {
            code: "define(['epi/shell/widget/_modelbindingmixin'],function (_ModelBindingMixin) { return {}; });",
            errors: [{
                message: "'epi/shell/widget/_modelbindingmixin' is an internal Episerver module and can have a breaking change in any release.",
                type: "Literal"
            }]
        },
        {
            code: "define(['epi/madeup!epi/something/or.other'],function (_DndStateMixin) { return {}; });",
            errors: [{
                message: "'epi/madeup' is an internal Episerver module and can have a breaking change in any release.",
                type: "Literal"
            }]
        },
    ]
});
