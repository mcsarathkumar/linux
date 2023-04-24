const puppeteer = require('puppeteer');
const axios = require('axios');

const slackWebHookUrl = process.env.SLACK_WEBHOOK_URL;
const movieUrl = process.env.MOVIE_URL;

async function scrapeWebsite(url) {
  // Launch a headless browser instance
  const browser = await puppeteer.launch({
    headless: false,
    args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
    ]
  });

  // Create a new page instance
  const page = await browser.newPage();

  // Navigate to the website you want to scrape
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 1080, height: 1024});
  // Wait for the website to load
  await page.waitForSelector('body');

  // Extract data from the website using CSS selectors
  const body = await page.$eval('body', (element) => element.textContent);

  // Close the browser instance
  await browser.close();
  return body;
}

async function processor() {
    let theaters = [];
    if (process.env.THEATERS) {
        theaters = process.env.THEATERS.split(',');
        theaters = theaters.map(theater => theater.trim());
    }
    let isMovieFound = false;
    try {
        if (!slackWebHookUrl || !movieUrl || theaters.length === 0) {
            throw new Error('Invlid input parameters');
        }
        console.log('Processing Movie URL: ' + movieUrl);
        const bookmyshow = await scrapeWebsite(movieUrl);
        for (const theater of theaters) {
            if (bookmyshow.includes(theater)) {
                isMovieFound = true;
                console.log('Movie found in theater: ' + theater);
                await axios.post(slackWebHookUrl, {
                    text: `Movie found in theater: ${theater}`
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
        if (!isMovieFound) {
            console.log('Movie not found in any of the theaters');
        }
    } catch (err) {
        console.log(err);
    }
}

processor();