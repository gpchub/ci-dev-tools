<script>
	document.addEventListener('alpine:init', () => {
        Alpine.data('categories', () => ({
			categories: Alpine.$persist([{
                id: 'uncategorized',
				title: 'Chưa phân loại',
				isDefault: true,
				isThu: true,
				isChi: true,
				color: '',
				icon: 'bx bxs-badge-dollar',
            }]).as('gpc-expense-categories'),

			itemForm: {},
			itemFormError: {},

			editingItem: {},

			init() {
				this.resetForm();
			},

			resetForm() {
				this.itemForm = {
					id: '',
					title: '',
					isDefault: false,
					isThu: true,
					isChi: true,
					color: '',
					icon: 'bx bxs-badge-dollar',
				}
				this.editingItem = {};
			},

			createCategory() {
				this.resetForm();
				this.$refs.dialog.showModal();
			},

			editCategory(category) {
				this.itemForm = Object.assign({}, Alpine.raw(category));
				this.editingItem = category;
				this.$refs.dialog.showModal();
			},

			cancelEditCategory(category) {
				this.resetForm();
				this.itemFormError = {};
			},

			saveCategory() {
				if (!this.itemForm.title.trim()) {
					this.itemFormError.title = 'Tên không được để trống';
					return;
				}

				if (!this.itemForm.icon || this.itemForm.icon.trim().length == 0) {
					this.itemForm.icon = 'bx bxs-badge-dollar';
				}

				const isNew = this.itemForm.id.trim().length == 0;

				if (this.itemForm.isDefault ) {
					this.categories.forEach(item => {
						item.isDefault = false;
					});
				}

				if (isNew) {
					this.categories.push({
						id: nanoid(8),
						title: this.itemForm.title,
						isDefault: this.itemForm.isDefault,
						isThu: this.itemForm.isThu,
						isChi: this.itemForm.isChi,
						color: this.itemForm.color,
						icon: this.itemForm.icon,
					});
				} else {
					const category = this.editingItem;
					category.title = this.itemForm.title;
					category.isDefault = this.itemForm.isDefault;
					category.isThu = this.itemForm.isThu;
					category.isChi = this.itemForm.isChi;
					category.color = this.itemForm.color;
					category.icon = this.itemForm.icon;
				}

				this.resetForm();
				this.itemFormError = {};
				this.$refs.dialog.close();
			},

			async deleteCategory(category, index) {
				let dialog = new ConfirmDialog({
					questionTitle: 'Xoá danh mục',
					questionText: 'Bạn có chắc muốn xoá danh mục này? Tất cả các khoản thu chi trong danh mục này sẽ bị xoá. Danh mục đã xoá sẽ không khôi phục được.',
					type: 'danger',
				});
				const isConfirmed = await dialog.confirm();
				if (!isConfirmed) {
					return;
				}

				const entriesInDB = localStorage.getItem('gpc-expense-entries');
				if (entriesInDB) {
					const entries = JSON.parse(entriesInDB);
					entries = entries.filter(x => x.categoryId === category.id);
					localStorage.setItem('gpc-expense-entries', JSON.stringify(entries));
				}

				this.categories.splice(index, 1);
			},

			onSortCategory(item, position) {
                let oldIndex = this.categories.findIndex(x => x.id === item.id);

                this.categories.splice(oldIndex, 1);
                this.categories.splice(position, 0, item);

                // cập nhật lại keys cho x-for, nếu không UI hiển thị sai thứ tự
                // @see: https://github.com/alpinejs/alpine/discussions/4157
                this.$refs.categoryList.querySelector("template")._x_prevKeys = this.categories.map((item) => item.id);
            },
		})); // Alpine.data
	}); // alpine:init
</script>