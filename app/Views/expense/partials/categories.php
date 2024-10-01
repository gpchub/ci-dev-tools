<my-card x-data="categories">
    <div class="flex justify-between flex-wrap items-center mb-4">
        <h2 class="mb-0">Danh mục</h2>
        <button primary @click="createCategory">Thêm mới</button>
    </div>

    <div class="category-list" x-sort="(item, position) => { onSortCategory(item, position) }" x-ref="categoryList">
        <template x-for="(item, index) in categories" :key="item.id">
            <div class="category-item" x-sort:item="item">
                <div class="category-item__view">
                    <div class="category-item__title">
                        <h4 :style="`--color: ${item.color ? item.color : 'var(--color-text)'}`">
                            <i :class="item.icon" x-show="item.icon"></i>
                            <span x-text="item.title"></span>
                            <i class='text-lg bx bxs-star' style='color:#f5d80b' title="Mặc định" x-show="item.isDefault" x-cloak></i>
                        </h4>
                        <div class="category-item__actions">
                            <a href="#" @click.prevent="editCategory(item)">Chỉnh sửa</a>
                            <a x-show="!item.isDefault" x-cloak href="#" @click.prevent="await deleteCategory(item, index)">Xoá</a>
                        </div>
                    </div>
                    <div class="category-item__chi"><span x-show="item.isChi">Chi</span></div>
                    <div class="category-item__thu"><span x-show="item.isThu">Thu</span></div>
                </div>
            </div>
        </template>
    </div>

    <dialog x-ref="dialog" class="modal">
        <div class="modal-body">
            <h3>Thông tin danh mục</h3>
            <form class="gpc-form">
                <div class="form-group">
                    <label>Tên danh mục</label>
                    <input type="text" x-model="itemForm.title" />
                    <span class="error-message" x-cloak x-show="itemFormError.title" x-text="itemFormError.title"></span>
                </div>
                <div class="form-group">
                    <label>Icon</label>
                    <input type="text" x-model="itemForm.icon" />
                    <span class="help-text">Lấy tên icon <a href="https://boxicons.com/" target="_blank">ở đây</a> (vd: <i class='bx bxs-badge-dollar' ></i> <code>bx bxs-badge-dollar</code>)</span>
                </div>
                <div class="form-group">
                    <label>Áp dụng cho</label>
                    <div class="flex gap-4">
                        <label><input type="checkbox" x-model="itemForm.isChi"> <span>Chi</span></label>
                        <label><input type="checkbox" x-model="itemForm.isThu"> <span>Thu</span></label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Màu</label>
                    <?= view_cell('ColorPickerCell', ['model' => 'itemForm.color']) ?>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" :disabled="editingItem.isDefault === true" x-model="itemForm.isDefault"> <span>Đặt làm mặc định</span></label>
                </div>
                <div class="form-group">
                    <button class="button" @click.prevent="saveCategory" primary>Lưu lại</button>
                    <button plain data-dismiss="modal">Huỷ</button>
                </div>
            </form>
        </div>
    </dialog>
</my-card>