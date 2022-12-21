#!/bin/bash
# clear && tsc --project tsconfig.json && node ./dist/main
clear && tsc --module commonjs --target es6 --allowJs --lib es2015,es2017,dom --outDir 'dist' ./src/main.ts && node ./dist/main