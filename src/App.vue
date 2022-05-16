<template>
    <div>
        <FirstChart v-if="firstchartdata.isloaded" :chartdata="firstchartdata" @change-date="updateSecondChart" />

        <SecondChart v-if="secondchartdata.isloaded" :chartdata="secondchartdata" />
    </div>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import FirstChart from './components/FirstChart.vue';
import SecondChart from './components/SecondChart.vue';

export default {
    data() {
        return {
            axios_options: {
                base_url: "https://iapitest.eva.guru",
                config: {},
                body: {
                    marketplace: "Amazon.com",
                    sellerId: "A2AYEFBRNOKNF9"
                }
            },
            firstchartdata: {
                isloaded: false,
                data: {}
            },
            secondchartdata: {
                isloaded: false,
                data: {}
            }
        };
    },
    created() {
        this.login(() => {
            this.setAxiosConfig();
            this.initFirstChart();
            this.initSecondChart(1, 2022);
        });
    },
    methods: {
        login(callback) {
            const user_data = {
                email: "homework@eva.guru",
                password: "Homeworkeva1**"
            };

            axios.post(`${this.axios_options.base_url}/user/auth`, user_data)
                .then(response => {
                    this.updateToken(response.data.Data.token);
                    callback && callback();
                });
        },
        updateToken(new_token) {
            this.$store.commit("setToken", new_token);
        },
        setAxiosConfig() {
            this.axios_options.config = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            };
        },
        initFirstChart() {
            axios.post(`${this.axios_options.base_url}/data/sales-finances/`, this.axios_options.body, this.axios_options.config)
                .then(response => {
                    this.firstchartdata.isloaded = true;
                    this.firstchartdata.data = response.data.Data;
                });
        },
        initSecondChart(month, year) {
            this.axios_options.body.date = {
                month,
                year
            }

            axios.post(`${this.axios_options.base_url}/data/sales-expense-by-request-date/`, this.axios_options.body, this.axios_options.config)
                .then(response => {
                    this.secondchartdata.isloaded = true;
                    this.secondchartdata.data = response.data.Data;
                });
        },
        updateSecondChart(data) {
            const splitted_date = data.split("-");
            this.secondchartdata.isloaded = false;
            this.initSecondChart(splitted_date[1], splitted_date[0]);
        }
    },
    computed: {
        ...mapGetters(["token"])
    },
    components: { FirstChart, SecondChart }
}
</script>