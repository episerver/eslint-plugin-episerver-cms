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

## Supported Rules

* [no-internal-episerver-apis](docs/rules/no-internal-episerver-apis.md) - Ensure internal Episerver CMS API's are not used, as they can break on any update (including patches).
* [no-deprecated-episerver-apis](no-deprecated-episerver-apis) - Ensure deprecated Episerver CMS API's are not used, as they can be removed in the next major release.


## Formatters

You can also output a summary of used API's. This is valuable statistics to us in the CMS UI team, so please copy that or save it to a file and send it to us.

### Summary format

Usage:

```
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js
```

Result:

```json
[
    {
        "rule": "no-deprecated-episerver-apis",
        "violations": [
            {
                "module": "epi/shell/widget/_ActionProviderWidget",
                "usages": 3
            },
            {
                "module": "epi-cms/store/CustomQueryEngine",
                "usages": 2
            }
        ]
    },
    {
        "rule": "no-internal-episerver-apis",
        "violations": [
            {
                "module": "epi-cms/contentediting/NotificationBar",
                "usages": 8
            },
            {
                "module": "epi/shell/widget/_ModelBindingMixin",
                "usages": 8
            },
        ]
    }
]
```


### JSON format

Usage:

```
# Output to console
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/json.js

# Output to file
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/json.js -o epi-module-usage.json
```

Result:

Looks the same as Summary format.


### CSV format

Usage:

```
# Output to console
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/csv.js

# Output to file
$ eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/csv.js -o epi-module-usage.csv
```

Result:

```csv
no-deprecated-episerver-apis,epi/shell/widget/_ActionProviderWidget,3
no-deprecated-episerver-apis,epi-cms/store/CustomQueryEngine,2
no-internal-episerver-apis,epi-cms/contentediting/NotificationBar,8
no-internal-episerver-apis,epi/shell/widget/_ModelBindingMixin,8
```
