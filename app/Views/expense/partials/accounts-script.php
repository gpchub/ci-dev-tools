<script>
	document.addEventListener('alpine:init', () => {
        Alpine.data('accounts', () => ({
			accounts: Alpine.$persist([{
                id: 'cash',
				title: 'Tiền mặt',
				abbr: 'C',
				openingBalance: 0,
				amount: 0,
				color: '',
				isDefault: true,
            }]).as('gpc-expense-accounts'),

			accountForm: {},
			accountFormError: {},

			editingAccount: {},

			init() {
				this.resetaccountForm();

				this.accounts.forEach(x => {
					if (!x.hasOwnProperty('amount')) {
						x.amount = x.openingBalance;
					}
				});
			},

			resetaccountForm() {
				this.accountForm = {
					id: '',
					title: '',
					abbr: '',
					openingBalance: 0,
					amount: 0,
					color: '',
					isDefault: false,
				}
				this.editingAccount = {};
			},

			createAccount() {
				this.resetaccountForm();
				this.$refs.dialog.showModal();
			},

			editAccount(account) {
				this.accountForm = Object.assign({}, Alpine.raw(account));
				this.editingAccount = account;
				this.$refs.dialog.showModal();
			},

			cancelEditAccount(account) {
				this.resetaccountForm();
				this.accountFormError = {};
			},

			saveAccount() {
				if (!this.accountForm.title.trim()) {
					this.accountFormError.title = 'Tên không được để trống';
					return;
				}

				const abbr = this.accountForm.abbr.trim() ? this.accountForm.abbr.trim() : this.makeAbbr(this.accountForm.title);
				const isNew = this.accountForm.id.trim().length == 0;

				if (this.accountForm.isDefault ) {
					this.accounts.forEach(item => {
						item.isDefault = false;
					});
				}

				if (isNew) {
					this.accounts.push({
						id: nanoid(8),
						title: this.accountForm.title,
						abbr: abbr,
						openingBalance: this.accountForm.openingBalance,
						amount: this.accountForm.openingBalance,
						color: this.accountForm.color,
						isDefault: this.accountForm.isDefault,
					});
				} else {
					const account = this.editingAccount;

					const shouldUpdateBalance = this.editingAccount.openingBalance != this.accountForm.openingBalance;

					account.title = this.accountForm.title;
					account.openingBalance = this.accountForm.openingBalance;
					account.color = this.accountForm.color;
					account.abbr = abbr;
					account.isDefault = this.accountForm.isDefault;

					//TODO update amount
				}

				this.resetaccountForm();
				this.accountFormError = {};
				this.$refs.dialog.close();
			},

			async deleteAccount(account, index) {
				let dialog = new ConfirmDialog({
					questionTitle: 'Xoá tài khoản',
					questionText: 'Bạn có chắc muốn xoá tài khoản này? Tất cả các khoản thu chi trong tài khoản này sẽ bị xoá. Tài khoản đã xoá sẽ không khôi phục được.',
					type: 'danger',
				});
				const isConfirmed = await dialog.confirm();
				if (!isConfirmed) {
					return;
				}

				let entriesInDB = localStorage.getItem('gpc-expense-transactions');
				if (entriesInDB) {
					let entries = JSON.parse(entriesInDB);
					entries = entries.filter(x => x.account !== account.id);
					localStorage.setItem('gpc-expense-transactions', JSON.stringify(entries));
				}

				this.accounts.splice(index, 1);
			},

			makeAbbr(text, count = 0) {
				text = text.trim();
				if (! text.length) return '';

				let abbr = text.split(' ').map(word => word.charAt(0).toUpperCase());

				if (count > 0) {
					abbr = abbr.slice(0, count);
				}

				return abbr.join('');
			},

            onSortAccount(item, position) {
                let oldIndex = this.accounts.findIndex(x => x.id === item.id);

                this.accounts.splice(oldIndex, 1);
                this.accounts.splice(position, 0, item);

                // cập nhật lại keys cho x-for, nếu không UI hiển thị sai thứ tự
                // @see: https://github.com/alpinejs/alpine/discussions/4157
                this.$refs.accountList.querySelector("template")._x_prevKeys = this.accounts.map((item) => item.id);
            },

			resetBalance(account) {
				account.amount = account.openingBalance;
			},
		})); // Alpine.data
	}); // alpine:init
</script>