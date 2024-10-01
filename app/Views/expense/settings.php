<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('header_styles') ?>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/sort@3.x.x/dist/cdn.min.js"></script>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container">
		<header class="expense-header mb-4">
			<nav class="expense-nav">
				<a href="<?= url_to('expense.index') ?>" class="expense-nav__item">Thu chi</a>
				<a href="<?= url_to('expense.stats') ?>" class="expense-nav__item">Thống kê</a>
				<a href="#" class="expense-nav__item active">Thiết lập</a>
			</nav>
		</header>

		<div class="grid md:grid-cols-2 gap-4">
			<?= $this->include('expense/partials/accounts') ?>
			<?= $this->include('expense/partials/categories') ?>
			<?= $this->include('expense/partials/tools') ?>
		</div>

    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script type="module">
    import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
    window.nanoid = nanoid;
</script>

<?= $this->include('expense/partials/accounts-script') ?>
<?= $this->include('expense/partials/categories-script') ?>
<?= $this->include('expense/partials/tools-script') ?>

<?= $this->endSection() ?>