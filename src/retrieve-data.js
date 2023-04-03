import axios from "axios";
import * as groupBy from 'group-by-with';

const groupByWithSum = groupBy({
    totalCalculator: (value/*, key*/) =>  value.reduce((sum, v) => sum + v, 0)
});

export class DataOfCovid {
    constructor() {
        this.datasets = [];
        this.datasetsGB = [];
    }

    getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'short' });
    }

    getData = async () => {
        try {
            const response = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
            const resData = response.data;
            for (let i = 0; i < resData.length; i++) {
                if (resData[i].dateChecked.includes('2020')) {
                    const getMonth = resData[i].dateChecked.slice(5, 7);
                    const monthName = this.getMonthName(getMonth);
                    const positiveCase = resData[i].positive || 0;
                    const negativeCase = resData[i].negative || 0;
                    this.datasets.push({ month: monthName, positive: positiveCase, negative: negativeCase });
                }
            }
            this.datasetsGB = groupByWithSum(this.datasets, 'month', 'positive, negative');

        } catch (error) {
            console.error(error);
        }
    }
}