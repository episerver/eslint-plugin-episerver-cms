# eslint-plugin-episerver-cms

Makes sure only public Episerver CMS API's are used.

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

## Rules

* [no-internal-episerver-apis](docs/rules/no-internal-episerver-apis.md) - Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches).
* [no-deprecated-episerver-apis](no-deprecated-episerver-apis) - Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Formatters

You can also output a summary of used API's. This is valuable statistics to us in the CMS UI team, so please copy that or save it to a file and send it to us.

```
# Output to console
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js

# Output to file
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js -o epi-module-usage.json
```

It will look something like this, where the number on the right is the number of times the module is referenced:

```json
{
    "no-deprecated-episerver-apis": {
        "epi-cms/store/CustomQueryEngine": 2,
        "epi/shell/widget/_ActionProviderWidget": 1
    },
    "no-internal-episerver-apis": {
        "epi/shell/widget/_ModelBindingMixin": 12,
        "epi/shell/widget/_FocusableMixin": 11,
        "epi-cms/contentediting/NotificationBar": 8
    }
}
```

## Supported Rules

* Fill in provided rules here





