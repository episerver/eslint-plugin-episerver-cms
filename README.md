# eslint-plugin-episerver-cms
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Makes sure only public non-deprecated Episerver CMS API's are used.

> _If you work on multiple Episerver projects and want to help us improve our public API, [we could use your help](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/say-hello.md)._

![Screenshot of summary output](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/summary.png?raw=true)

## Installation

First, install [ESLint](http://eslint.org):

```shell
$ npm i eslint --save-dev
# or
$ yarn add eslint -D
```

Next, install `eslint-plugin-episerver-cms`:

```shell
$ npm i eslint-plugin-episerver-cms --save-dev
# or
$ yarn add eslint-plugin-episerver-cms -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-episerver-cms` globally.

## Usage

Add `eslint-plugin-episerver-cms` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "episerver-cms"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "episerver-cms/no-internal-episerver-apis": "error",
        "episerver-cms/no-deprecated-episerver-apis": "warn"
    }
}
```

## Recommended config

This plugin exports a [`recommended` config](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/lib/index.js) that enforces good practices.

Enable it in your `.eslintrc.json` with the `extends` option:

```json
{
    "extends": "plugin:episerver-cms/recommended"
}
```

## Analyzing multiple projects

Install globally (see instructions above), and then run this for any project:

```shell
$ eslint C:/YourEpiserverProject/ --output-file YourEpiserverProject.json --plugin episerver-cms --format episerver-cms --rule "{ episerver-cms/no-internal-episerver-apis: error, episerver-cms/no-deprecated-episerver-apis: warn }" --ignore-pattern "node_modules" --ignore-pattern "dtk"
```

## Supported Rules

* [no-internal-episerver-apis](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/docs/rules/no-internal-episerver-apis.md) - Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches).
* [no-deprecated-episerver-apis](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/docs/rules/no-deprecated-episerver-apis.md) - Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Formatters

There are several formatters you can use to get a clearer overview of what Episerver API's are being used but shouldn't be. They are installed seperately, with [eslint-formatter-episerver-cms](https://github.com/seriema/eslint-formatter-episerver-cms).

```shell
$ npm i seriema/eslint-formatter-episerver-cms --save-dev
# or
$ yarn add seriema/eslint-formatter-episerver-cms -D
```

Then you can get a summary view with:

```shell
$ eslint . --format=episerver-cms
```
