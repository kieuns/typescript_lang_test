* ref : <https://khalilstemmler.com/blogs/typescript/node-starter-project/>

# setup ts proejct

```
npm init
```

```
npm install typescript --save-dev
```

```
npm install @types/node --save-dev
```

## create tsconfig.json

```
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

컴파일

```
npx tsc
```


# ts eslint

* no-unsafe-assignment      : <https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md>
* no-unsafe-argument        : <https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-argument.md>
* no-unsafe-assignment      : <https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md>
* no-unsafe-member-access   : <https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md>
* no-explicit-any           : <https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.md>

# command pipe line

```
// To summarize(non - exhaustively) bash's command operators/separators:
//
// | pipes(pipelines) the standard output(stdout) of one command into the standard input of another one.Note that stderr still goes into its default destination, whatever that happen to be.
// |& pipes both stdout and stderr of one command into the standard input of another one.Very useful, available in bash version 4 and above.
// && executes the right - hand command of && only if the previous one succeeded.
// || executes the right - hand command of || only it the previous one failed.
// ; executes the right - hand command of; always regardless whether the previous command succeeded or failed.Unless set - e was previously invoked, which causes bash to fail on an error.
```

# esline disable

<https://typescript-eslint.io/getting-started>

```
/* eslint-disable no-explicit-any */
/* eslint-disable  @typescript-eslint/no-explicit-any */
```

