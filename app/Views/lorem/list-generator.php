<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container">
        <div class="grid-auto">
            <my-card class="my-card" data-title="Danh sách theo thứ tự">
                <form x-data="serialize">
                    <div class="form-group">
                        <label>Prefix</label>
                        <input type="text" x-model="text">
                    </div>
                    <div class="form-group">
                        <label>Count</label>
                        <input type="text" x-model="count">
                    </div>
                    <div class="form-group">
                        <label>Join</label>
                        <select x-model="join">
                            <template x-for="(value, key) in separators">
                                <option :value="value" x-text="key" :selected="value == join"></option>
                            </template>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Result</label>
                        <my-code-block x-text="result"></my-code-block>
                    </div>
                    <div class="form-group">
                        <button @click.prevent="submit">Thực hiện</button>
                    </div>
                </form>
            </my-card>
            <my-card data-title="Danh sách ngẫu nhiên">
                <form x-data="random">
                    <div class="form-group">
                        <label>Loại danh sách</label>
                        <select x-model="type">
                            <template x-for="(value, key) in listTypes">
                                <option :value="value" x-text="key" :selected="value == type"></option>
                            </template>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Count</label>
                        <input type="text" x-model="count">
                    </div>
                    <div class="form-group">
                        <label>Join</label>
                        <select x-model="join">
                            <template x-for="(value, key) in separators">
                                <option :value="value" x-text="key" :selected="value == join"></option>
                            </template>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Result</label>
                        <my-code-block x-text="result"></my-code-block>
                    </div>
                    <div class="form-group">
                        <button @click.prevent="submit">Thực hiện</button>
                    </div>
                </form>
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
    function separators() {
        return {
            'Dòng': 'line',
            'Khoảng trắng': 'space',
            'Dấu phẩy (,)': ',',
            'Dấu phẩy có khoảng trắng (, )': ', ',
            'Chấm phẩy': ';',
            'Chấm phẩy có khoảng trắng (; )': '; ',
            'Gạch đứng': '|',
            'Gạch đứng có khoảng trắng ( | )': ' | ',
            'Gạch chéo (/)': '/',
            'Gạch chéo có khoảng trắng ( / )': ' / ',
            'Gạch chéo ngược (\\)': '\\',
            'Gạch chéo ngược có khoảng trắng ( \\ )': ' \\ ',
        }
    }

    document.addEventListener('alpine:init', () => {
        Alpine.data('serialize', () => ({
            separators: separators(),
            text: '',
            result: '',
            count: 5,
            join: 'line',

            submit() {
                let num = parseInt(this.count);
                let arr = [ ...Array(num).keys() ].map( i => `${this.text}${(i + 1)}` );
                let join = this.join === 'line' ? '\n' : (this.join === 'space' ? ' ' : this.join);
                this.result = arr.join(join);
            }
        }));

        Alpine.data('random', () => ({
            categories: <?= json_encode($categories) ?>,
            separators: separators(),
            listTypes: {
                'Chuyên mục bài viết': 'category',
                'Danh mục sản phẩm': 'product-category',
                'Sản phẩm': 'product',
                'Bài viết': 'post',
                'Tên người': 'fullname'
            },
            result: '',
            count: 5,
            join: 'line',
            type: 'category',

            submit() {
                let num = parseInt(this.count);
                let random = [];
                switch (this.type) {
                    case 'category':
                        random = this.categories.sort(() => .5 - Math.random()).slice(0, num);
                        break;
                    case 'product-category':
                        random = this.categories.sort(() => .5 - Math.random()).slice(0, num);
                        break;
                    case 'post':
                        random = this.categories.sort(() => .5 - Math.random()).slice(0, num);
                        break;
                    case 'product':
                        for (let i = 0; i < num; i++) {
                            let product = faker.commerce.productName();
                            let price = faker.commerce.price({ min: 90, max: 999, dec: 0 });
                            let percent = faker.number.int({ min: 0, max: 50 });
                            let sale_price = Math.floor((100 - percent) * price / 100);
                            price = price * 1000;
                            sale_price = sale_price * 1000;
                            console.log(product, price, sale_price, percent);
                            let str = sale_price > 0 ? `${product}|${price};${sale_price}` : `${product}|${price}`;
                            random.push(str);
                        }
                        break;
                    case 'fullname':
                        random = this.categories.sort(() => .5 - Math.random()).slice(0, num);
                        break;
                }

                let join = this.join === 'line' ? '\n' : (this.join === 'space' ? ' ' : this.join);
                this.result = random.join(join);
            }
        }))
    })
</script>

<?= $this->endSection() ?>