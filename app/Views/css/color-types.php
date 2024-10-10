<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('header_styles') ?>
    <style>
        .preview {
            --bg: #fff;
            --color: #000;
            height: 40px;
            width: 250px;
            /* background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".01"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>'); */
            display: grid;
            place-content: center;
            position: relative;
            background-color: var(--bg);
        }
        .preview span {
            color: var(--color);
            z-index: 2;
        }
    </style>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container grid-auto" x-data="app">
        <g-card>
            <g-card-title>Nhập mã màu</g-card-title>
            <form>
                <div class="form-group">
                    <label>Hex</label>
                    <input type="text" x-model="hex" @input="onHexChange">
                </div>

                <div class="form-group">
                    <label>Rgb</label>
                    <input type="text" x-model="rgb" @input="onRgbChange">
                </div>

                <div class="form-group">
                    <label>Hsl</label>
                    <input type="text" x-model="hsl" @input="onHslChange">
                </div>
            </form>
        </g-card>
        <g-card>
            <g-card-title>Preview</g-card-title>
            <div class="form-group">
                <label>Hex</label>
                <div class="preview" :style="'--bg:' + previewHex + '; --color:' + previewColor"><span x-text="previewHex"></span></div>
            </div>
            <div class="form-group">
                <label>Rgb</label>
                <div class="preview" :style="'--bg:' + previewRgb + '; --color:' + previewColor""><span x-text="previewRgb"></span></div>
            </div>
            <div class="form-group">
                <label>Hsl</label>
                <div class="preview" :style="'--bg:' + previewHsl + '; --color:' + previewColor""><span x-text="previewHsl"></span></div>
            </div>
        </g-card>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<?= $this->include('css/partials/color-types-scripts') ?>

<?= $this->endSection() ?>