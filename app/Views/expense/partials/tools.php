<my-card data-title="Xuất dữ liệu" x-data="toolExport">
    <div class="form-group">
        <label>Tài khoản</label>
        <my-code-block x-text="accounts" class="h-40"></my-code-block>
    </div>
    <div class="form-group">
        <label>Danh mục</label>
        <my-code-block x-text="categories" class="h-40"></my-code-block>
    </div>
    <div class="form-group">
        <label>Thu chi</label>
        <my-code-block x-text="transactions" class="h-40"></my-code-block>
    </div>
    <div class="form-group">
        <button primary @click="exportData">Xuất dữ liệu</button>
    </div>
</my-card>

<my-card data-title="Nhập dữ liệu" x-data="toolImport">
    <div class="alert is-success mb-4" x-cloak x-show="isDone">
        Dữ liệu đã được nhập thành công. Refresh lại trang để xem kết quả.
    </div>

    <div class="mb-4 text-danger"><b>Lưu ý: </b>Dữ liệu nhập vào sẽ thay thế toàn bộ dữ liệu cũ.</div>

    <div class="form-group">
        <label>Tài khoản</label>
        <textarea x-model="accounts" class="h-40"></textarea>
    </div>
    <div class="form-group">
        <label>Danh mục</label>
        <textarea x-model="categories" class="h-40"></textarea>
    </div>
    <div class="form-group">
        <label>Thu chi</label>
        <textarea x-model="transactions" class="h-40"></textarea>
    </div>
    <div class="form-group">
        <button primary @click="importData">Nhập dữ liệu</button>
    </div>
</my-card>