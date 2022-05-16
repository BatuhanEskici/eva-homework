<template>
    <div id="first-chart" style="width:100%; height:400px;"></div>
</template>

<script>
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default {
    data() {
        return {
            series: [],
            categories: []
        }
    },
    props: ["chartdata"],
    created() {
        const chart_data = this.chartdata;

        const chart_info = {
            reimbursement: [],
            totalSales: [],
            refund: [],
            totalExpenses: [],
            itemQuantity: [],
            date: []
        };

        chart_data.data.item.forEach(item => {
            Array.from(Object.keys(item)).forEach(key => {
                chart_info[key] && chart_info[key].push(item[key]);
            });
        });

        this.series = [
            {
                name: "Reimbursement",
                data: chart_info.reimbursement
            },
            {
                name: "Total Sales",
                data: chart_info.totalSales
            },
            {
                name: 'Total Refund',
                data: chart_info.refund
            },
            {
                name: 'Total Expense',
                data: chart_info.totalExpenses
            },
            {
                name: 'Quantity',
                data: chart_info.itemQuantity
            },
        ];

        this.categories = chart_info.date;
    },
    mounted() {
        Highcharts.chart('first-chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Sales & Finance'
            },
            xAxis: {
                categories: this.categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Amount ($)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    events: {
                        click: (event) => {
                            this.$emit('change-date', event.point.category);
                        }
                    }
                }
            },
            series: this.series
        });
    }
}
</script>