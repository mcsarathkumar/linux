## Spin a bare minimal VM in cloud

Update VM
`sudo apt update`

### Install NVM and nodejs

- `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

- `export NVM_DIR="$HOME/.nvm"`
- `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm`
- `[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion`

- `nvm install 18`
- `nvm use 18`

### Install required tools for puppetter

`sudo apt install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils xvfb`

### Set environment variables in cron_scheduler.sh

- `export SLACK_WEBHOOK_URL=xyz` #Can be obtained by navigating to https://api.slack.com/apps and create an application
- `export MOVIE_URL=abc` #Like bookmyshow URL
- `export THEATERS=abc,def,ghi` #comma separated theatre names

### add the job in cronjob
- `crontab -e`
- `* * * * * /home/ubuntu/linux/movie-ticket-puppetter/cron_scheduler.sh >> /home/ubuntu/movie-booking.log 2>&1`

#### Alternate solution is using node cron_scheduler.js > sometimes hangs OS
- this is to be done using `tmux`
- add job
- `ctrl + b, then d`
- to login to tmux again `tmux attach`
