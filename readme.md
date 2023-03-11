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