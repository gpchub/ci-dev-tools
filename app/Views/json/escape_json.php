<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container grid-auto" x-data="app">
        <div class="card">
            <div class="form-group">
                <label>Nhập JSON cần escape hoặc unescape</label>
                <textarea id="input" x-model="input" class="form-control" rows="10"></textarea>
                <div class="help-text">
                    <p>JSON hợp lệ khi key đặt trong dấu nháy kép, giá trị dạng chuỗi phải đặt trong dấu nháy kép, ví dụ <code>{"name":"John"}</code> hoặc <code>{"age":30}</code></p>
                    <p>Nếu JSON không hợp lệ (ví dụ copy từ Javascript object) thì dùng extension <a href="https://marketplace.visualstudio.com/items?itemName=teddylun.json-utils" target="_blank">JSON Utils</a> trong VS Code để sửa lại.</p>
                </div>
                <span x-cloak x-show="inputError" class="error-message" x-text="inputError"></span>
            </div>
            <div class="form-group space-x-1">
                <button @click="escape">Escape</button>
                <button @click="unescape">Unescape</button>
            </div>
        </div>

        <div class="card">
            <h3 class="mb-2">Kết quả</h3>
            <my-code-block x-text="output" class="h-96"></my-code-block>
        </div>

    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            input: '',
            output: '',
            inputError: '',

            escape() {
                if(!this.input) {
                    this.inputError = 'Vui lòng nhập dữ liệu';
                    return;
                }

                try {
                    // các bước thực hiện:
                    // JSON.parse(input) --> chuyển đổi JSON input thành Object
                    // JSON.stringify(object) lần 1 --> chuyển đổi Object thành chuỗi JSON dạng minify
                    // JSON.stringify(object) lần 2 --> chuyển đổi chuỗi JSON ở lần 1 thành chuỗi JSON có escape
                    // replace(/^"(.*)"$/, '$1') --> xóa dấu ngoặc kép ở 2 đầu chuỗi JSON

                    this.output = JSON.stringify(JSON.stringify(JSON.parse(this.input))).replace(/^"(.*)"$/, '$1');
                } catch (e) {
                    this.inputError = 'Dữ liệu không phải JSON';
                    return;
                }
            },

            unescape() {
                if(!this.input) {
                    this.inputError = 'Vui lòng nhập dữ liệu';
                    return;
                }

                try {
                    // các bước thực hiện:
                    // unEscapeJavaScript --> unescape chuỗi JSON có escape
                    // JSON.parse(input) --> chuyển đổi JSON input thành Object
                    // JSON.stringify(object) --> chuyển đổi Object thành chuỗi JSON được định dạng đẹp

                    this.output = JSON.stringify(JSON.parse(this.unEscapeJavaScript(this.input)), null, 2);
                } catch (e) {
                    this.inputError = 'Dữ liệu không phải JSON';
                    return;
                }
            },

            unEscapeJavaScript(t) {
                return t.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\'/g, "'").replace(/\\\"/g, '"').replace(/\\&/g, "&").replace(/\\\\/g, "\\").replace(/\\t/g, "\t").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\x2F/g, "/").replace(/\\x3C/g, "<").replace(/\\x3E/g, ">")
            },

        })); // Alpine.data
    }); // alpine:init
</script>

<?= $this->endSection() ?>