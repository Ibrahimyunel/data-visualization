import { ChartOfCovid } from "../chart";
const covObj = new ChartOfCovid();

class SelectChartType extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                        <style>
                            .chart-type {
                                display: flex;
                                gap: .5em;
                                justify-content: flex-end;
                                align-items: center;
                                height: auto;
                            }
                            .chart-type h5 {
                                margin: 0;
                            }
                            .chart-type select{
                                background-color: #f4f2ff;
                                border: .2em solid brown;
                                border-radius: .5em;
                                width: 25%;
                                padding: .5em;
                            }
                        </style>

                        <div class="chart-type">
                            <h5>Chart Type</h5>
                            <select id="chart_type">
                                <option value="bar">Bar</option>
                                <option value="line">Line</option>
                            </select>
                        </div>
                        `;

        setTimeout(() => {
            document.getElementById('chart_type').addEventListener('change', covObj.updateChartType);
        }, 500);
    }
}

customElements.define('select-chart', SelectChartType);