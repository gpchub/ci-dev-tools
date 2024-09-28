<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
        <div class="card mb-3">
            <form class="gpc-form flex justify-center gap-3">
                <div class="form-group">
                    <label>px</label>
                    <input type="number" class="w-52" x-model="px" />
                </div>
                <div class="form-group">
                    <label>rem</label>
                    <input type="number" class="w-52" x-model="rem" />
                </div>
                <div class="form-group">
                    <label>tailwind class</label>
                    <input type="number" class="w-52" x-model="tailwind" />
                    <span class="error-message" x-show="!tailwind_classes.includes(tailwind)">class chưa tồn tại</span>
                </div>
            </form>
        </div>

        <div class="card">
            <h2 class="mb-0">Bảng chuyển đổi</h2>
            <div>Tính theo font size mặc định của browser là 16px</div>
            <div class="table-conversion">
                <template x-if="conversion_table.length">
                    <template x-for="item in conversion_table">
                        <div class="table-conversion__item grid grid-cols-3 gap-2">
                            <span x-text="item.px"></span>
                            <span x-text="item.rem"></span>
                            <span x-text="item.tailwind"></span>
                        </div>
                    </template>
                </template>

            </div>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script>

    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            px: 16,
            rem: 1,
            tailwind: 4,
            tailwind_classes: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96],

            conversion_table: [],

            init() {
                this.$watch('px', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.rem = this.px / 16;
                        this.tailwind = this.px / 4;
                    }
                } );

                this.$watch('rem', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.px = this.rem * 16;
                        this.tailwind = this.rem * 4;
                    }
                } );

                this.$watch('tailwind', (value, oldValue) => {
                    if ( value != oldValue ) {
                        this.px = this.tailwind * 4;
                        this.rem = this.tailwind / 4;
                    }
                } );

                for (let i = 2; i <= 1000; i += 2) {
                    this.conversion_table.push({
                        px: i + 'px',
                        rem: (i / 16) + 'rem' ,
                        tailwind: 'w-' + (i / 4),
                    })
                }
            },

        }));
    })
</script>

<?= $this->endSection() ?>