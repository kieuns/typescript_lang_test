#!/bin/bash
clear && tsc --target es5 --allowJs --outDir 'dist' ./src/code1.ts && node ./dist/code1