/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Visualization from 'zeppelin-vis';
import ColumnselectorTransformation from 'zeppelin-tabledata/columnselector';

import HighCharts from 'highcharts/highcharts'

/**
 * Visualize data using Highcharts basic library
 */

export default class basicLineHighCharts extends Visualization {
  constructor(targetEl, config) {
    super(targetEl, config);
    
    this.columnselectorProps = [
      {
        name: 'name'
      },
      {
        name: 'value'
      },
      {
        name: 'group'
      }
    ];
    
    this.columnselector = new ColumnselectorTransformation(config, this.columnselectorProps);
  };
  
  render(tabledata) {
    // enable pivot using column selector
    var colIdx = [];
    
    for (var idx in tabledata.columns) {
      var col = tabledata.columns[idx];
      if (this.config.name && col.name == this.config.name.name) {
        colIdx[0] = idx;
      }
      if (this.config.value && col.name == this.config.value.name) {
        colIdx[1] = idx;
      }
      if (this.config.group && col.name == this.config.group.name) {
        colIdx[2] = idx;
      }
    }
    
    // push data
    var basicLineData = [];
    for (var rIdx in tabledata.rows) {
      var row = tabledata.rows[rIdx];
      var basicLineRow = [];
      for (var idx in colIdx) {
        basicLineRow[idx] = row[colIdx[idx]];
      }
      basicLineData.push(basicLineRow);
    }
    
    if (!angular.equals(basicLineData, this.basicLineData)) {
      this.basicLine = undefined;
    }
    
    var basicLineDataToJson = JSON.parse(JSON.stringify(basicLineData).replace(/\"/g, ""));
    var xAxisName = this.config.name.name;
    var yAxisName = this.config.value.name;
    
    var chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: xAxisName
        },
        maxPadding: 0.05,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: yAxisName
        },
        lineWidth: 2
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.x}</b>',
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        spline: {
          marker: {
            enable: false
          }
        }
      },
      series: [{
        name: xAxisName,
        data: basicLineDataToJson
      }]
    };
    
    
    if (!this.basicLine) {
      HighCharts.chart(this.targetEl[0].id, chartOptions);
    }
  };
  
  getTransformation() {
    return this.columnselector;
  }
}
