<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <my-card>
            <h2 class="text-center">Chuyển đổi từ</h2>
            <div class="flex flex-wrap gap-3 items-center justify-center">
                <template x-for="(value, key) in startFroms" :key="key">
                    <label><input type="radio" value="key"/> <span x-text="value"></span></label>
                </template>
            </div>
        </my-card>

        <div class="content">
            <my-card title="Text" :class="{'order-first': startFrom == 'text'}">
                <pre x-text="result"></pre>
            </my-card>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script type="module">
    import { faker } from '<?= site_url('js/fakerjs/index.js') ?>';
    window.faker = faker;

</script>

<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            startFroms: {
                'text': 'Text',
                'json': 'JSON',
                'html': 'HTML',
                'php': 'PHP'
            },
            startFrom: 'text',

            result: '',

            setStartFrom(key) {
                this.startFrom = key;

                const mediaQuery = [
                    { name: '', value: '' },
                    { name: 'md', value: 'min-width: 768px' },
                    { name: 'lg', value: 'min-width: 992px' },
                    // { name: 'xl', value: 'min-width: 1400px' },
                ];

                let result = mediaQuery.map(x => {
                    return this.generateSpacing(x).join('\n');
                });

                this.result = result.join('\n');
            },

            generateSpacing(breakpoint) {
                let result = [];
                const selectors = [
                    { name: 'm', value: 'margin' },
                    { name: 'mt', value: 'margin-top' },
                    { name: 'mb', value: 'margin-bottom' },
                    { name: 'ml', value: 'margin-left' },
                    { name: 'mr', value: 'margin-right' },
                    // { name: 'mx', value: 'margin-left, margin-right' },
                    // { name: 'my', value: 'margin-top, margin-bottom' },
                    { name: 'p', value: 'padding' },
                    { name: 'pt', value: 'padding-top' },
                    { name: 'pb', value: 'padding-bottom' },
                    { name: 'pl', value: 'padding-left' },
                    { name: 'pr', value: 'padding-right' },
                    // { name: 'px', value: 'padding-left, padding-right' },
                    // { name: 'py', value: 'padding-top, padding-bottom' },
                ];

                if (breakpoint.name) {
                    result.push(`@media (${breakpoint.value}) {`);
                }

                selectors.forEach(selector => {
                    for (let i = 0; i <= 5; i++) {
                        className = breakpoint.name ? `\t.${selector.name}-${breakpoint.name}-${i}` : `.${selector.name}-${i}`;
                        let parts = selector.value.split(',');
                        let css = `${className}: {`;
                        css += parts.map(x => {
                            return `${x}: var(--spacer: ${i});`;
                        }).join('');
                        css += '}';
                        result.push(css);
                    }
                });

                if (breakpoint.name) {
                    result.push(`}`);
                }

                return result;
            }
        }));
    })
</script>

<?= $this->endSection() ?>