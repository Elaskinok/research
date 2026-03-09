// Requires LightweightCharts to be loaded first (standalone build)
window.ChartComponent = {
    COLORS: ['#2962FF', '#E91E63', '#FF6D00', '#00BCD4', '#4CAF50', '#9C27B0'],

    THEME: {
        layout: {
            background: { color: '#151518' },
            textColor: '#d1d4dc',
        },
        grid: {
            vertLines: { color: '#2a2a2e' },
            horzLines: { color: '#2a2a2e' },
        },
        crosshair: {
            vertLine: { color: '#758696', labelBackgroundColor: '#3d5068' },
            horzLine: { color: '#758696', labelBackgroundColor: '#3d5068' },
        },
        leftPriceScale: { visible: true },
        rightPriceScale: { visible: false },
    },

    // seriesList: [{ label: string, data: [{time, value}] }, ...]
    create(container, seriesList) {
        // Legend
        const legend = document.createElement('div');
        legend.style.cssText = 'display:flex;gap:16px;margin-bottom:12px;flex-wrap:wrap;';
        seriesList.forEach(({ label }, i) => {
            const color = this.COLORS[i % this.COLORS.length];
            const item = document.createElement('div');
            item.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:13px;color:#9aa3af;font-family:sans-serif;';
            item.innerHTML = `<span style="width:12px;height:12px;border-radius:50%;background:${color};flex-shrink:0;"></span>${label}`;
            legend.appendChild(item);
        });
        container.parentElement.insertBefore(legend, container);

        const chart = LightweightCharts.createChart(container, {
            width: container.clientWidth,
            height: 460,
            timeScale: { timeVisible: true },
            ...this.THEME,
        });

        seriesList.forEach(({ data }, i) => {
            const series = chart.addSeries(LightweightCharts.LineSeries, {
                color: this.COLORS[i % this.COLORS.length],
                priceScaleId: 'left',
                lastValueVisible: false,
                priceLineVisible: false,
            });
            series.setData(data);
        });

        chart.timeScale().fitContent();
        window.addEventListener('resize', () => chart.resize(container.clientWidth, 460));

        return chart;
    },
};
