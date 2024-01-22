#!/bin/bash
sudo apt-get update && sudo apt-get -y install git-flow \
    bash-completion

echo ". /usr/share/bash-completion/bash_completion" >> ~/.bashrc

go install github.com/rakyll/gotest
npm install -g npm pnpm
make install
