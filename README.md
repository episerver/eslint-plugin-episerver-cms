# eslint-plugin-episerver-cms

Makes sure only public Episerver CMS API's are used.

![Screenshot of summary output](docs/formatters/summary.png)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
# or
$ yarn add eslint -D
```

Next, install `eslint-plugin-episerver-cms` from this repo as it's not ready for npm just yet:

```
$ npm i https://github.com/seriema/eslint-plugin-episerver-cms.git --save-dev
# or
$ yarn add https://github.com/seriema/eslint-plugin-episerver-cms.git -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-episerver-cms` globally.

## Usage

Add `eslint-epi-cms-api` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

This plugin exports a [`recommended` config](lib/index.js) that enforces good practices.

Enable it in your `.eslintrc.json` with the `extends` option:

```json
{
	"extends": "plugin:episerver-cms/recommended"
}
```

## Supported Rules

* [no-internal-episerver-apis](docs/rules/no-internal-episerver-apis.md) - Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches).
* [no-deprecated-episerver-apis](docs/rules/no-deprecated-episerver-apis.md) - Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Formatters

There are several formatters you can use. If you want to send us some statistics to help us in the CMS UI team, please send us the CSV version. [See all formatters.](docs/formatters/README.md)

The summary formatter can be used with:

```
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js
```
