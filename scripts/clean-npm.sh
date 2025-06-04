#!/bin/bash
echo "Cleaning npm cache..."
npm cache clean --force
echo "Removing node_modules..."
rm -rf node_modules
echo "Removing package-lock.json..."
rm -f package-lock.json
echo "Installing dependencies..."
npm install
echo "Done!"
