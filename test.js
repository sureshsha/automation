const puppeteer = require('puppeteer');

// Puppeteer page event types to catch
const pevents = [
    'console',
    'dialog',
    'load',
    'domcontentloaded',
    'error',
    'pageerror',
    'frameattached',
    'framenavigated',
    'framedetached',
    'request',
    'requestfinished',
    'requestfailed',
    'response'
];

async function main() {
    // Create headless session
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();

    // Log puppeter page notifications
    pevents.forEach((peventName) => {
        page.on(peventName, async (plistenerFunc) => {
            console.log({ peventName, plistenerFunc });
            if (peventName == 'response') {
                await plistenerFunc.text()
                    .then((textBody) => {
                        console.log('textBody:', textBody);
                    }, (err) => {
                        console.error(plistenerFunc, err);
                        console.log(plistenerFunc, err);
                    })
                ;
            }
        });
    });

    // Open a page, than close
    await page.goto('https://www.fiat.co.uk/newsletter-sign-up', { waitUntil: ['networkidle2', 'load', 'domcontentloaded'], timeout: 100000 });
    await page.close();
    await browser.close();
}

main();