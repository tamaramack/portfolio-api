#!/usr/bin/env bash

echo "VERSION"

[[ "$1" ]] && output=$1 || output=$(git describe --tags --always --long)
echo "Tag output: $output"

# Pull/Fetch Tags from remote
git fetch --tags

# Update package.json with passing arguments
node ./bin/js/build-timestamp.js "$output"

git add -A ./package.json

node ./bin/js/template-render.js
