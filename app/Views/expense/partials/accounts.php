<my-card x-data="accounts">
    <div class="flex justify-between flex-wrap items-center mb-4">
        <h2 class="mb-0">Tài khoản</h2>
        <button primary @click="createAccount">Thêm mới</button>
    </div>

    <div class="account-list" x-sort="(item, position) => { onSortAccount(item, position) }" x-ref="accountList">
        <template x-for="(item, index) in accounts" :key="item.id">
            <div class="account-item" x-sort:item="item">
                <div class="account-item__view">
                    <div class="account-item__title">
                        <h4 :style="`--color: ${item.color ? item.color : 'var(--color-text)'}`">
                            <span x-text="item.title"></span>
                            <i class='text-lg bx bxs-star' style='color:#f5d80b' title="Mặc định" x-show="item.isDefault" x-cloak></i>
                        </h4>
                        <div class="account-item__actions">
                            <a href="#" @click.prevent="editAccount(item)">Chỉnh sửa</a>
                            <!-- <a href="#" @click.prevent="resetBalance(item)">Reset</a> -->
                            <a x-show="!item.isDefault" x-cloak href="#" @click.prevent="await deleteAccount(item, index)">Xoá</a>
                        </div>
                    </div>

                    <div class="account-item__amount">
                        <div><small>Số dư hiện tại</small></div>
                        <div class="account-item__remain-balance" x-text="formatNumber(item.amount)"></div>

                        <div><small>Số dư ban đầu</small></div>
                        <div class="account-item__opening-balance" x-text="formatNumber(item.openingBalance)"></div>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <dialog x-ref="dialog" class="modal">
        <div class="modal-body">
            <h3>Thông tin tài khoản</h3>
            <form class="gpc-form">
                <div class="form-group">
                    <label>Tên tài khoản</label>
                    <input type="text" x-model="accountForm.title" />
                    <span class="error-message" x-cloak x-show="accountFormError.title" x-text="accountFormError.title"></span>
                </div>
                <!-- <div class="form-group">
                    <label>Viết tắt</label>
                    <input type="text" x-model="accountForm.abbr" />
                </div> -->
                <div class="form-group">
                    <label>Số dư ban đầu</label>
                    <?= view_cell('InputNumberCell', ['model' => 'accountForm.openingBalance', 'disabled' => 'editingAccount.id && editingAccount.id.length']) ?>
                    <!-- <span class="help-text" x-show="editingAccount.id && editingAccount.id.length"><i class='bx bx-message-alt-error text-lg' style='color:#cb270d'  ></i> Thay đổi số dư ban đầu có thể ảnh hưởng đến số dư hiện tại của tài khoản</span> -->
                </div>
                <div class="form-group">
                    <label>Màu</label>
                    <?= view_cell('ColorPickerCell', ['model' => 'accountForm.color']) ?>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" :disabled="editingAccount.isDefault === true" x-model="accountForm.isDefault"> <span>Đặt làm mặc định</span></label>
                </div>
                <div class="form-group">
                    <button class="button" @click.prevent="saveAccount" primary>Lưu lại</button>
                    <button plain data-dismiss="modal">Huỷ</button>
                </div>
            </form>
        </div>
    </dialog>
</my-card>

