<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="card">
            <p>Dùng để tính kích thước khi resize hình.</p>
            <div class="w-1/2">
                <div class="form-group">
                    <label>Tỷ lệ thường gặp</label>
                    <select x-model="ratio">
                        <template x-for="item in ratios">
                            <option :value="item.value" x-text="item.label" :selected="item.value === ratio"></option>
                        </template>
                    </select>
                </div>
                <div class="form-group grid grid-cols-2 gap-3">
                    <div>
                        <label>Ratio Width</label>
                        <input type="number" x-model="ratio_width" @input="onRatioChange" />
                    </div>
                    <div>
                        <label>Ratio Height</label>
                        <input type="number" x-model="ratio_height" @input="onRatioChange" />
                    </div>
                </div>
                <div class="form-group grid grid-cols-2 gap-3">
                    <div>
                        <label>Pixel Width</label>
                        <input type="number" x-model="pixel_width" @input="onPixelWidthChange" />
                    </div>
                    <div>
                        <label>Pixel Height</label>
                        <input type="number" x-model="pixel_height" @input="onPixelHeightChange" />
                    </div>
                </div>
            </div>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            ratios: [
                { value: "4-3", label: "Landscape 4:3", width: 4, height: 3 },
                { value: "3-2", label: "Landscape 3:2", width: 3, height: 2 },
                { value: "16-9", label: "Landscape 16:9", width: 16, height: 9 },
                { value: "2-1", label: "Landscape 2:1", width: 2, height: 1 },
                { value: "3-1", label: "Landscape 3:1", width: 3, height: 1 },
                { value: "4-1", label: "Landscape 4:1", width: 4, height: 1 },
                { value: "3-4", label: "Portrait 3:4", width: 3, height: 4 },
                { value: "2-3", label: "Portrait 2:3", width: 2, height: 3 },
                { value: "1-1", label: "Square 1:1", width: 1, height: 1 },
                { value: "other", label: "Khác", width: 0, height: 0 },
            ],
            ratio: '4-3',

            ratio_width: 4,
            ratio_height: 3,

            pixel_width: '',
            pixel_height: '',

            init() {
                this.$watch('ratio', (value) => {
                    if (value === 'other') {
                        return;
                    }

                    let selectedRatio = this.ratios.find(x => x.value === value);
                    this.ratio_width = selectedRatio.width;
                    this.ratio_height = selectedRatio.height;

                    if (this.pixel_width) {
                        this.pixel_height = this.calculateY(this.ratio_width, this.ratio_height, this.pixel_width);
                    } else if (this.pixel_height) {
                        this.pixel_width = this.calculateX(this.ratio_width, this.ratio_height, this.pixel_height);
                    }
                });
            },

            onRatioChange() {
                let selectedRatio = this.ratios.find(x => x.width == this.ratio_width && x.height == this.ratio_height);

                if (selectedRatio) {
                    this.ratio = selectedRatio.value;
                } else {
                    this.ratio = 'other';
                }

                if (this.pixel_width) {
                    this.pixel_height = this.calculateY(this.ratio_width, this.ratio_height, this.pixel_width);
                } else if (this.pixel_height) {
                    this.pixel_width = this.calculateX(this.ratio_width, this.ratio_height, this.pixel_height);
                }
            },

            onPixelWidthChange() {
                this.pixel_height = this.calculateY(this.ratio_width, this.ratio_height, this.pixel_width);
            },

            onPixelHeightChange() {
                this.pixel_width = this.calculateX(this.ratio_width, this.ratio_height, this.pixel_height);
            },

            calculateX(a, b, y) {
                /** a ÷ b = x ÷ y => x = a * y ÷ b */
                let x = parseInt(a) * parseInt(y) / parseInt(b);
                return Math.round(x * 100) / 100; // làm tròn 2 chữ số
            },

            calculateY(a, b, x) {
                /** a ÷ b = x ÷ y => y = b * x ÷ a */
                let y = parseInt(b) * parseInt(x) / parseInt(a);
                return Math.round(y * 100) / 100; // làm tròn 2 chữ số
            }

        })); // Alpine.data
    }); // alpine:init
</script>
<?= $this->endSection() ?>