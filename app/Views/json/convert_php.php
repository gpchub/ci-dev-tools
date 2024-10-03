<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <my-card class="mb-4">
            <label>Chọn loại input</label>
            <div class="flex flex-wrap gap-3">
                <label><input type="radio" value="json" x-model="type" checked> JSON</label>
                <label><input type="radio" value="php" x-model="type"> PHP </label>
                <label><input type="radio" value="sphp" x-model="type"> Serialized PHP </label>
            </div>
            <div class="form-group">
                <textarea id="input" x-model="input" class="form-control" rows="10"></textarea>
                <span x-cloak x-show="inputError" class="error-message" x-text="inputError"></span>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="await submit()">Thực hiện</button>
            </div>

        </my-card>

        <div class="card grid-auto">
            <section class="mb-4">
                <h3 x-text="label1" class="mb-2"></h3>
                <my-code-block x-text="output1" class="max-h-96"></my-code-block>
            </section>

            <section>
                <h3 x-text="label2" class="mb-2"></h3>
                <my-code-block x-text="output2" class="max-h-96"></my-code-block>
            </section>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script src="https://unpkg.com/prettier@3.3.3/standalone.js"></script>
<script src="https://unpkg.com/@prettier/plugin-php/standalone.js"></script>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            input: '',
            output1: '',
            output2: '',
            label1: 'PHP',
            label2: 'Serialized PHP',
            type: 'json',

            inputError: '',

            init() {
                this.$watch('type', (value) => {
                    this.label1 = {
                        'json': 'PHP',
                        'php': 'JSON',
                        'sphp': 'JSON',
                    }[value];

                    this.label2 = {
                        'json': 'Serialized PHP',
                        'php': 'Serialized PHP',
                        'sphp': 'PHP',
                    }[value];
                });
            },

            async submit() {
                const _this = this;
                let { input, type } = this;
                this.inputError = '';

                input = input.trim();

                if(!input) {
                    this.inputError = 'Vui lòng nhập dữ liệu';
                    return;
                }

                switch (type) {
                    case 'json':
                        await this.handleJsonToPhp(input);
                        break;
                    case 'php':
                        await this.handlePhpToJson(input);
                        break;
                    case 'sphp':
                        await this.handleSerializedPhpToJson(input);
                        break;
                }
            },

            async handleJsonToPhp(input) {
                const json = input;

                const response = await fetch("<?= url_to('json.json-php') ?>", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({ input: this.input })
                });

                const data = await response.json();
                if (data.error) {
                    this.inputError = data.messages.error;
                } else {
                    this.output1 = await this.formatPhp(data.php);
                    this.output2 = data.serialized_php;
                }
            },

            async handlePhpToJson(input) {
                const php = input;

                const response = await fetch("<?= url_to('json.php-json') ?>", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({ input: this.input })
                });

                const data = await response.json();
                this.output1 = data.json;
                this.output2 = data.serialized_php;
            },

            async handleSerializedPhpToJson(input) {
                const php = input;

                const response = await fetch("<?= url_to('json.sphp-json') ?>", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({ input: this.input })
                });

                const data = await response.json();
                this.output1 = data.json;
                this.output2 = await this.formatPhp(data.php);
            },

            async formatPhp(code) {
                return await prettier.format(code, {
                    plugins: prettierPlugins,
                    parser: "php"
                });
            },
        })); // Alpine.data
    }); // alpine:init
</script>
<?= $this->endSection() ?>