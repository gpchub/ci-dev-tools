<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('header_styles') ?>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app">
		<header class="expense-header mb-4">
			<nav class="expense-nav">
				<a href="#" class="expense-nav__item active">Thu chi</a>
				<a href="<?= url_to('expense.stats') ?>" class="expense-nav__item">Thống kê</a>
				<a href="<?= url_to('expense.settings') ?>" class="expense-nav__item">Thiết lập</a>
			</nav>
		</header>

		<div class="grid md:grid-cols-3 gap-4">

			<!-- form tạo mới -->
			<aside>
				<div class="card" x-data="{ expanded: true }" x-init="expanded = navigator.userAgent.indexOf('Mobi') < 0">
					<h2 class="flex justify-between items-center">
						<span>Tạo thu chi</span>
						<button class="button-expand" @click="expanded = ! expanded">
							<i x-show="!expanded" x-cloak class='bx bx-chevron-down text-lg'></i>
							<i x-show="expanded" x-cloak class='bx bx-chevron-up text-lg'></i>
						</button>
					</h2>
					<form class="gpc-form" x-show="expanded" x-collapse>
						<div class="form-group flex">
							<div class="radio">
								<label> <input type="radio" checked value="chi" x-model="newForm.type" /> <span>Chi</span> </label>
							</div>
							<div class="radio">
								<label> <input type="radio" value="thu" x-model="newForm.type" /> <span>Thu</span> </label>
							</div>
						</div>
						<div class="form-group">
							<label>Ngày</label>
							<?= view_cell('DatePickerCell', ['model' => 'newForm.date']) ?>
						</div>
						<div class="form-group">
							<label>Tài khoản</label>
							<select x-model="newForm.account">
								<template x-for="item in accounts">
									<option :value="item.id" x-text="item.title" :selected="item.id == newForm.account"></option>
								</template>
							</select>
						</div>
						<div class="form-group">
							<label>Danh mục</label>
							<select x-model="newForm.category">
								<template x-for="item in formNewTransactionCategories">
									<option :value="item.id" x-text="item.title" :selected="item.id == newForm.category"></option>
								</template>
							</select>
						</div>
						<div class="form-group">
							<label>Số tiền</label>
							<?= view_cell('InputNumberCell', ['model' => 'newForm.amount']) ?>
						</div>
						<div class="form-group">
							<label>Nội dung</label>
							<input type="text" x-model="newForm.note" />
						</div>
						<div class="form-group">
							<button type="button" primary @click="createTransaction">Tạo</button>
						</div>
					</form>
				</div>
			</aside>

			<!-- danh sách thu chi -->
			<g-card class="md:col-span-2" data-title="Danh sách thu chi">

				<header class="transaction-filter flex flex-wrap mb-4 gap-3">
					<div class="flex gap-2 items-center">
						<button type="button" class="w-10 h-10 grid place-content-center" @click.prevent="prevMonth"><i class='bx bx-chevron-left text-xl'></i></button>
						<?= view_cell('MonthPickerCell', ['model' => 'filter.month']) ?>
						<button type="button" class="w-10 h-10 grid place-content-center" @click.prevent="nextMonth"><i class='bx bx-chevron-right text-xl'></i></button>
					</div>

					<div class="widget sum-income shadow-md p-2 flex gap-3 items-center rounded ml-auto">
						<h4 class="mb-0">Thu</h4>
						<span x-text="sumOfIncome" class="text-success font-bold"></span>
					</div>

					<div class="widget sum-expense shadow-md p-2 flex gap-3 items-center rounded">
						<h4 class="mb-0">Chi</h4>
						<span x-text="sumOfExpense" class="text-warning font-bold"></span>
					</div>
				</header>

				<template x-for="(item, index) in filterTransactions" :key="item.id">
					<div class="transaction-item" :style="`--color: ${getCategoryColor(item)}`" x-data="transitionElement(item)" x-bind="element">
						<div class="transaction-item__left">
							<h5 class="transaction-item__date" :class="{'is-sunday': isSunday(item.date)}">
								<i class='bx bx-calendar'></i>
								<span x-text="formatDate(item.date, 'short')"></span>
							</h5>
							<div class="transaction-item__category" x-html="getCategoryBadge(item.category)"></div>
							<h4 class="transaction-item__title"><span x-text="item.note"></span></h4>
						</div>
						<div class="transaction-item__right">
							<div class="transaction-item__amount" :class="{'text-warning': item.type === 'chi', 'text-success': item.type === 'thu'}">
								<span x-text="item.type === 'chi' ? '-' : '+'"></span>
								<span x-text="formatNumber(item.amount)"></span>
							</div>
							<div class="transaction-item__account" x-html="getAccountBadge(item.account)"></div>

							<div class="transaction-item__actions">
								<a href="#" @click.prevent="editTransaction(item)">Chỉnh sửa</a>
								<a href="#" x-bind="removeElement">Xoá</a>
							</div>
						</div>
					</div>
				</template>
			</g-card>
		</div> <!-- /.grid -->

		<dialog x-ref="dialog" class="modal">
			<div class="modal-body">
				<h3>Thông tin giao dịch</h3>
				<form class="gpc-form">
					<div class="form-group flex">
						<div class="radio">
							<label> <input type="radio" value="chi" x-model="editForm.type" /> <span>Chi</span> </label>
						</div>
						<div class="radio">
							<label> <input type="radio" value="thu" x-model="editForm.type" /> <span>Thu</span> </label>
						</div>
					</div>
					<div class="form-group">
						<label>Ngày</label>
						<?= view_cell('DatePickerCell', ['model' => 'editForm.date']) ?>
					</div>
					<div class="form-group">
						<label>Tài khoản</label>
						<select x-model="editForm.account">
							<template x-for="item in accounts">
								<option :value="item.id" x-text="item.title" :selected="item.id == editForm.account"></option>
							</template>
						</select>
					</div>
					<div class="form-group">
						<label>Danh mục</label>
						<select x-model="editForm.category">
							<template x-for="item in formEditTransactionCategories">
								<option :value="item.id" x-text="item.title" :selected="item.id == editForm.category"></option>
							</template>
						</select>
					</div>
					<div class="form-group">
						<label>Số tiền</label>
						<?= view_cell('InputNumberCell', ['model' => 'editForm.amount']) ?>
					</div>
					<div class="form-group">
						<label>Nội dung</label>
						<input type="text" x-model="editForm.note" />
					</div>
					<div class="form-group">
						<button type="button" primary @click="saveTransaction">Lưu lại</button>
						<button plain data-dismiss="modal">Huỷ</button>
					</div>
				</form>
			</div>
		</dialog>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script type="module">
    import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
    window.nanoid = nanoid;
</script>

<script src="<?= site_url('js/alpine/datepicker.js') ?>"></script>

<?= $this->include('expense/partials/transactions-script') ?>

<?= $this->endSection() ?>