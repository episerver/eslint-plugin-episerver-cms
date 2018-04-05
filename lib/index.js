/**
 * @fileoverview Makes sure only public Episerver CMS API's are used.
 * @author John-Philip Johansson
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



module.exports.configs = {
    recommended: {
        rules: {
            "episerver-cms/no-internal-episerver-apis": "error",
            "episerver-cms/no-deprecated-episerver-apis": "warn"
        }
    }
};
