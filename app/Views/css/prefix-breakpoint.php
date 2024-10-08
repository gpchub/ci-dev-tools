<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="grid-auto">
            <g-card>
                <form action="">
                    <div class="form-group">
                        <label>CSS Code</label>
                        <textarea x-model="input" rows="17"></textarea>
                    </div>

                    <div class="form-group">
                        <button @click.prevent="generate">Tạo code</button>
                    </div>
                </form>
            </g-card>

            <g-card>
                <div>
                    <g-code-block x-text="result" class="max-h-128"></g-code-block>
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
            hasMediaQuery: true,

            generate() {
                const regex = /.(.*)\s?{/gm;

                const mdsubst = this.hasMediaQuery ? `\t.md\\:$1{` : `.md\\:$1{`;
                const lgsubst = this.hasMediaQuery ? `\t.lg\\:$1{` : `.lg\\:$1{`;

                let md = this.input.replace(regex, mdsubst);
                let lg = this.input.replace(regex, lgsubst);

                if (this.hasMediaQuery) {
                    md = `@media (min-width: 768px) {\n${md}\n}`;
                    lg = `@media (min-width: 992px) {\n${lg}\n}`;
                }

                this.result = [this.input, md, lg].join("\n\n");
            },
        }));
    })
</script>

<?= $this->endSection() ?>