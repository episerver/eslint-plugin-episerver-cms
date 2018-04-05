# eslint-plugin-eslint-epi-cms-api

Makes sure only public Episerver CMS API&#39;s are used.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-eslint-epi-cms-api`:

```
$ npm install eslint-plugin-eslint-epi-cms-api --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-eslint-epi-cms-api` globally.

## Usage

Add `eslint-epi-cms-api` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-epi-cms-api"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-epi-cms-api/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





