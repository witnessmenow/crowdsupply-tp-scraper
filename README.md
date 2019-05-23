# crowdsupply-tp-scraper
A scrapper for getting details on a crowd supply campaign

Built for Seon to use with his [TinyPICO campaign](https://www.crowdsupply.com/unexpected-maker/tinypico), but should work with any. 

### Features
- Returns Pledge level name and quantity claimed in a simple JSON format
- Is on demand, so does not hit Crowd Supply unless someone requests from this server
- There is a 30 second cache to reduce the load on Crowd Supply


### Insalling
- Install Node Js
- Run `npm install` in the same folder as package.json


### To Use
- Update the `mainUrl` variable in `index.js` to the Crowd Supply campaign you want to scrape.
- Run `node index.js`
- Type `http://localhost:3008/pledge` into your browser.



### Sample output:
```
[{"name":"Single TinyPICO","claimed":"65"},{"name":"TinyPICO 2 Pack","claimed":"113"},{"name":"TinyPICO 4 Pack","claimed":"74"},{"name":"TinyPICO Play Pack","claimed":"92"},{"name":"TinyPICO Shield Pack","claimed":"125"}]
```