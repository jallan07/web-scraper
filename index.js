const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const PORT = 8000
const app = express()
const url = 'https://richmond.craigslist.org/d/furniture/search/fua'

axios(url)
    .then((res) => {
        const html = res.data
        const $ = cheerio.load(html)
        const articles = []
        $('.result-info', html).each(function() {
            const title = $(this).find('h3').text().trim()
            const price = $(this).find('.result-meta').find('.result-price').text()
            const area = $(this).find('.result-meta').find('.result-hood').text().trim().substring(1)
            const hood = area.split(')')[0].trim()
            const url = $(this).find('h3').find('a').attr('href')
                articles.push({
                    title,
                    price,
                    area: hood,
                    url
            })
            console.log(articles)
        })
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`))