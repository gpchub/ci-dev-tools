<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<section class="container" x-data="app">
        <div class="card mb-4">
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

                this.output = text;

            }
        })); // Alpine.data
    }); // alpine:init
</script>
<?= $this->endSection() ?>