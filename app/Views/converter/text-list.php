<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <g-card class="mb-4">
            <div class="grid-auto mb-3">
                <fieldset>
                    <legend>Input</legend>
                    <div class="form-grid">
                        <label>Phân cách</label>
                        <div>
                            <input type="text" x-model="inputTextSeparator" />
                            <div class="help-text w-full">Phân cách theo dòng dùng dấu <code>\n</code></div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Output</legend>
                    <div class="form-grid">
                        <label>Phân cách</label>
                        <div>
                            <input type="text" x-model="outputTextSeparator" />
                            <div class="help-text w-full">Phân cách theo dòng dùng dấu <code>\n</code></div>
                        </div>

                        <label class="col-span-full"><input type="checkbox" x-model="skipEmpty"> Bỏ qua chuỗi rỗng</label>
                        <label class="col-span-full"><input type="checkbox" x-model="wrapQuote"> Thêm nháy kép</label>
                    </div>
                </fieldset>
            </div>

            <div class="mb-2">
                <label>Nội dung</label>
                <textarea x-model="input"></textarea>
            </div>

            <button @click="submit()">Thực hiện</button>
        </g-card>

        <g-card>
            <h3 class="card-title">Kết quả</h3>
            <g-code-block x-text="output"></g-code-block>
        </g-card>

    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>
<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            inputTextSeparator: "\\n",
            input: '',
            outputTextSeparator: ", ",
            output: '',
            skipEmpty: true,
            wrapQuote: false,

            submit()
            {
                inputArray = this.textToArray(this.input, this.inputTextSeparator, this.skipEmpty);
                this.output = this.arrayToText(inputArray, this.outputTextSeparator, this.wrapQuote);
            },

            textToArray(text, separator, skipEmpty = false)
            {
                separator = separator.replaceAll("\\n", "\n");
                let array = text.split(separator).map(item => item.trim());
                return skipEmpty ? array.filter(item => item) : array;
            },

            arrayToText(array, separator, quote = false) {
                separator = separator.replaceAll("\\n", "\n");
                array = quote ? array.map(item => `"${item}"`) : array;
                return array.join(separator);
            },
        }))
    })
</script>

<?= $this->endSection() ?>