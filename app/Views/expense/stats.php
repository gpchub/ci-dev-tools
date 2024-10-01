<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
		<header class="expense-header mb-4">
			<nav class="expense-nav">
				<a href="<?= url_to('expense.index') ?>" class="expense-nav__item">Thu chi</a>
				<a href="#" class="expense-nav__item active">Thống kê</a>
				<a href="<?= url_to('expense.settings') ?>" class="expense-nav__item">Thiết lập</a>
			</nav>
		</header>

		<div class="grid-auto">
			<section class="card" x-data="categoryStats">
				<h2>Thống kê theo danh mục</h2>

				<header class="transaction-filter grid md:grid-cols-3 gap-3 mb-4">
					<div class="">
						<label>Loại giao dịch</label>
						<select x-model="filter.type">
							<template x-for="item in transactionTypes">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.type"></option>
							</template>
						</select>
					</div>
					<div class="">
						<label>Loại thời gian</label>
						<select x-model="filter.periodType">
							<template x-for="item in periodTypes">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.periodType"></option>
							</template>
						</select>
					</div>
					<div class="" x-cloak x-show="filter.periodType == 'year'">
						<label>Năm</label>
						<select x-model="filter.year">
							<template x-for="item in years">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.year"></option>
							</template>
						</select>
					</div>
					<div class="" x-cloak x-show="filter.periodType == 'month'">
						<label>Tháng</label>
						<?= view_cell('MonthPickerCell', ['model' => 'filter.month']) ?>
					</div>
				</header>

				<div style="max-width: 100%"><canvas x-ref="chart"></canvas></div>
			</section>

			<section class="card" x-data="timelineStats">
				<h2>Thống kê theo thời gian</h2>

				<header class="transaction-filter grid md:grid-cols-3 gap-3 mb-4">
					<div class="">
						<label>Loại giao dịch</label>
						<select x-model="filter.type">
							<template x-for="item in transactionTypes">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.type"></option>
							</template>
						</select>
					</div>
					<div class="">
						<label>Loại thời gian</label>
						<select x-model="filter.periodType">
							<template x-for="item in periodTypes">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.periodType"></option>
							</template>
						</select>
					</div>
					<div class="" x-cloak x-show="filter.periodType == 'year'">
						<label>Năm</label>
						<select x-model="filter.year">
							<template x-for="item in years">
								<option :value="item.value" x-text="item.label" :selected="item.value == filter.year"></option>
							</template>
						</select>
					</div>
					<div class="" x-cloak x-show="filter.periodType == 'month'">
						<label>Tháng</label>
						<?= view_cell('MonthPickerCell', ['model' => 'filter.month']) ?>
					</div>
				</header>

				<div style="max-width: 100%;"><canvas x-ref="chart" style="height: 600px"></canvas></div>
			</section>
		</div>

    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script src="<?= site_url('js/alpine/datepicker.js') ?>"></script>

<?= $this->include('expense/partials/stats-script') ?>

<?= $this->endSection() ?>