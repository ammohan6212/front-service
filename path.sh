#!/bin/bash
set -e

REPO_URL="https://github.com/ammohan6212/jenkins-common.git"
CLONE_DIR="jenkins-common"

# Clone the repo
echo "🛠️ Cloning $REPO_URL..."
git clone $REPO_URL $CLONE_DIR

# Checkout desired branch
cd $CLONE_DIR
git checkout main
git pull origin main
cd ..

# Copy contents (excluding .git)
echo "📦 Copying files from $CLONE_DIR..."
rsync -av --progress $CLONE_DIR/ ./ --exclude .git --exclude .gitignore

# Remove the cloned repo
echo "🗑️ Removing $CLONE_DIR..."
rm -rf $CLONE_DIR

# Commit the changes
echo "✅ Committing copied files..."
git add -A
git commit -m "Copied files from $REPO_URL"
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "🎉 Done!"
