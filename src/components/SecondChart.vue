<template>
    <div id="second-chart" style="width:100%; height:400px;">Test</div>
</template>

<script>
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default {
    data() {
        return {
            data: []
        }
    },
    props: ["chartdata"],
    created() {
        const chart_data = this.chartdata;

        chart_data.data.item.forEach(item => {
            this.data.push({name: item.type, y: item.amount});
        });
    },
    mounted() {
        Highcharts.chart('second-chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Expenses & Refunds'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: this.data
            }]
        });
    }
}
</script>