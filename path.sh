#!/bin/bash

# Push your main repo changes
git push origin $(git rev-parse --abbrev-ref HEAD)

git submodule add https://github.com/ammohan6212/jenkins-common.git jenkins-common


# Update or clone the submodule (assumes it's already configured)
git submodule update --init --remote --recursive

# Copy contents of the submodule (e.g., from ci/) into the main rep
cp -r jenkins-common/* .

# Optional: remove the submodule folder
rm -rf jenkins-common

# Optional: unstage deleted submodule folder and add the copied files
git add -A
git commit -m "Flatten submodule into main directory"
git push origin $(git rev-parse --abbrev-ref HEAD)
