[![NPM version](https://img.shields.io/npm/v/@episerver/eslint-plugin-cms.svg?style=flat-square)](https://www.npmjs.com/package/@episerver/eslint-plugin-cms)
[![Build status](https://circleci.com/gh/seriema/eslint-plugin-episerver-cms.svg?style=svg)](https://circleci.com/gh/seriema/eslint-plugin-episerver-cms)

# @episerver/eslint-plugin-cms

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

Next, install `@episerver/eslint-plugin-cms`:

```shell
$ npm i @episerver/eslint-plugin-cms --save-dev
# or
$ yarn add @episerver/eslint-plugin-cms -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@episerver/eslint-plugin-cms` globally.

## Usage

Add `@episerver/eslint-plugin-cms` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@episerver/cms"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@episerver/cms/no-internal-episerver-apis": "error",
        "@episerver/cms/no-deprecated-episerver-apis": "warn"
    }
}
```

## Recommended config

This plugin exports a [`recommended` config](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/lib/index.js) that enforces good practices.

Enable it in your `.eslintrc.json` with the `extends` option:

```json
{
    "extends": "plugin:@episerver/cms/recommended"
}
```

## Analyzing multiple projects

Install globally (see instructions above), and then run this for any project:

```shell
$ eslint C:/YourEpiserverProject/ --output-file=YourEpiserverProject.json --plugin=episerver-cms --format=episerver-cms --ignore-pattern="node_modules" --ignore-pattern="dtk" --rule="{ \"@episerver/cms/no-internal-episerver-apis\": error, \"@episerver/cms/no-deprecated-episerver-apis\": warn }"
```

## Supported Rules

* [no-internal-episerver-apis](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/docs/rules/no-internal-episerver-apis.md) - Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches).
* [no-deprecated-episerver-apis](https://github.com/seriema/eslint-plugin-episerver-cms/blob/master/docs/rules/no-deprecated-episerver-apis.md) - Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Formatters

There are several formatters you can use to get a clearer overview of what Episerver API's are being used but shouldn't be. They are installed separately, with [@episerver/eslint-formatter-cms](https://github.com/seriema/eslint-formatter-episerver-cms).

```shell
$ npm i @episerver/eslint-formatter-cms --save-dev
# or
$ yarn add @episerver/eslint-formatter-cms -D
```

Then you can get a summary view with:

```shell
$ eslint . --format=episerver-cms
```
