import { Chart } from "chart.js/auto";
import { DataOfCovid } from "./retrieve-data";

const docObj = new DataOfCovid();
docObj.getData();

export class ChartOfCovid {
    constructor() {
        this.ctx = document.getElementById('chart_covid');
        this.chartConfig;
    }

    setChartConfig() {
        this.chartConfig = {
            type: 'bar',
            data: {
                labels: docObj.datasetsGB.map(row => row.month),
                datasets: [
                    {
                        label: 'positive cases',
                        data: docObj.datasetsGB.map(row => row.positive)
                    },
                    {
                        label: 'negative cases',
                        data: docObj.datasetsGB.map(row => row.negative)
                    }
                ]
            },
            options: {
                plugins: {
                    title: {display:true, text:'USA Historical COVID Data in 2020'}
                }
            }
        }
    }

    setDestroy() {
        const getCanvas = document.getElementById('chart_covid');
        const ctxParent = getCanvas.parentElement;
        getCanvas.remove();
        const newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('id', 'chart_covid');
        ctxParent.appendChild(newCanvas);
        return newCanvas;
    }

    createChart = () => {
        this.setChartConfig();
        new Chart(this.ctx, this.chartConfig);
    }

    updateChartType = (e) => {
        const newCanvas = this.setDestroy();
        this.setChartConfig();
        this.chartConfig.type = e.target.value;
        new Chart(newCanvas, this.chartConfig);
    }
}