# eslint-plugin-episerver-cms

Makes sure only public Episerver CMS API's are used.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-episerver-cms`:

```
$ npm install eslint-plugin-episerver-cms --save-dev
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

### Statistics

You can also output a summary of used API's. This is valuable statistics to us in the CMS UI team, so please copy that or save it to a file and send it to us.

```
eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js
eslint . -f ./node_modules/eslint-plugin-episerver-cms/formatters/summary.js -o epi-module-usage.json
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





