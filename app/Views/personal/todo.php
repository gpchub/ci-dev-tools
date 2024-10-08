<?= $this->extend('layout/app') ?>

<?= $this->section('hero') ?>
    <h1><?= $page_title ?></h1>
<?= $this->endSection() ?>

<?= $this->section('header_styles') ?>
<style>
    .groups h2 { margin-bottom: 1rem }

    .item-actions {
        margin-left: auto;
        min-width: 60px;
        padding-left: 10px;
        text-align: right;
    }
    .item-actions button {
        background: transparent;
        color: #777;
        padding: 0;
        font-size: 20px;
        opacity: 0;
        transition: all ease-in-out .1s;
    }
    .item-actions button.is-remove {
        color: #C96868;
    }
    .item-actions button.is-save {
        color: #09a47d;
    }

    button.is-unpin,
    button.is-pin {
        position: absolute;
        top: -16px;
        left: -16px;
        width: 32px;
        height: 32px;
        display: grid;
        place-content: center;
        font-size: 20px;
        border: none;
        background: transparent;
        box-shadow: none;
    }

    button.is-unpin i,
    button.is-pin i {
        transform: rotate(-45deg);
    }

    button.is-unpin i {
        color: #d97706;
    }

    .group-item:hover button,
    .task-item:hover button {
        opacity: 1;
    }

    .group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }

    .group-item__title {
        color: var(--color-text);
        display: flex;
        align-items: center;
        width: 100%;
    }
    .group-item__title i {
        padding-top: 2px;
    }
    .group-item__title.active,
    .group-item__title:hover {
        color: #6b14e2;
        font-weight: 600;
    }

    .task-item {
        display: flex;
        padding: .5rem 1rem;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        margin-bottom: 8px;
        position: relative;
    }

    .task-item__view {
        display: flex;
        padding: 0.5rem 0;
    }

    .task-item [type="checkbox"] {
        margin-right: 10px;
        width: 20px;
    }

    .task-item.done {
        color: #999;
        text-decoration: line-through;
    }

    .task-item.editing {
        padding-left: 40px;
    }

    .sortable-ghost {
        opacity: .5 !important;
    }
</style>

<!-- Alpine Sortable -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/sort@3.x.x/dist/cdn.min.js"></script>

