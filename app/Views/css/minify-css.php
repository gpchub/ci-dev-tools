<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="grid-auto">
            <g-card>
                <g-card-title>Input</g-card-title>
                <form action="">
                    <div class="form-group">
                        <label>Nhập CSS Code</label>
                        <textarea x-model="input" rows="20"></textarea>
                    </div>

                    <div class="form-group">
                        <button @click.prevent="await generate()">Tạo code</button>
                    </div>
                </form>
            </g-card>

            <g-card>
                <div>
                    <g-code-block x-text="result"></g-code-block>
                </div>
            </g-card>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            result: '',
            input: '',

            async generate() {
                const response = await fetch("<?= url_to('css-tools.minify-css.post') ?>", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({ input: this.input })
                });

                const data = await response.json();
                this.result = data.output;
            },
        }));
    })
</script>

<?= $this->endSection() ?>