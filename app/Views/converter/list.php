<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <g-card class="mb-4">
            <div class="form-group flex flex-wrap gap-3 items-center">
                <label>Chuyển đổi từ</label>
                <template x-for="(value, key) in inputTypes" :key="key">
                    <label><input type="radio" x-model="inputType" :checked="key === inputType" :value="key"/> <span x-text="value"></span></label>
                </template>
            </div>
            <div class="form-group flex flex-wrap column-gap-3 items-center">
                <label>Phân cách</label>
                <input type="text" class="w-38" x-model="inputTextSeparator" />
                <div class="help-text w-full">Phân cách theo dòng dùng dấu <code>\n</code></div>
            </div>
            <div class="form-group">
                <textarea x-model="input"></textarea>
            </div>
            <div class="form-group">
                <button @click="submit()">Thực hiện</button>
            </div>
        </g-card>

        <div class="grid-auto" style="--min:400px">
            <g-card>
                <h3 class="card-title">Text</h3>
                <g-code-block x-text="outputText"></g-code-block>
            </g-card>
            <g-card>
                <h3 class="card-title">JSON</h3>
                <g-code-block x-text="outputJson"></g-code-block>
            </g-card>
            <g-card>
                <h3 class="card-title">HTML</h3>
                <g-code-block x-text="outputHTML"></g-code-block>
            </g-card>
            <g-card>
                <h3 class="card-title">PHP</h3>
                <g-code-block x-text="outputPHP"></g-code-block>
            </g-card>

        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>
<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            inputTypes: {
                'text': 'Text',
                'json': 'JSON',
                'html': 'HTML',
                'php': 'PHP'
            },
            inputType: 'text',
            inputTextSeparator: '\n',
            input: '',
            outputText: '',
            outputJson: '',
            outputHTML: '',
            outputPHP: '',
        }));
    })
</script>

<?= $this->endSection() ?>