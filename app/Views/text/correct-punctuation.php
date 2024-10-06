<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<section class="container" x-data="app">
        <div class="card mb-4">
            <div class="form-group">
                <h4 class="mb-2">Nội dung được xử lý</h4>
                <ul>
                    <li>Xoá khoảng trắng trước các dấu câu (. , ? ! ; :), bỏ qua trường hợp dấu chấm trong số (ví dụ 2.0) và dấu 3 chấm</li>
                    <li>Thêm khoảng trắng sau các dấu câu (. , ? ! ; :)</li>
                    <li>Thêm dấu chấm cuối đoạn văn</li>
                    <li>Xoá các khoảng trắng kế nhau</li>
                    <li>Xoá khoảng trắng ở đầu và cuối đoạn văn trong dấu nháy kép <code>" "</code>, ngoặc tròn<code>( )</code>, ngoặc vuông <code>[ ]</code></li>
                    <li>Viết hoa đầu dòng</li>
                    <li>Thêm khoảng trắng và viết hoa sau dấu gạch đầu dòng</li>
                    <li>Viết hoa đầu câu (sau dấu . ? !)</li>
                </ul>
            </div>
            <div class="form-group">
                <label>Nhập nội dung</label>
                <textarea class="form-control" x-model="input" x-grow></textarea>
            </div>

            <div class="form-group">
                <button @click="submit">Thực hiện</button>
            </div>
        </div>
        <div class="card ">
            <my-code-block x-text="output"></my-code-block>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            input: '',
            output: '',

            submit() {
                let text = this.input;

                // TODO: các trường hợp đặc biệt như .v.v.

                // xoá khoảng trắng trước dấu chấm và thêm khoảng trắng sau dấu chấm
                // không lấy dấu chấm mà trước đó là số (vd 2.0) và trước đó là dấu chấm (...)
                text = text.replace(/(?<![\d\.])(\s*)(\.)(?!\.)/g, "$2 ");

                // xoá khoảng trắng trước các dấu ?!,;: và thêm khoảng trắng vào sau
                text = text.replace(/\s*([?!,;:])/g, "$1 ");

                //xoá khoảng trắng trong dấu nháy kép
                text = text.replace(/"((?:\\.|[^"\\])*)"/g, (x, p1) => '"' + p1.trim() + '"');

                //xoá khoảng trắng trong dấu ngoặc tròn
                text = text.replace(/\(((?:\\.|[^)\\])*)\)/g, (x, p1) => '(' + p1.trim() + ')');

                //xoá khoảng trắng trong dấu ngoặc vuông
                text = text.replace(/\[((?:\\.|[^]\\])*)\]/g, (x, p1) => '[' + p1.trim() + ']');

                // xoá khoảng trắng thừa giữa các từ (2 khoảng trắng kế nhau)
                text = text.replace(/\p{Zs}+/gu, ' ');

                // viết hoa sau dấu ?, !
                text = text.replace(/(?<![\d\.])[?!\.]\s+(\p{Ll})/gu, (x) => x.toUpperCase());

                // viết hoa đầu câu
                text = text.replace(/^( *|- *|" *)(\p{Ll})/gmu, (x, p1, p2) => {
                    p1 = p1.trim();
                    if (p1 === '-') {
                        p1 += ' ';
                    }

                    return p1 + p2.toUpperCase();
                });

                // xoá khoảng trắng cuối đoạn văn
                text = text.replace(/( +)$/gm, '');

                // thêm dấu chấm cuối đoạn văn
                text = text.replace(/(?![\.!?:;"])(.)$/gmu, "$1.");

                this.output = text;

            }
        })); // Alpine.data
    }); // alpine:init
</script>
<?= $this->endSection() ?>