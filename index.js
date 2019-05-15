const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.crowdsupply.com/unexpected-maker/tinypico';

let pledgeLevelDetails = [];
rp(url)
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
  .then(function(pledgeLevels){
    pledgeLevelDetails = pledgeLevels;
    console.log(pledgeLevelDetails);
  })
  .catch(function(err){
    //handle error
    console.log(err);
  });