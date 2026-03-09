# research

Static GH Pages site with dark-theme financial charts powered by [Lightweight Charts](https://tradingview.github.io/lightweight-charts/).

## File structure

```
index.html                          # Main page — reads charts.json, embeds one iframe per chart page
charts.json                         # List of chart pages to show on index.html
chart_component.js                  # Shared chart factory (theming, colors, resize)

funding_rate_yield_Y.html           # Chart page: one chart-box per coin, all exchanges as lines
funding_rate_yield_Y_data/
  index.json                        # ["binance", "bybit", ...]  — list of exchanges
  binance/
    index.json                      # ["btc", "eth", "sol", ...]  — coins available on this exchange
    btc.json                        # [{time: "2022-01-01", value: 22.3}, ...]
    eth.json
    sol.json
  bybit/
    index.json
    btc.json
    eth.json
```

---

## How to add a new coin to an existing chart

1. Add the data file, e.g. `funding_rate_yield_Y_data/binance/bnb.json`
2. Add `"bnb"` to `funding_rate_yield_Y_data/binance/index.json`
3. Repeat for any other exchange that has data for it

The coin appears automatically on the page — no HTML changes needed.

---

## How to add a new exchange

1. Create the folder and its files:
   ```
   funding_rate_yield_Y_data/okx/index.json   ← ["btc", "eth"]
   funding_rate_yield_Y_data/okx/btc.json
   funding_rate_yield_Y_data/okx/eth.json
   ```
2. Add `"okx"` to `funding_rate_yield_Y_data/index.json`

The exchange appears as a new line series on every coin chart it has data for.

---

## How to add a completely new chart type

1. Create a new data folder + index files following the same pattern, e.g.:
   ```
   my_new_chart_data/
     index.json          ← exchanges
     binance/
       index.json        ← coins
       btc.json
   ```

2. Create `my_new_chart.html` — copy `funding_rate_yield_Y.html` and update:
   - The `DIR` constant to point at your new data folder
   - The title text

3. Add `"my_new_chart.html"` to `charts.json`

That's it — it shows up on `index.html` automatically.

---

## Data format

Each coin JSON file is a flat array:
```json
[
  {"time": "2022-01-01", "value": 22.34},
  {"time": "2022-01-02", "value": 21.98}
]
```

`time` must be a `YYYY-MM-DD` string. `value` is a number.
