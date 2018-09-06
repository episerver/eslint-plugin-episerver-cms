# What CMS UI JavaScript modules are being used?

The way the modules are currently loaded makes all CMS UI JavaScript modules available for use, but only the modules tagged as `public` are under [semantic versioning](https://semver.org/) in our [continous release process](https://world.episerver.com/articles/Items/EPiServer-Continuous-Release-Process/). This means that there might be modules that _are not_ meant for public use but are widely used, and they can break on any upgrade - even patch releases.

The best way to make sure a module is part of the public API is to open the source file and check the `// tags:` in the code documentation, and verify that it says `public`. But we want to do two things:

1. Help you be aware of what is and isn't a public API
2. Help you transition from internal to public API's

The ESLint plugin helps with part 1. At least on a module-level, as it doesn't detect usages of internal methods and fields on a public module (yet?).

For part 2 we need your help. We need to know what non-public API's you are using. With that information we can decide, per module, if we should make it public or if we need to write guides on what should be used instead. Our internal API is too large to do this without data to help us prioritize.

## How you can help

Install [ESLint](https://eslint.org), [@episerver/eslint-plugin-cms](https://github.com/seriema/eslint-plugin-episerver-cms), and [@episerver/eslint-formatter-cms](https://github.com/seriema/eslint-formatter-episerver-cms), then lint a project and send the output file to [jp.johansson@episerver.com](mailto:jp.johansson@episerver.com).

> Que?

If you don't have node installed, just install [yarn](https://yarnpkg.com/). If you prefer npm, you know what to do.

**Step 1)** Install all the things globally:

```console
yarn global add eslint @episerver/eslint-plugin-cms @episerver/eslint-formatter-cms
```

**Step 2)** Run this in a top-level directory, per project. Just change "YOURPROJECT".

```console
C:> eslint C:/YourEpiserverProject/ --output-file=YourEpiserverProject.json --plugin=episerver-cms --format=episerver-cms --ignore-pattern="node_modules" --ignore-pattern="dtk" --rule="{ \"@episerver/cms/no-internal-episerver-apis\": error, \"@episerver/cms/no-deprecated-episerver-apis\": warn }"
```

**Step 3)** Send all those sweet JSON files to [jp.johansson@episerver.com](mailto:jp.johansson@episerver.com).

**Step 4)** Collect your beer/coffee. Catch me on one of our [Swedish events](https://www.episerver.com/learn/events/event-listing/), [Stockholm meetups](https://www.meetup.com/EPiServer-Stockholm/), or our global events like [Ascend USA](https://www.episerver.com/about/company/overview/ascend-usa/). :)
