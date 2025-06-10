#!/bin/bash
set -e



# Check if submodule already exists locally
if [ -d "jenkins-common" ]; then
    echo "⚠️ Submodule 'jenkins-common' already exists locally. Reusing it."
else
    echo "🛠️ Adding submodule 'jenkins-common'..."
    git submodule add https://github.com/ammohan6212/jenkins-common.git jenkins-common || true
fi

# Initialize and update submodule
git submodule update --init --recursive

# Checkout desired branch in submodule
cd jenkins-common
git fetch
git checkout main
git pull origin main
cd ..

# Copy contents of submodule to main repo (excluding .git folder)
echo "📦 Copying files from submodule..."
rsync -av --progress jenkins-common/ ./ --exclude .git --exclude .gitignore --exclude .gitmodules --exclude .gitkeep

# Remove submodule from git tracking
echo "🗑️ Removing submodule from Git tracking..."
git rm -f jenkins-common

# Clean up submodule references
echo "🧹 Cleaning up .gitmodules and Git config..."
git config -f .git/config --remove-section submodule.jenkins-common || true
sed -i '/jenkins-common/d' .gitmodules 2>/dev/null || true
rm -rf .git/modules/jenkins-common

# Remove submodule directory
rm -rf jenkins-common

# Final commit
echo "✅ Committing flattened state..."
git add -A
git commit -m "Flatten submodule 'jenkins-common' into main directory"
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "🎉 Done!"
