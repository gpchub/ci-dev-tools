var Vietnamese = {
    weekdays: {
        shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        longhand: [
            "Chá»§ nháº­t",
            "Thá»© hai",
            "Thá»© ba",
            "Thá»© tÆ°",
            "Thá»© nÄƒm",
            "Thá»© sÃ¡u",
            "Thá»© báº£y",
        ],
    },
    months: {
        shorthand: [
            "Th1",
            "Th2",
            "Th3",
            "Th4",
            "Th5",
            "Th6",
            "Th7",
            "Th8",
            "Th9",
            "Th10",
            "Th11",
            "Th12",
        ],
        longhand: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: " Ä‘áº¿n ",
};

document.addEventListener('alpine:init', () => {
    Alpine.data('flatpickr', () => ({
        date: '',

        fp: null,

        init() {
            let element = this.$refs.picker;
            // let locale = document.querySelector('meta[name="lang"]').content;
            let enableTime = element.dataset.enableTime == 1 ? true : false;
            this.date = this.$refs.picker_input.value;

            const datepickerOptions = {
                enableTime: enableTime,
                appendTo: element.parentElement,
                static: true,
                plugins: [new confirmDatePlugin({})], //hiện nút OK để chọn ngày
                wrap: true, // wrap input + icon in a div
                altInput: true,
                altFormat: "d/m/Y",
                dateFormat: "Y-m-d",
                disableMobile: true,
                locale: Vietnamese
            };

            // if (locale == 'vi') {
            //     datepickerOptions.locale = Vietnamese;
            // }

            if (enableTime) {
                datepickerOptions.altFormat = "d/m/Y H:i";
                datepickerOptions.dateFormat = "Y-m-d H:i";
            }

            this.fp = flatpickr(element, datepickerOptions);

            if (typeof window.flatpickrInputs === 'undefined') {
                window.flatpickrInputs = [];
            }
            window.flatpickrInputs.push(this.fp);

            this.fp.config.onChange.push((a, dateStr) => {
                this.date = dateStr;
            });

            this.$watch('date', (newDate) => {
                this.fp.setDate(newDate, true);
            });
        },
    }))
})

document.addEventListener('alpine:init', () => {
    Alpine.data('monthpicker', () => ({
        date: '',

        fp: null,

        init() {
            let element = this.$refs.picker;
            //this.date = this.$refs.picker_input.value;

            const datepickerOptions = {
                static: true,
                altInput: true,
                wrap: true, // wrap input + icon in a div
                locale: Vietnamese,
                disableMobile: true,
                plugins: [
                    new monthSelectPlugin({
                        shorthand: false,
                        dateFormat: "Y-m-d",
                        altFormat: "F / Y"
                    })
                ]
            };

            this.fp = flatpickr(element, datepickerOptions);

            if (typeof window.flatpickrInputs === 'undefined') {
                window.flatpickrInputs = [];
            }
            window.flatpickrInputs.push(this.fp);

            this.fp.config.onChange.push((a, dateStr) => {
                this.date = dateStr;
            });

            this.$watch('date', (newDate) => {
                this.fp.setDate(newDate, true);
                console.log(newDate);
            });
        },
    }))
})