<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="grid-auto">
            <my-card data-title="Thiết lập">
                <form action="">
                    <div class="form-group">
                        <label>Số class</label>
                        <input type="text" x-model="count">
                    </div>
                    <div class="form-group">
                        <label>Tên biến</label>
                        <input type="text" x-model="variableName">
                    </div>
                    <div class="form-group">
                        <label>Thuộc tính</label>
                        <div>
                            <label><input type="checkbox" x-model="properties" value="margin"> margin</label>
                            <label><input type="checkbox" x-model="properties" value="padding"> padding</label>
                            <label><input type="checkbox" x-model="properties" value="gap"> gap</label>
                            <label><input type="checkbox" x-model="properties" value="column_gap"> column-gap</label>
                            <label><input type="checkbox" x-model="properties" value="row_gap"> row-gap</label>
                            <label><input type="checkbox" x-model="properties" value="space_between"> space between</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Breakpoint md (tablet)</label>
                       <input type="text" x-model="breakpoints.md">
                    </div>
                    <div class="form-group">
                        <label>Breakpoint lg (desktop)</label>
                       <input type="text" x-model="breakpoints.lg">
                    </div>
                    <div class="form-group">
                        <button @click.prevent="generate">Tạo code</button>
                    </div>
                </form>
            </my-card>

            <my-card>
                <div class="mb-3">
                    <my-code-block x-text="root"></my-code-block>
                    <template x-if="root">
                        <div class="help-text">
                            <p>5 giá trị đầu tham khảo theo Bootstrap.</p>
                            <p>Điều chỉnh giá trị cho các biến trong phần root tuỳ theo nhu cầu.</p>
                        </div>
                    </template>
                </div>
                <div>
                    <my-code-block x-text="result" class="max-h-128"></my-code-block>
                </div>
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
            count: 5,
            variableName: '--spacer',
            properties: ['margin', 'padding', 'gap', 'space_between'],
            result: '',
            root: '',

            breakpoints: {
                md: '768px',
                lg: '992px',
            },

            generate(key) {

                const mediaQuery = [
                    { name: '', value: '' },
                    { name: 'md', value: 'min-width: ' + this.breakpoints.md },
                    { name: 'lg', value: 'min-width: ' + this.breakpoints.lg },
                ];

                let result = mediaQuery.map(x => {
                    return this.generateSpacing(x).join('\n');
                });

                this.result = result.join('\n');
                this.root = this.generateRoot();
            },

            generateRoot() {
                let result = [];
                let spacer = 1;

                let bootstrapSpacers = [
                    0,
                    spacer * .25,
                    spacer * .5,
                    spacer,
                    spacer * 1.5,
                    spacer * 3,
                ];

                result.push(':root {');
                for (let i = 1; i <= this.count; i++) {
                    if (i <= 5) {
                        result.push(`\t${this.variableName}-${i}: ${bootstrapSpacers[i]}rem;`);
                    } else {
                        result.push(`\t${this.variableName}-${i}: ${spacer * i}rem;`);
                    }
                }
                result.push('}');

                return result.join("\n");
            },

            generateSpacing(breakpoint) {
                let result = [];
                const _this = this;

                const selectors = {
                    margin: [
                        { name: 'm', value: 'margin' },
                        { name: 'mt', value: 'margin-top' },
                        { name: 'mb', value: 'margin-bottom' },
                        { name: 'ml', value: 'margin-left' },
                        { name: 'mr', value: 'margin-right' },
                        // { name: 'mx', value: 'margin-left, margin-right' },
                        // { name: 'my', value: 'margin-top, margin-bottom' },
                    ],
                    padding: [
                        { name: 'p', value: 'padding' },
                        { name: 'pt', value: 'padding-top' },
                        { name: 'pb', value: 'padding-bottom' },
                        { name: 'pl', value: 'padding-left' },
                        { name: 'pr', value: 'padding-right' },
                        // { name: 'px', value: 'padding-left, padding-right' },
                        // { name: 'py', value: 'padding-top, padding-bottom' },
                    ],
                    gap: [
                        { name: 'gap', value: 'gap' },
                    ],
                    column_gap: [
                        { name: 'col-gap', value: 'column-gap' },
                    ],
                    row_gap: [
                        { name: 'row-gap', value: 'row-gap' },
                    ],
                    space_between: [
                        { name: 'space-x', value: '' },
                        { name: 'space-y', value: '' },
                    ]
                };

                let selectedSelectors = [];
                this.properties.forEach(x => {
                    if (selectors.hasOwnProperty(x)) {
                        selectedSelectors.push(...selectors[x]);
                    }
                })

                if (breakpoint.name) {
                    result.push(`@media (${breakpoint.value}) {`);
                }

                selectedSelectors.forEach(selector => {
                    for (let i = 0; i <= this.count; i++) {
                        className = breakpoint.name ?
                            `\t.${breakpoint.name}\\:${selector.name}-${i}` :
                            `.${selector.name}-${i}`;

                        if (selector.name === 'space-x' || selector.name === 'space-y') {
                            className = `${className}>:not([hidden])~:not([hidden])`;
                            if (selector.name === 'space-x') {
                                result.push(`${className} { margin-left: var(${_this.variableName}-${i}) }`);
                            } else {
                                result.push(`${className} { margin-top: var(${_this.variableName}-${i}) }`);
                            }
                        } else {
                            /** split theo dấu phẩy vì có trường hợp mx, my = margin-left, margin-right */
                            let parts = selector.value.split(',');
                            let css = `${className} {`;
                            css += parts.map(x => {
                                return i == 0 ?
                                    `${x}: 0` :
                                    `${x}: var(${_this.variableName}-${i})`;
                            }).join('');
                            css += '}';

                            result.push(css);
                        }
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