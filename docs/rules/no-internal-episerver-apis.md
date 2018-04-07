# Ensure internal Episerver CMS API's are not used. (episerver-cms/no-internal-episerver-apis)

Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches). Only public API's follow semantic versioning.


## Rule Details

Examples of **incorrect** code for this rule:

```js
define([
    "epi/shell/TypeDescriptorManager",
    "epi/shell/widget/_ModelBindingMixin" // This is an internal module
],function (
    TypeDescriptorManager,
    _ModelBindingMixin
) {
    return {};
});
```

Examples of **correct** code for this rule:

```js
define([
    "epi/shell/TypeDescriptorManager",
    "" // Use something else instead
],function (
    TypeDescriptorManager,
     RenameFolder
) {
    return {};
});
```

## When Not To Use It

When you don't plan on upgrading Episerver CMS.

## Further Reading

* [Planned Breaking Changes 2017 (CMS UI)](https://world.episerver.com/blogs/Ben-McKernan/Dates/2017/9/planned-breaking-changes-2017-cms-ui/)
* [Breaking changes in CMS 11](https://world.episerver.com/documentation/upgrading/Episerver-CMS/cms-11/breaking-changes-cms-11/)
