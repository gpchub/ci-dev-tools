<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" integrity="sha512-ZwR1/gSZM3ai6vCdI+LVF1zSq/5HznD3ZSTk7kajkaj4D292NLuduDCO1c/NT8Id+jE58KYLKT7hXnbtryGmMg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    document.addEventListener('alpine:init', () => {
		Alpine.data('app', () => ({
            transactions: [],

            init() {
                const transactionsInDB = localStorage.getItem('gpc-expense-transactions');

                if (transactionsInDB) {
					this.transactions = JSON.parse(transactionsInDB);
				}
            },
        }));
    });

    document.addEventListener('alpine:init', () => {
		Alpine.data('categoryStats', () => ({
            categories: [],
            periodTypes: [
                { label: 'Tháng', value: 'month' },
                { label: 'Năm', value: 'year' },
            ],

            transactionTypes: [
                { label: 'Chi', value: 'chi' },
                { label: 'Thu', value: 'thu' },
            ],

            years: [],

            filter: {
                periodType: 'month',
                month: new Date().toJSON().slice(0, 10),
                year: new Date().getFullYear(),
                type: 'chi',
            },

            chart: null,

            init() {
                const categoriesInDB = localStorage.getItem('gpc-expense-categories');

				if (categoriesInDB) {
					this.categories = JSON.parse(categoriesInDB);
				}

                let minYear = 2023;
                let maxYear = new Date().getFullYear();
                this.years = [...Array(maxYear - minYear + 1).keys()].map(x => ({
                    label: maxYear - x,
                    value: maxYear - x,
                }));

                this.drawChart();

                this.$watch('filter', (value, oldValue) => {
                    this.drawChart();
                });
            },

            drawChart() {
                let categories = this.categories.filter(x => {
                    if (this.filter.type == 'chi') {
                        return x.isChi;
                    }

                    return x.isThu;
                });

                let transactions = this.transactions.filter(x => {
                    let filterByTime = false;

                    if (this.filter.periodType === 'year') {
                        let year = new Date(x.date).getFullYear();
                        filterByTime = year == this.filter.year;
                    } else {
                        filterByTime = isSameMonth(new Date(this.filter.month), new Date(x.date));
                    }

                    return filterByTime && x.type == this.filter.type;
                });

                categories = categories.map(cat => {
                    const sum = transactions.reduce(
                        (accumulator, record) => cat.id == record.category ?
                            accumulator + parseInt(record.amount) :
                            accumulator
                        , 0
                    );

                    return {
                        title: cat.title,
                        amount: sum,
                    };
                });

                if (this.chart) {
                    this.chart.destroy();
                }

                this.chart = new Chart(
                    this.$refs.chart,
                    {
                        type: 'doughnut',
                        data: {
                            labels: categories.map(row => row.title),
                            datasets: [
                                {
                                    label: 'Sum',
                                    data: categories.map(row => row.amount)
                                }
                            ]
                        }
                    }
                );
            },
		})); // Alpine.data
	}); // alpine:init

    document.addEventListener('alpine:init', () => {
		Alpine.data('timelineStats', () => ({
            filter: {
                periodType: 'month',
                month: new Date().toJSON().slice(0, 10),
                year: new Date().getFullYear(),
                type: 'chi',
            },

            periodTypes: [
                { label: 'Tháng', value: 'month' },
                { label: 'Năm', value: 'year' },
            ],

            transactionTypes: [
                { label: 'Chi', value: 'chi' },
                { label: 'Thu', value: 'thu' },
            ],

            years: [],

            chart: null,

            init() {
                let minYear = 2023;
                let maxYear = new Date().getFullYear();
                this.years = [...Array(maxYear - minYear + 1).keys()].map(x => ({
                    label: maxYear - x,
                    value: maxYear - x,
                }));

                this.drawChart();

                this.$watch('filter', (value, oldValue) => {
                    this.drawChart();
                });
            },

            drawChart() {
                let transactions = this.transactions.filter(x => {
                    let filterByTime = false;

                    if (this.filter.periodType === 'year') {
                        let year = new Date(x.date).getFullYear();
                        filterByTime = year == this.filter.year;
                    } else {
                        filterByTime = isSameMonth(new Date(this.filter.month), new Date(x.date));
                    }

                    return filterByTime && x.type == this.filter.type;
                });

                let chartMaxItem = this.filter.periodType === 'year' ? 12 : getDaysInMonth(this.filter.month);

                let chartData = [...Array(chartMaxItem).keys()].map(x => {
                    const sum = transactions.reduce(
                        (accumulator, record) => {
                            if (this.filter.periodType === 'year') {
                                let recordMonth = new Date(record.date).getMonth();
                                if (recordMonth == x) {
                                    return accumulator + parseInt(record.amount);
                                } else {
                                    return accumulator;
                                }
                            }

                            let recordDate = new Date(record.date).getDate();
                            if (recordDate == x + 1) {
                                return accumulator + parseInt(record.amount);
                            } else {
                                return accumulator;
                            }
                        }
                        , 0
                    );

                    return {
                        title: x + 1,
                        amount: sum,
                    };
                });

                if (this.chart) {
                    this.chart.destroy();
                }

                this.chart = new Chart(
                    this.$refs.chart,
                    {
                        type: 'bar',
                        options: {
                            indexAxis: 'y',
                            maintainAspectRatio: false,
                        },
                        data: {
                            labels: chartData.map(row => row.title),
                            datasets: [
                                {
                                    label: 'Sum',
                                    data: chartData.map(row => row.amount)
                                }
                            ]
                        }
                    }
                );

            }
        }));
    });
</script>