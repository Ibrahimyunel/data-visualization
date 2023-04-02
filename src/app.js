import 'regenerator-runtime';
import './style/style.css';
import './component/select-chart';
import { ChartOfCovid } from "./chart";

const covObj = new ChartOfCovid();
setTimeout(() => covObj.createChart(), 700);
