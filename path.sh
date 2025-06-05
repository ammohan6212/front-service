#!/bin/bash

# Set variables
SUBMODULE_NAME="jenkins-common"
SUBMODULE_URL="https://github.com/ammohan6212/jenkins-common.git"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🔄 Cleaning up old submodule if it exists..."
git submodule deinit -f $SUBMODULE_NAME
rm -rf .git/modules/$SUBMODULE_NAME
rm -rf $SUBMODULE_NAME

echo "➕ Adding submodule..."
git submodule add --force $SUBMODULE_URL $SUBMODULE_NAME

echo "⬇️ Initializing and updating submodule..."
git submodule update --init --remote --recursive

echo "📁 Copying submodule contents to root directory..."
cp -r $SUBMODULE_NAME/* .

echo "🧹 Removing submodule directory and metadata..."
rm -rf $SUBMODULE_NAME
git rm --cached $SUBMODULE_NAME
rm -f .gitmodules

