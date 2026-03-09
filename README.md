# research

Static GH Pages site with dark-theme financial charts powered by [Lightweight Charts](https://tradingview.github.io/lightweight-charts/).

## File structure

```
index.html                              # Main page — embeds charts listed in charts.json
charts.json                             # List of chart HTML files to show on index.html
chart_component.js                      # Shared chart factory (dark theme, colors, resize)

funding_rate_yield_Y_btc.html           # Standalone chart: BTC funding rate yearly yield
funding_rate_yield_Y_eth.html           # Standalone chart: ETH funding rate yearly yield
funding_rate_yield_Y_sol.html           # Standalone chart: SOL funding rate yearly yield

funding_rate_yield_Y_data/
  binance/
    btc.json                            # [{time: "2022-01-01", value: 22.3}, ...]
    eth.json
    sol.json
  bybit/
    btc.json
    eth.json
```

## Data format

Each data file is a flat array:
```json
[
  {"time": "2022-01-01", "value": 22.34},
  {"time": "2022-01-02", "value": 21.98}
]
```

---

## How to add a new chart

1. Create a data file, e.g. `funding_rate_yield_Y_data/binance/bnb.json`

2. Copy any existing chart HTML as a starting point, update the title and data paths:
   ```html
   <!-- funding_rate_yield_Y_bnb.html -->
   ...
   <div class="chart-title">Funding rate yearly yield % — BNB</div>
   ...
   const binance = await fetchJson('./funding_rate_yield_Y_data/binance/bnb.json');
   ChartComponent.create(document.getElementById('chart'), [
       { label: 'Binance', data: binance },
   ]);
   ```

3. Add the filename to `charts.json`:
   ```json
   [
     "funding_rate_yield_Y_btc.html",
     "funding_rate_yield_Y_bnb.html"
   ]
   ```

That's it. Each chart HTML is completely standalone and can also be opened directly in the browser.
