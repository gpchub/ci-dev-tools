<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="card mb-3">
            <form class="gpc-form flex justify-center gap-3">
                <div class="form-group">
                    <label>px</label>
                    <input type="number" class="w-52" x-model="px" />
                </div>
                <div class="form-group">
                    <label>rem</label>
                    <input type="number" class="w-52" x-model="rem" />
                </div>
                <div class="form-group">
                    <label>tailwind class</label>
                    <input type="number" class="w-52" x-model="tailwind" />
                    <span class="error-message" x-show="!tailwind_classes.includes(tailwind)">class chưa tồn tại</span>
                </div>
            </form>
            <div class="text-center help-text mt-3">Tính theo font size mặc định của browser là 1rem = 16px</div>
        </div>

        <div class="card">
            <h3>Css Width & Height</h3>
            <my-code-block x-text="css"></my-code-block>
        </h3>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            px: 16,
            rem: 1,
            tailwind: 4,
            tailwind_classes: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96],
            css: '',

            conversion_table: [],

            init() {
                this.generateCss();

                this.$watch('px', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.rem = this.px / 16;
                        this.tailwind = this.px / 4;
                        this.generateCss();
                    }
                } );

                this.$watch('rem', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.px = this.rem * 16;
                        this.tailwind = this.rem * 4;
                        this.generateCss();
                    }
                } );

                this.$watch('tailwind', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.px = this.tailwind * 4;
                        this.rem = this.tailwind / 4;
                        this.generateCss();
                    }
                } );
            },

            generateCss() {
                let breakpoints = {
                    md: 768,
                    lg: 992,
                }

                let selectors = {
                    'w': 'width',
                    'h': 'height',
                    'min-w': 'min-width',
                    'min-h': 'min-height',
                    'max-w': 'max-width',
                    'max-h': 'max-height',
                };

                let output = [];
                let css = [];

                for (const item in selectors) {
                    css.push(this.createCssRule(item, selectors[item], this.tailwind));
                }

                output.push(css.join("\n"));

                for (const bp in breakpoints) {
                    css = [`@media (min-width: ${breakpoints[bp]}px) {`];

                    for (const item in selectors) {
                        css.push("\t" + this.createCssRule(item, selectors[item], this.tailwind, bp));
                    }

                    css.push('}');
                    output.push(css.join("\n"));
                }

                this.css = output.join("\n\n");
            },

            createCssRule(selector, property, number, breakpoint = '') {
                let suffix = number.toString().replace('.', '\\.');
                selector = `${selector}-${suffix}`;
                if (breakpoint) {
                    selector = `${breakpoint}\\:${selector}`;
                }
                const px = number * 4;
                const rem = number / 4;

                return `.${selector} { ${property}: ${rem}rem; /* ${px}px */ }\n`;
            }

        }));
    })
</script>

<?= $this->endSection() ?>