/*---------- General ---------- */
function formatNumber(number) {
    return new Intl.NumberFormat('vi-VN').format(
        number,
    );
}

function isSunday(date) {
    return new Date(date).getDay() === 0;
}

function isSameMonth(aDate, bDate) {
    return aDate.getMonth() == bDate.getMonth() &&
        aDate.getFullYear() == bDate.getFullYear();
}

function getDaysInMonth (date) {
    date = date instanceof Date ? date : new Date(date);
    if (isNaN(date)) return 0;

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function formatDate(date, weekday = '') {
    if (!date) return '';
    let options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    if (weekday.length > 0) {
        options.weekday = weekday;
    }

    return new Date(date).toLocaleDateString('vi-VN', options);
}

function unmaskNumber(str, thousand = '.') {
    if (!str) return str;
    if (typeof str === "number") return str;
    return str.replaceAll(thousand, '');
}


/*---------- Menu ---------- */
document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', () => ({
        open: false,

        toggle() {
            this.open = ! this.open
        }
    }))
})

/*---------- Masked input ---------- */
document.addEventListener('alpine:init', () => {
    Alpine.data('inputNumber', () => ({
        masked: '',
        raw: '',
        maska: null,
        init() {

            const { Mask } = Maska

            this.maska = new Mask({ mask: "###.###.###.###", reversed: true });

            this.$watch('masked', (value, oldValue) => {
                if (value != oldValue) {
                    this.raw = this.maska.unmasked(value);
                    this.masked = this.maska.masked(value);
                }
            })

            this.$watch('raw', (value, oldValue) => {
                if (value && value != oldValue) {
                    this.masked = this.maska.masked(value.toString());
                }
            })
        }
    }))
})

/*---------- Color picker ---------- */
document.addEventListener('alpine:init', () => {
    Alpine.data('colorPicker', () => ({
        color: '',
        alwan: null,

        init() {
            const input = this.$refs.input;
            const trigger = this.$refs.trigger;

            this.alwan = new Alwan(trigger, {
                color: this.color,
                format: 'hex',
                preset: false,
                swatches: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b", "#ffffff", "#000000"],
                parent: trigger.parentElement,
            });

            this.alwan.on('color', (e) => {
                this.color = e.hex;
            });

            input.addEventListener('focus', () => {
                this.alwan.open();
            });

            this.$watch('color', (value, oldValue) => {
                if (value != oldValue) {
                    this.alwan.setColor(value);
                }
            })
        }
    }))
})

/*---------- Modal Dialog ---------- */
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.modal').forEach((elem) => {
        elem.addEventListener('click', function (e) {
            //button close
            if (e.target.closest('.modal-close') || e.target.classList.contains('modal-close') ) {
                e.preventDefault();
                e.stopPropagation();
                e.target.closest('dialog').close();
                return;
            }

            // button khác
            if (e.target.dataset.dismiss == 'modal') {
                e.preventDefault();
                e.target.closest('dialog').close();
                return;
            }

            /**
             * click outside dialog,
             * <dialog> phải đặt padding:0, border:0
             * nội dung dialog để trong <div class="modal-body"></div>
             * */
            // if(!e.target.closest('.modal-body')) {
            //     e.target.close();
            //     return false;
            // }
        });
    });
});