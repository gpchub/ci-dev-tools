<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="card mb-4">
            <div class="form-group">
                <label><b>Lưu ý</b></label>
                <ul>
                    <li>Kiểu chữ lập trình gồm: <code>snake_case</code>, <code>kebab-case</code>, <code>PascalCase</code>, <code>camelCase</code></li>
                    <li>Kiểu chữ lập trình sẽ luôn được xoá khoảng trắng thừa giữa các từ</li>
                </ul>
            </div>
            <div class="form-group">
                <label>Nhập nội dung</label>
                <textarea class="form-control" x-model="input" x-grow></textarea>
            </div>
            <div class="form-group">
                <label><input type="checkbox" x-model="removeVietnameseTones" /> Xoá dấu tiếng Việt</label>
            </div>
            <div class="form-group">
                <label><input type="checkbox" x-model="removeExtraSpaces" /> Xoá khoảng trắng thừa giữa các từ</label>
            </div>

            <div class="form-group">
                <button @click="sentenceCase">Sentence case</button>
                <button @click="titleCase">Title Case</button>
                <button @click="lowerCase">lower case</button>
                <button @click="upperCase">UPPER CASE</button>
                <button @click="snakeCase">snake_case</button>
                <button @click="kebabCase">kebab-case</button>
                <button @click="pascalCase">PascalCase</button>
                <button @click="camelCase">camelCase</button>
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
            removeVietnameseTones: false,
            removeExtraSpaces: false,
            changeToNormalCases: true,

            prepareInput() {
                let str = this.input;

                if (this.removeExtraSpaces) {
                    str = str.replace(/\s+/g, ' ').trim();
                }

                if (this.removeVietnameseTones) {
                    str = this.doRemoveVienameseTones(str);
                }

                if (this.changeToNormalCases) {
                    str = this.doChangeToNormalCases(str);
                }

                return str;
            },

            sentenceCase() {
                this.output = this.prepareInput().replace(/(^\w{1}|[\.?!]\s*\p{L}{1})/giu, (x) => x.toUpperCase());
            },

            titleCase() {
                this.output = this.prepareInput().replace(/(^\w{1}|\s+\p{L}{1})/giu, (x) => x.toUpperCase());
            },

            lowerCase() {
                this.output = this.prepareInput().toLowerCase();
            },

            upperCase() {
                this.output = this.prepareInput().toUpperCase();
            },

            snakeCase() {
                this.kebabCase();
                this.output = this.output.replace(/-/g, '_');
            },

            kebabCase() {
                let str = this.prepareInput().toLowerCase();
                str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|;|“|”|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
                str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
                str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi

                this.output = str;
            },

            pascalCase() {
                this.kebabCase();
                this.output = this.output.replace(/(^\w)|-(\p{L}{1})/gmiu, (match, p1, p2, offset, string) => {
                    return p2 ? p2.toUpperCase() : p1.toUpperCase();
                });
            },

            camelCase() {
                this.kebabCase();
                this.output = this.output.replace(/(^\w)|-(\p{L}{1})/gmiu, (match, p1, p2, offset, string) => {
                    return p2 ? p2.toUpperCase() : p1;
                });
            },

            doChangeToNormalCases(str) {
                /**
                 * Phải đặt kiểm tra pascalCase và camelCase trước
                 * vì pascalCase và camelCase đều là snake_case hoặc kebab-case hợp lệ
                 */
                if (this.isPascalCase(str)) {
                    return str.replace(/([A-Z])/g, " $1").trim();
                }
                if (this.isCamelCase(str)) {
                    return str.replace(/([A-Z])/g, " $1").trim();
                }
                if (this.isSnakeCase(str)) {
                    return str.replace(/_/g, ' ');
                }
                if (this.isKebabCase(str)) {
                    return str.replace(/-/g, ' ');
                }

                return str;
            },

            isSnakeCase(str) {
                const regex = new RegExp(/^(?:[a-zA-Z\d]+_)*[a-zA-Z\d]+$/);
                return regex.test(str);
            },

            isKebabCase(str) {
                const regex = new RegExp(/^(?:[a-zA-Z\d]+-)*[a-zA-Z\d]+$/);
                return regex.test(str);
            },

            isPascalCase(str) {
                const regex = new RegExp(/^(?:[A-Z][a-z\d]+)+$/);
                return regex.test(str);
            },

            isCamelCase(str) {
                const regex = new RegExp(/^(?:[a-z\d]+)(?:[A-Z][a-z\d]+)+$/);
                return regex.test(str);
            },

            doRemoveVienameseTones(str) {
                /**
                 * @see https://int3ractive.com/blog/2019/hai-ung-dung-cua-string-normalize-voi-tieng-viet/
                 * @see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463#37511463
                 */
                str = str
                    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
                    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

                str = str.replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D'); // đổi chữ đ thành d

                return str;
            }
        }));
    });
</script>
<?= $this->endSection() ?>