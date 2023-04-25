#!/bin/sh
export SLACK_WEBHOOK_URL=value
export MOVIE_URL=value
export THEATERS=value
xvfb-run --auto-servernum /home/ubuntu/.nvm/versions/node/v18.16.0/bin/node /home/ubuntu/index.js