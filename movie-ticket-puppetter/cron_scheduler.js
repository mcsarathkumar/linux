const cron = require('node-cron');
const child_process = require('child_process');

cron.schedule('*/2 * * * *', () => {
    child_process.exec('xvfb-run --auto-servernum node index.js', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
});