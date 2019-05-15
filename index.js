const rp = require('request-promise');
const $ = require('cheerio');
const mainUrl = 'https://www.crowdsupply.com/unexpected-maker/tinypico';

const express = require('express')
const app = express()
const port = process.env.PORT || 3008;


const getPledgeDetails = (url) => {
  return rp(url)
  .then(function(html){
    //success!
    //console.log(html);
    const pledgeLevelLength = $(".pledge-level ", html).length;
    const levels = []
    const pledgeLevelElements = $(".pledge-level", html);
    pledgeLevelElements.find("h3").each((index, element) => {
        levels.push({
            name: $(element).text(),
            claimed: 0
        });
    });
    pledgeLevelElements.find(".pledge-level-supporters").each((index, element) => {
        const pledgeLevelMeta = $(element).text();
        const claimed = pledgeLevelMeta.match(/(\d+) claimed/);
        if(claimed.length > 0 && claimed[1]){
            levels[index].claimed = claimed[1];
        }
    });
    return levels;
  })
}

app.get('/pledge', (req, res) => {
  getPledgeDetails(mainUrl)
  .then(pledgeDetails => {
    res.json(pledgeDetails);
  })
  .catch(err => {
    console.log(err);
    res.send('Error, check logs');
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))