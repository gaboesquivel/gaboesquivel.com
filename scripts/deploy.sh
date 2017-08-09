#!/usr/bin/env bash

mkdir _gh-pages
cd _gh-pages
echo $(pwd)

echo 'gaboesquivel.com' > CNAME


git init .
git remote add origin git@github.com:gaboesquivel/gaboesquivel.github.io.git
git fetch origin master
# git checkout master

cp -r ../public/* _gh-pages

git add -A .

git commit -a -m 'gh-pages update'

git push origin master --force

cd ..
rm -rf _gh-pages

git checkout develop
