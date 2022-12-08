#!/bin/bash
clear && tsc --target es5 --allowJs --outDir 'dist' ./src/main.ts && node ./dist/main