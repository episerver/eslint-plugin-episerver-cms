/**
 * @fileoverview Prohibits the use of deprecated Episerver API's.
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
        // Dependencies that aren't ours.
        "define(function() {});",
        "define([a], function(a) { });",
        "define(['a'], function() {});",
        "define('id', ['a'], function() {});",

        // Case insensitive
        "define(['epi/shell/TypeDescriptorManager'],function (TypeDescriptorManager) { return {}; });",
        "define(['epi/shell/typedescriptormanager'],function (TypeDescriptorManager) { return {}; });",

        // Special case. Just Namespace will redirect to Namespace/main.js (i.e. "epi" loads "epi/main").
        "define(['epi'],function (epi) { return {}; });",

        // Resources loaded by us (actual resource can be ours and others, doesn't matter right now)
        "define(['epi/i18n!epi/shell/ui/nls/episerver.cms.compare'],function (resources) { return {}; });",
        "define(['epi/i18n!epi/cms/nls/commerce.contentediting.editors.variantcollectioneditor'],function (resources) { return {}; });",
        // Resources loaded by dojo or something else
        "define(['dojo/has!host-browser?doh/_browserRunner'],function () { return {}; });",

        // Commerce modules (Has the "epi" prefix, but not completely)
        "define(['epi-ecf-ui/widget/viewmodel/FacetGroupViewModel'],function (FacetGroupViewModel) { return {}; });",
    ],

    invalid: [
        {
            code: "define(['epi-cms/widget/_DndStateMixin'],function (_DndStateMixin) { return {}; });",
            errors: [{
                messageId: "deprecatedModule",
                data: { moduleName: "epi-cms/widget/_DndStateMixin" },
                type: "Literal"
            }]
        },
        {
            code: "define(['epi-cms/widget/_dndstatemixin'],function (_DndStateMixin) { return {}; });",
            errors: [{
                messageId: "deprecatedModule",
                data: { moduleName: "epi-cms/widget/_dndstatemixin" },
                type: "Literal"
            }]
        },
    ]
});
