#!/usr/bin/env bash

cp -r public/* _gh-pages

cd _gh-pages

echo 'gaboesquivel.com' > CNAME

git init .
git remote add origin git@github.com:gaboesquivel/gaboesquivel.github.io.git

git add -A .

git commit -a -m 'gh-pages update'

git push origin gh-pages --force

cd ..
rm -rf _gh-pages

git checkout master
