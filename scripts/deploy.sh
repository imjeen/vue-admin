#!/usr/bin/env sh

# abort on errors
set -e

npm run build

cd ./dist/

git init
git config user.name "imjeen" 
git config user.email "imjeen@sina.com"
git add -A
git commit -m 'deploy'

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:imjeen/vue-admin.git master:gh-pages
git log --oneline -20

cd -
