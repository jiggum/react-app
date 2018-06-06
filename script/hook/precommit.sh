#!/usr/bin/env bash
set -e

# get staged js files
jsfiles=$(git diff --cached --name-only --diff-filter=ACM src/ | grep '\.js\?$' | tr '\n' ' ')
scssfiles=$(git diff --cached --name-only --diff-filter=ACM src/ | grep '\.scss\?$' | tr '\n' ' ')
[ -z "$jsfiles" ] && [ -z "$scssfiles" ]  && exit 0

# eslint
echo "$jsfiles" | xargs yarn eslint

# Prettify all staged scss files
echo "$scssfiles" | xargs yarn prettier


# Add back the modified/prettified files to staging
#echo "$jsfiles" | xargs git add
#echo "$scssfiles" | xargs git add

exit 0
