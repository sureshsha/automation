const puppeteer = require('puppeteer')
const results = [];
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto("https://capuk.org/i-want-help/courses/cap-money-course/introduction", {
        waitUntil: 'networkidle2'
    });

    await page.type('#search-form > input[type="text"]', 'bd14ew')  
    await page.click('#search-form > input[type="submit"]')

    await page.on('response', async (response) => {    
        if (response.url() == "https://capuk.org/ajax_search/capmoneycourses"){
            console.log('XHR response received'); 
            console.log(await response.json()); 
        } 
    }); 
})()