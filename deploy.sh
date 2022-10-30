#!/usr/bin/env sh

# Убедимся, что находимся на главной ветке и перебазируем ее в ветку gh-pages
# git checkout main
# git rebase gh-pages

# переключаемся на ветку gh-pages
# git checkout gh-pages

git switch main
git checkout --orphan temp_branch
git add -A
git commit -am "the first commit"
git branch -D gh-pages
git push origin --delete gh-pages
git branch -m gh-pages

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

# git init
git add dist
git commit -m 'add dist subtree and deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git subtree push --prefix dist origin gh-pages
# git push origin `git subtree split --prefix dist main`:gh-pages --force

git switch -f main

# cd -