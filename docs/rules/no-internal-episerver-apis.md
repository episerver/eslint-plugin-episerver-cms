# Ensure internal Episerver CMS API's are not used. (episerver-cms/no-internal-episerver-apis)

Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches). Only public API's follow semantic versioning.


## Rule Details

Examples of **incorrect** code for this rule:

```js
/*eslint @episerver/cms/no-internal-episerver-apis: ["error"]*/
define([
    "epi/shell/TypeDescriptorManager",
    "epi/shell/command/builder/MenuBuilder" // This is an internal module
], function (
    TypeDescriptorManager,
    MenuBuilder
) {
    return {};
});
```

Examples of **correct** code for this rule:

```js
/*eslint @episerver/cms/no-internal-episerver-apis: ["error"]*/
define([
    "epi/shell/TypeDescriptorManager"
], function (
    TypeDescriptorManager
) {
    return {};
});
```

## Options

This rule has one option that is meant for internal Episerver development of official first party add-ons, such as [EPiServer.CMS.TinyMce](https://nuget.episerver.com/package/?id=EPiServer.CMS.TinyMce).

String option:
* `"xproduct"` Exempts certain modules marked as `internal` so they won't count as a validation. _Do not use this if you are a third-party developer!_

Examples of **correct** code for this rule:
```js
/*eslint @episerver/cms/no-internal-episerver-apis: ["error", "xproduct"]*/
define([
    "epi/shell/TypeDescriptorManager",
    "epi/shell/command/builder/MenuBuilder" // This is an internal module, but is exempted for Episerver first party add-ons.
], function (
    TypeDescriptorManager,
    MenuBuilder
) {
    return {};
});
```

## When Not To Use It

When you don't plan on upgrading Episerver CMS.

Do not use the `"xproduct"` option for third-party code.

## Further Reading

* [Planned Breaking Changes 2017 (CMS UI)](https://world.episerver.com/blogs/Ben-McKernan/Dates/2017/9/planned-breaking-changes-2017-cms-ui/)
* [Breaking changes in CMS 11](https://world.episerver.com/documentation/upgrading/Episerver-CMS/cms-11/breaking-changes-cms-11/)
