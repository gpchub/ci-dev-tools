<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !empty($page_title) ? $page_title : "GPC dev tools" ?></title>
    <meta name="description" content="GPC Dev tools">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico">

    <!-- STYLES -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <?= $this->renderSection('header_styles') ?>

    <link rel="stylesheet" href="<?= site_url('css/bamboo.css') ?>?v=<?= filemtime(public_path('css/bamboo.css')) ?>">
    <link rel="stylesheet" href="<?= site_url('css/style.css') ?>?v=<?= filemtime(public_path('css/style.css')) ?>">

    <!-- Alpine -->
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body>

    <?= $this->include('layout/partials/header') ?>

    <div class="heroe">
        <div class="container"><?= $this->renderSection('hero') ?></div>
    </div>

    <main>
        <?= $this->renderSection('content') ?>
    </main>

    <?= $this->renderSection('footer_scripts') ?>


    <script type="module">
        import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
    </script>
    <script src="<?= site_url('js/components/codeblock.js') ?>?v=<?= filemtime(public_path('js/components/codeblock.js')) ?>"></script>
    <script src="<?= site_url('js/components/card.js') ?>"></script>
    <script src="<?= site_url('js/script.js') ?>?v=<?= filemtime(public_path('js/script.js')) ?>"></script>

</body>
</html>
