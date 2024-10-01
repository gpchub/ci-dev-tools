<div x-data="colorPicker" class="relative color-picker-wrapper" x-model="<?= $model ?>" x-modelable="color">
    <input x-ref="input" x-model="color">
    <div class="form-input-icon is-prefix">
        <div class="color-trigger" x-ref="trigger"></div>
    </div>
</div>
