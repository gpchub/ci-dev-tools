<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container grid-auto" x-data="{
        input: '',
        size: 300,
        qrcode: null,
        loading: false,

        error: {
            input: '',
            size: '',
        },

        generate() {
            this.$refs.result.innerHTML = '';
            this.error = {
                input: '',
                size: '',
            };

            if (!this.input.trim()) {
                this.error.input = 'Nội dung không để trống';
                return;
            }

            if (this.size < 100) {
                this.error.size = 'Kích thước tối thiểu 100px';
                return;
            }

            if (this.qrcode) {
                this.qrcode.clear();
            }

            this.loading = true;
            this.$refs.result.style.width = this.size + 'px';
            this.$refs.result.style.height = this.size + 'px';

            this.qrcode = new QRCode(this.$refs.result, {
                width : this.size,
                height : this.size
            });

            this.qrcode.makeCode(this.input.trim());
            this.loading = false;
        }
    }">
        <div class="card md:min-h-96 gpc-form">
            <div class="form-group">
                <label>Nội dung qr code</label>
                <textarea x-model="input"></textarea>
                <span class="error-message" x-text="error.input" x-show="error.input" x-cloak></span>
            </div>

            <div class="form-group">
                <label>Kích thước (px)</label>
                <input type="number" x-model="size" min="100"></input>
                <span class="error-message" x-text="error.size" x-show="error.size" x-cloak></span>
            </div>

            <div class="form-group">
                <button :disable="loading" @click="generate">Tạo QR Code</button>
            </div>
        </div>

        <div class="card min-h-96">
            <div id="qrcode" x-ref="result"></div>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script src="<?= site_url('js/qrcode.min.js') ?>"></script>

<?= $this->endSection() ?>