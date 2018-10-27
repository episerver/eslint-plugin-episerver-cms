# Ensure deprecated Episerver CMS API's are not used. (@episerver/cms/no-deprecated-episerver-apis)

Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Rule Details

Examples of **incorrect** code for this rule:

```js
/*eslint @episerver/cms/no-deprecated-episerver-apis: ["error"]*/
define([
    "epi/shell/TypeDescriptorManager",
    "epi-cms/command/RenameFolder" // This is a deprecated module
], function (
    TypeDescriptorManager,
    RenameFolder
) {
    return {};
});
```

Examples of **correct** code for this rule:

```js
/*eslint @episerver/cms/no-deprecated-episerver-apis: ["error"]*/
define([
    "epi/shell/TypeDescriptorManager",
    "epi-cms/asset/command/RenameSelectedFolder" // Ok (public and not deprecated)
], function (
    TypeDescriptorManager,
    RenameFolder
) {
    return {};
});
```

## When Not To Use It

When you don't plan on upgrading Episerver CMS, or when you are willing to use deprecated API's and just deal with their potential disappearance when upgrading to a new major version.

## Further Reading

* [The old Gadget framework is deprecated](https://world.episerver.com/blogs/grzegorz-wiechec/dates/2017/1/the-old-gadget-framework-is-deprecated/)
* [Planned Breaking Changes 2017 (CMS UI)](https://world.episerver.com/blogs/Ben-McKernan/Dates/2017/9/planned-breaking-changes-2017-cms-ui/)
* [Breaking changes in CMS 11](https://world.episerver.com/documentation/upgrading/Episerver-CMS/cms-11/breaking-changes-cms-11/)
