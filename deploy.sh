#!/usr/bin/env sh

# переключаемся на ветку gh-pages
git checkout gh-pages

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

git checkout main

# cd -