<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <section class="container" x-data="app" x-on:sorted.window="afterSort">
        <div class="mb-4">
            <h3>Lưu ý</h3>
            <ul>
                <li>Double click tên nhóm hoặc task để edit. Nhấn Enter để lưu lại. Nhấn Escape để thoát edit.</li>
                <li>Dữ liệu chỉ được lưu ở trình duyệt này. Sử dụng trình duyệt khác sẽ không thấy dữ liệu ở trình duyệt này.</li>
            </ul>
        </div>
        <div class="grid md:grid-cols-3 gap-3 todo">
            <!-- sidebar -->
            <div class="md:col-span-1">
                <g-card data-title="Nhóm" class="groups mb-3">
                    <template x-for="(group, index) in groups" :key="group.id">
                        <div class="group-item" :id="group.id" @dblclick="editGroup(group)">
                            <a href="javascript:;"
                                x-show="!group.editing"
                                @click.prevent="openGroup(group)"
                                class="group-item__title"
                                :class="{'active': group.id === currentGroup.id}"
                            >
                                <i class='bx bx-chevron-right'></i> <span x-text="group.title"></span>
                            </a>
                            <input x-show="group.editing"
                                type="text"
                                class="group-item__input"
                                :id="group.id + '-input'"
                                x-model="group.title"
                                @keydown.enter="saveGroup(group)"
                                @keydown.escape="cancelEditGroup(group)"
                            />
                            <div class="item-actions">
                                <button class="is-edit" x-show="!group.editing" @click="editGroup(group)" data-tooltip="Sửa">
                                    <i class='bx bxs-edit'></i>
                                </button>
                                <button class="is-remove" x-show="!group.editing" @click="removeGroup(group)" data-tooltip="Xoá">
                                    <i class='bx bx-trash' ></i>
                                </button>
                                <button class="is-cancel" x-show="group.editing" @click="cancelEditGroup(group)" data-tooltip="Huỷ">
                                    <i class='bx bx-x-circle'></i>
                                </button>
                                <button class="is-save" x-show="group.editing" @click="saveGroup(group)" data-tooltip="Lưu">
                                    <i class='bx bx-check-circle' ></i>
                                </button>
                            </div>
                        </div>
                    </template>

                    <div class="form-group mt-3">
                        <input type="text" placeholder="Thêm nhóm mới" @keydown.enter="addGroup" x-model="newGroupTitle" />
                    </div>
                </g-card>

            </div> <!-- /sidebar -->

            <div class="card md:col-span-2">
                <h2 class="flex justify-between items-center flex-wrap">
                    <span x-text="currentGroup.title"></span>
                    <a class="text-base font-normal" href="#" @click.prevent="clearAllTasks">
                        <i class='bx bx-trash' ></i> Xoá hết tasks
                    </a>
                </h2>
                <div class="new-task mb-3">
                    <input type="text" x-model="newTaskTitle" placeholder="Thêm task mới" @keydown.enter="addTask" />
                </div>

                <!-- pin tasks -->
                <div class="tasks mb-4"
                    x-cloak x-show="currentGroup.pinTasks.length"
                    x-data x-ref="tasksList"
                    x-sort="(item, position) => { onSortTask(currentGroup.pinTasks, item, position) }"
                >
                    <template x-for="task in currentGroup.pinTasks" :key="task.id">
                        <div class="task-item"
                            :class="{ 'done': task.done, 'editing': task.editing }"
                            @dblclick.stop="editTask(task)"
                            x-sort:item="task"
                        >
                            <div class="task-item__view" x-show="!task.editing">
                                <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)" />
                                <span x-text="task.title"></span>
                            </div>

                            <input x-show="task.editing"
                                type="text"
                                class="task-item__edit"
                                :id="task.id + '-input'"
                                x-model="task.title"
                                @keydown.enter="saveTask(task)"
                                @keydown.escape="cancelEditTask(task)"
                            />
                            <button class="is-unpin" x-show="!task.editing" @click="unpinTask(task)" data-tooltip="Bỏ ghim">
                                <i class='bx bxs-pin'></i>
                            </button>
                            <div class="item-actions">
                                <button class="is-edit" x-show="!task.editing" @click="editTask(task)" data-tooltip="Sửa">
                                    <i class='bx bxs-edit'></i>
                                </button>
                                <button class="is-remove" x-show="!task.editing" @click="removeTask(task, 'pin')" data-tooltip="Xoá">
                                    <i class='bx bx-trash' ></i>
                                </button>
                                <button class="is-cancel" x-show="task.editing" @click="cancelEditTask(task)" data-tooltip="Huỷ">
                                    <i class='bx bx-x-circle'></i>
                                </button>
                                <button class="is-save" x-show="task.editing" @click="saveTask(task)" data-tooltip="Lưu">
                                    <i class='bx bx-check-circle' ></i>
                                </button>
                            </div>
                        </div>
                    </template>
                </div> <!-- /.tasks -->

                <!-- active tasks -->
                <div class="tasks mb-4"
                    x-data
                    x-cloak x-show="currentGroup.activeTasks.length"
                    x-ref="tasksList"
                    x-sort="(item, position) => { onSortTask(currentGroup.activeTasks, item, position) }"
                >
                    <template x-for="task in currentGroup.activeTasks" :key="task.id">
                        <div class="task-item"
                            :class="{ 'done': task.done, 'editing': task.editing }"
                            @dblclick.stop="editTask(task)"
                            x-sort:item="task"
                        >
                            <div class="task-item__view" x-show="!task.editing">
                                <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)" />
                                <span x-text="task.title"></span>
                            </div>

                            <input x-show="task.editing"
                                type="text"
                                class="task-item__edit"
                                :id="task.id + '-input'"
                                x-model="task.title"
                                @keydown.enter="saveTask(task)"
                                @keydown.escape="cancelEditTask(task)"
                            />

                            <div class="item-actions">
                                <button class="is-pin" x-show="!task.editing" @click="pinTask(task)" data-tooltip="Ghim lên đầu">
                                    <i class='bx bx-pin'></i>
                                </button>
                                <button class="is-edit" x-show="!task.editing" @click="editTask(task)" data-tooltip="Sửa">
                                    <i class='bx bxs-edit'></i>
                                </button>
                                <button class="is-remove" x-show="!task.editing" @click="removeTask(task, 'active')" data-tooltip="Xoá">
                                    <i class='bx bx-trash' ></i>
                                </button>
                                <button class="is-cancel" x-show="task.editing" @click="cancelEditTask(task)" data-tooltip="Huỷ">
                                    <i class='bx bx-x-circle'></i>
                                </button>
                                <button class="is-save" x-show="task.editing" @click="saveTask(task)" data-tooltip="Lưu">
                                    <i class='bx bx-check-circle' ></i>
                                </button>
                            </div>
                        </div>
                    </template>
                    <div class="help-text italic mt-2">Kéo thả để sắp xếp thứ tự tasks</div>
                </div> <!-- /.tasks -->

                <!-- done tasks -->
                <div x-show="currentGroup.doneTasks.length > 0" x-cloak>
                    <h4 class="flex justify-between items-center flex-wrap mb-2">
                        <span>Tasks đã xong</span>
                        <a class="text-base font-normal" href="#" @click.prevent="clearAllDoneTasks">
                            <i class='bx bx-trash' ></i> Xoá hết
                        </a>
                    </h4>
                    <div class="tasks mb-3">
                        <template x-for="(task, index) in currentGroup.doneTasks" :key="task.id">
                            <div class="task-item" :class="{ 'done': task.done, 'editing': task.editing }">
                                <div class="task-item__view" x-show="!task.editing">
                                    <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)" />
                                    <span x-text="task.title"></span>
                                </div>

                                <div class="item-actions">
                                    <button class="is-remove" x-show="!task.editing" @click="removeTask(task, 'done')" data-tooltip="Xoá">
                                        <i class='bx bx-trash' ></i>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?= $this->endSection() ?>

<?= $this->section('footer_scripts') ?>

<script type="module">
    import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
    window.nanoid = nanoid;
</script>

<?= $this->include('personal/partials/todo_script') ?>

<?= $this->endSection() ?>