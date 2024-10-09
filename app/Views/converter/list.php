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
                        <label>Định dạng</label>
                        <div class="flex flex-wrap gap-3">
                            <template x-for="(value, key) in inputTypes" :key="key">
                                <label><input type="radio" x-model="inputType" :checked="key === inputType" :value="key"/> <span x-text="value"></span></label>
                            </template>
                        </div>

                        <label x-show="inputType == 'text'">Phân cách</label>
                        <div x-show="inputType == 'text'">
                            <input type="text" x-model="inputTextSeparator" />
                            <div class="help-text w-full">Phân cách theo dòng dùng dấu <code>\n</code></div>
                        </div>

                        <label x-show="inputType == 'html'" x-cloak>Thẻ</label>
                        <select x-model="inputHTMLTag" x-show="inputType == 'html'" x-cloak>
                            <option value="ul">ul</option>
                            <option value="ol">ol</option>
                            <option value="select">select</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Output</legend>
                    <div class="form-grid">
                        <label>Định dạng</label>
                        <div class="flex flex-wrap gap-3">
                            <template x-for="(value, key) in outputTypes" :key="key">
                                <label><input type="radio" x-model="outputType" :checked="key === outputType" :value="key"/> <span x-text="value"></span></label>
                            </template>
                        </div>

                        <label x-show="outputType == 'text'">Phân cách</label>
                        <div x-show="outputType == 'text'">
                            <input type="text" x-model="outputTextSeparator" />
                            <div class="help-text w-full">Phân cách theo dòng dùng dấu <code>\n</code></div>
                        </div>

                        <label x-show="outputType == 'html'" x-cloak>Thẻ</label>
                        <select x-model="outputHTMLTag" x-show="outputType == 'html'" x-cloak>
                            <option value="ul">ul</option>
                            <option value="ol">ol</option>
                            <option value="select">select</option>
                            <option value="p">p</option>
                            <option value="div">div</option>
                            <option value="span">span</option>
                        </select>

                        <label class="col-span-full"><input type="checkbox" x-model="skipEmpty"> Bỏ qua chuỗi rỗng</label>
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
            inputTypes: {
                'text': 'Text',
                'html': 'HTML',
            },
            inputType: 'text',
            inputTextSeparator: "\\n",
            inputHTMLTag: 'ul',
            input: '',

            outputTypes: {
                'text': 'Text',
                'html': 'HTML',
            },
            outputType: 'text',
            outputTextSeparator: ",",
            outputHTMLTag: 'ul',
            output: '',
            skipEmpty: true,

            submit()
            {
                let inputArray = [];

                switch (this.inputType) {
                    case 'text':
                        inputArray = this.textToArray(this.input, this.inputTextSeparator, this.skipEmpty);
                        break;
                    case 'html':
                        inputArray = this.htmlToArray(this.input, this.inputHTMLTag, this.skipEmpty);
                        break;
                }

                this.output = this.outputType === 'text' ?
                    this.arrayToText(inputArray, this.outputTextSeparator) :
                    this.arrayToHtml(inputArray, this.outputHTMLTag);
            },

            textToArray(text, separator, skipEmpty = false)
            {
                separator = separator.replaceAll("\\n", "\n");
                let array = text.split(separator).map(item => item.trim());
                return skipEmpty ? array.filter(item => item) : array;
            },

            htmlToArray(html, tag, skipEmpty = false)
            {
                let itemTag = this.isListTag(tag) ? 'li' : 'option';
                let regex = new RegExp(`<${itemTag}>(.*?)</${itemTag}>`, 'gm');
                let matches = html.matchAll(regex);

                return skipEmpty ? Array.from(matches).map(item => item[1]).filter(item => item) : Array.from(matches).map(item => item[1]);
            },

            arrayToText(array, separator) {
                separator = separator.replaceAll("\\n", "\n");
                return array.join(separator);
            },

            arrayToHtml(array, tag) {
                let itemTag = this.isListTag(tag) ? 'li' : this.isSelectTag(tag) ? 'option' : tag;
                let hasChildren = this.isListTag(tag) || this.isSelectTag(tag);
                let indent = hasChildren ? '\t' : '';
                let html = array.map(item => `${indent}<${itemTag}>${item}</${itemTag}>`).join("\n");

                if (hasChildren) {
                    html = `<${tag}>\n${html}\n</${tag}>`;
                }

                return html;
            },

            isListTag(tag)
            {
                return tag === 'ul' || tag === 'ol';
            },

            isSelectTag(tag)
            {
                return tag === 'select';
            },
        }))
    })
</script>

<?= $this->endSection() ?>