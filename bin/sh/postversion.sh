#!/usr/bin/env bash

output=$(git describe --tags --always --long)

commitMessage="Update build: $output"

bash ./bin/sh/tagpackage.sh "$output"

echo "POST VERSION"
echo "COMMIT VERSION TIMESTAMP"

git commit -m "$commitMessage" ./package.json

git push origin HEAD
git push --tags
