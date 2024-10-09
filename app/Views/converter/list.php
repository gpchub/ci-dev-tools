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
                        <div>
                            <div class="flex flex-wrap gap-3">
                                <template x-for="(value, key) in inputTypes" :key="key">
                                    <label><input type="radio" x-model="inputType" :checked="key === inputType" :value="key"/> <span x-text="value"></span></label>
                                </template>
                            </div>

                            <span x-show="inputType === 'text'" class="help-text">Mỗi mục là 1 dòng, mỗi dòng có dạng <code>label | value</code> hoặc <code>label</code></span>

                            <span x-cloak x-show="inputType === 'html'" class="help-text"><code>label</code> là text giữa các tag, <code>value</code> là giá trị attribute <code>value</code> trong <code>&lt;option&gt;</code></span>
                        </div>
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

                        <label x-show="outputType == 'html'" x-cloak>Thẻ</label>
                        <select x-model="outputHTMLTag" x-show="outputType == 'html'" x-cloak>
                            <option value="select">select</option>
                            <option value="ul">ul</option>
                            <option value="ol">ol</option>
                            <option value="p">p</option>
                            <option value="div">div</option>
                            <option value="span">span</option>
                        </select>

                        <label x-show="outputType == 'html' && outputHTMLTag !== 'select'" x-cloak>Value attribute</label>
                        <input type="text" x-model="outputValueAttribute" x-show="outputType == 'html' && outputHTMLTag !== 'select'" x-cloak>

                        <label class="col-span-full"><input type="checkbox" x-model="skipEmpty"> Bỏ qua chuỗi rỗng</label>
                        <label class="col-span-full"><input type="checkbox" x-model="skipValue"> Bỏ qua value</label>
                        <label class="col-span-full" x-show="outputType === 'text'"><input type="checkbox" x-model="wrapQuote"> Thêm nháy kép khi chuyển sang text</label>
                        <label class="col-span-full" x-show="outputType === 'text'"><input type="checkbox" x-model="addSpace"> Thêm khoảng trắng giữa dấu phân cách</label>
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
            input: '',

            outputTypes: {
                'text': 'Text',
                'html': 'HTML',
            },
            outputType: 'text',
            outputHTMLTag: 'select',
            outputValueAttribute: 'data-value',
            output: '',
            skipValue: false,
            skipEmpty: true,
            wrapQuote: false,
            addSpace: true,

            submit()
            {
                let inputArray = [];

                switch (this.inputType) {
                    case 'text':
                        inputArray = this.textToArray(this.input, this.skipEmpty);
                        break;
                    case 'html':
                        inputArray = this.htmlToArray(this.input, this.skipEmpty);
                        break;
                }

                let separator = this.addSpace ? ' | ' : '|';

                this.output = this.outputType === 'text' ?
                    this.arrayToText(inputArray, separator, this.wrapQuote) :
                    this.arrayToHtml(inputArray, this.outputHTMLTag);
            },

            textToArray(text, skipEmpty = false)
            {
                let array = text.split("\n").map(item => item.trim());
                array = skipEmpty ? array.filter(item => item) : array;

                return array.map(item => {
                    let parts = item.split('|');
                    let p1 = parts[0] ? parts[0].trim() : '';
                    let p2 = parts[1] ? parts[1].trim() : '';
                    return [p1, p2];
                });
            },

            htmlToArray(html, skipEmpty = false)
            {
                // match[2]: value, match[3]: label
                let matches = html.matchAll(/<([\w]+)(?:\s*value\s*=\s*['"]?(.+?)?['"]?)?>(.*?)<\/\1>/gm);

                let array = [];
                for (let match of matches) {
                    if (skipEmpty && !match[2] && !match[3]) {
                        continue;
                    }
                    let label = match[3] ? match[3].trim() : '';
                    let value = match[2] ? match[2].trim() : '';
                    array.push([label, value]);
                }

                return array;
            },

            arrayToText(array, separator = '|', quote = false) {
                if (this.skipValue) {
                    return array.map(item => quote ? `"${item[0]}"`: item[0]).filter(x => x.trim()).join("\n");
                }

                return array.map(item => {
                    return quote ? item.map(item => `"${item}"`).join(separator) : item.join(separator);
                }).join("\n");
            },

            arrayToHtml(array, tag) {
                let itemTag = this.isListTag(tag) ? 'li' : this.isSelectTag(tag) ? 'option' : tag;
                let hasChildren = this.isListTag(tag) || this.isSelectTag(tag);
                let indent = hasChildren ? '\t' : '';
                let valueAttribute = this.isSelectTag(tag) ? 'value' : this.outputValueAttribute ? this.outputValueAttribute : 'data-value';
                let html = array.map(item => {
                    let label = item[0];
                    let value = item[1];
                    let html = this.skipValue ?
                        `<${itemTag}>${label}</${itemTag}>` :
                        `<${itemTag} ${valueAttribute}="${value}">${label}</${itemTag}>`;
                    return indent + html;
                }).join("\n");

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