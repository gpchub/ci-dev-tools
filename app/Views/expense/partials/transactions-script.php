<script>
	document.addEventListener('alpine:init', () => {
		Alpine.data('app', () => ({
			accounts: Alpine.$persist([]).as('gpc-expense-accounts'),
			categories: [],

			transactions: Alpine.$persist([]).as('gpc-expense-transactions'),

			newForm: {},
			editForm: {},
            editingTransaction: {},
            filter: {
                month: new Date().toJSON().slice(0, 10),
            },

            init() {
				const categoriesInDB = localStorage.getItem('gpc-expense-categories');

				if (categoriesInDB) {
					this.categories = JSON.parse(categoriesInDB);
				}

                this.sortTransactions();
				this.resetNewForm();
			},

            nextMonth() {
                let date = new Date(this.filter.month);
                date.setMonth(date.getMonth() + 1);
                this.filter.month = date.toJSON().slice(0, 10);
            },

            prevMonth() {
                let date = new Date(this.filter.month);
                date.setMonth(date.getMonth() - 1);
                this.filter.month = date.toJSON().slice(0, 10);
            },

			resetNewForm() {
				this.newForm = {
					date: new Date().toJSON().slice(0, 10),
					account: this.accounts.length ? this.accounts[0].id : '',
					category: '',
					amount: '0',
					note: '',
					type: 'chi',
				};
			},

            resetEditForm() {
                this.editForm = {};
                this.editingTransaction = {};
            },

            sumOfIncome() {
                let filterDate = new Date(this.filter.month);
                return formatNumber(this.transactions.reduce(
                    (accumulator, record) => {
                        let itemDate = new Date(record.date);

                        return isSameMonth(itemDate, filterDate) && record.type === 'thu' ?
                            accumulator + parseInt(record.amount) :
                            accumulator;
                    },
                    0,
                ));
            },

            sumOfExpense() {
                let filterDate = new Date(this.filter.month);
                return formatNumber(this.transactions.reduce(
                    (accumulator, record) => {
                        let itemDate = new Date(record.date);

                        return isSameMonth(itemDate, filterDate) && record.type === 'chi' ?
                            accumulator + parseInt(record.amount) :
                            accumulator;
                    },
                    0,
                ));
            },

            filterTransactions() {
                let filterDate = new Date(this.filter.month);

                return this.transactions.filter(x => {
                    let itemDate = new Date(x.date);
                    return isSameMonth(itemDate, filterDate);
                })
            },

            formNewTransactionCategories() {
                return this.categories.filter(x => {
                    if (this.newForm.type == 'chi') {
                        return x.isChi;
                    }

                    return x.isThu;
                });
            },

            formEditTransactionCategories() {
                return this.categories.filter(x => {
                    if (this.editForm.type == 'chi') {
                        return x.isChi;
                    }

                    return x.isThu;
                });
            },

			createTransaction() {
				if (!this.newForm.date.length) {
					this.newForm.date = new Date().toJSON().slice(0, 10);
				}

                const allowedCategories = this.formNewTransactionCategories().map(x => x.id);
                if (!this.newForm.category.length || !allowedCategories.includes(this.newForm.category)) {
                    this.newForm.category = allowedCategories[0];
                }

                const newTransaction = {
					id: nanoid(),
					...this.newForm,
				}

				this.transactions.push(newTransaction);
                this.updateAccountBalance(newTransaction);

                this.sortTransactions();
                this.resetNewForm();
			},

            editTransaction(transaction) {
                this.editForm = Object.assign({}, Alpine.raw(transaction));
				this.editingTransaction = transaction;
				this.$refs.dialog.showModal();
            },

            saveTransaction() {
                if (!this.editForm.date.length) {
					this.editForm.date = new Date().toJSON().slice(0, 10);
				}

                const allowedCategories = this.formEditTransactionCategories().map(x => x.id);
                if (!this.editForm.category.length || !allowedCategories.includes(this.editForm.category)) {
                    this.editForm.category = allowedCategories[0];
                }

                const oldTransaction = Object.assign({}, this.editingTransaction);
                const shouldSortTransaction = this.editForm.date != this.editingTransaction.date;
                const shouldUpdateBalance =
                    (this.editForm.amount != this.editingTransaction.amount) ||
                    (this.editForm.type != this.editTransaction.type) ||
                    (this.editForm.account != this.editingTransaction.account);

                this.editingTransaction.type = this.editForm.type;
                this.editingTransaction.date = this.editForm.date;
                this.editingTransaction.account = this.editForm.account;
                this.editingTransaction.category = this.editForm.category;
                this.editingTransaction.amount = this.editForm.amount;
                this.editingTransaction.note = this.editForm.note;

                if (shouldUpdateBalance) {
                    this.updateAccountBalance(this.editingTransaction, oldTransaction);
                }

                if (shouldSortTransaction) {
                    this.sortTransactions();
                }

				this.resetEditForm();
				this.$refs.dialog.close();
            },

            async deleteTransaction(item, beforeRemoveCallback) {
                await beforeRemoveCallback();
                let index = this.transactions.findIndex(x => x.id == item.id);
                this.transactions.splice(index, 1);
                this.updateAccountBalance(null, item);
            },

            updateAccountBalance(transaction = null, reverseTransaction = null) {
                if (!transaction && !reverseTransaction) return;

                const account = transaction ? this.accounts.find(x => x.id === transaction.account) : null
                const reverseAccount = reverseTransaction ? this.accounts.find(x => x.id === reverseTransaction.account) : null;

                if (!account && !reverseAccount) return;

                let number = 0;

                if (reverseTransaction) {
                    let amount = reverseAccount.amount ? parseInt(reverseAccount.amount) : 0;
                    number = parseInt(reverseTransaction.amount);
                    if (reverseTransaction.type == 'chi') {
                        amount += number;
                    } else {
                        amount -= number;
                    }

                    reverseAccount.amount = amount;
                }

                if (transaction) {
                    let amount = account.amount ? parseInt(account.amount) : 0;
                    number = parseInt(transaction.amount);
                    if (transaction.type == 'chi') {
                        amount -= number;
                    } else {
                        amount += number;
                    }

                    account.amount = amount;
                }

            },

            sortTransactions() {
                this.transactions.sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return bDate - aDate;
                });
            },

            getAccountBadge(accountId) {
                const account = this.accounts.find(item => item.id === accountId);
                let badge = '';

                if (account) {
                    let color = account.color || '#64748b';
                    badge += `<span style="color: ${account.color}"><i class='bx bx-wallet' ></i> ${account.title}</span>`;
                }

                return badge;
            },

            getCategoryBadge(categoryId) {
                const category = this.categories.find(item => item.id === categoryId);
                let badge = '';

                if (category) {
                    let color = category.color || '#64748b';
                    badge += `<span style="color: ${category.color}"><i class='${category.icon}' ></i> ${category.title}</span>`;
                }

                return badge;
            },

            getCategoryColor(item) {
                const category = this.categories.find(x => x.id === item.category);
                return category?.color ?? '#fff';
            }
		})); // Alpine.data

        Alpine.data('transitionElement', (item) => ({
            show: false,
            item: item,

            init() {
                this.$nextTick(() => (this.show = true));
            },
            element: {
                'x-transition.duration.300ms'() {},
                'x-show.important'() {
                    return this.show;
                },
            },
            removeElement: {
                async '@click.prevent'() {
                    await this.deleteTransaction(this.item, async () => {
                        this.show = false;
                        await new Promise((resolve) => setTimeout(resolve, 300));
                    });
                },
            },
        })); // Alpine.data
	}); // alpine:init
</script>