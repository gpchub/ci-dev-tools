<div x-data="inputNumber" x-model="<?= $model; ?>" x-modelable="raw" <?= $attributes; ?>>
    <input type="text" x-ref="input" x-model="masked" <?= $disabled ? ":disabled=\"{$disabled}\"" : '' ?>/>
</div>