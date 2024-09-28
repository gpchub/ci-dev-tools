<header class="main-header" x-data="{ open: false }" :class="{ 'open': open }">
    <div class="container">
        <div class="logo">
            <a href="<?= site_url() ?>">
                <?= $this->include('layout/partials/logo') ?>
            </a>
        </div>
        <a href="javascript:;" class="menu-toggler" @click.stop.prevent="open = !open">
            <i class='bx bx-menu'></i>
        </a>
        <nav class="main-menu" @click.outside="open = false">
            <ul>
                <li x-data="{ open: false }" :class="{ 'open': open }">
                    <a href="javascript:;" @click.prevent="open = !open" @click.outside="open = false">Tạo dữ liệu <i class='bx bx-chevron-down'></i></a>

                    <ul>
                        <li><a href="<?= url_to('generator.list') ?>">Danh sách</a></li>
                    </ul>
                </li>
                <li x-data="{ open: false }" :class="{ 'open': open }">
                    <a href="javascript:;" @click.prevent="open = !open" @click.outside="open = false">
                        Chuyển đổi <i class='bx bx-chevron-down'></i>
                    </a>

                    <ul>
                        <li><a href="<?= url_to('converter.list') ?>">Danh sách</a></li>
                        <li><a href="<?= url_to('converter.pxrem') ?>">Đổi px ↔ rem</a></li>
                    </ul>
                </li>
                <li x-data="{ open: false }" :class="{ 'open': open }">
                    <a href="javascript:;" @click.prevent="open = !open" @click.outside="open = false">
                        CSS <i class='bx bx-chevron-down'></i>
                    </a>

                    <ul>
                        <li><a href="<?= url_to('css-tools.prefix-breakpoint') ?>">Prefix breakpoint</a></li>
                        <li><a href="<?= url_to('css-tools.css-spacing') ?>">Css spacing</a></li>
                        <li><a href="<?= url_to('css-tools.minify-css') ?>">Minify CSS</a></li>
                    </ul>
                </li>
                <li><a href="#">Calculator</a></li>
                <li><a href="#">WordPress</a></li>
                <li><a href="#">JSON</a></li>
                <li><a href="<?= url_to('personal.todo') ?>">Todo</a></li>
            </ul>
        </nav>
    </div>
</header>