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

                <!-- active tasks -->
                <div class="tasks mb-4"
                    x-cloak x-show="currentGroup.activeTasks.length"
                    x-ref="activeTasksList"
                    x-sort="(item, position) => { onSortTask(item, position) }"
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
                                <button class="is-edit" x-show="!task.editing" @click="editTask(task)" data-tooltip="Sửa">
                                    <i class='bx bxs-edit'></i>
                                </button>
                                <button class="is-remove" x-show="!task.editing" @click="removeTask(task)" data-tooltip="Xoá">
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
                                    <button class="is-remove" x-show="!task.editing" @click="removeTask(task)" data-tooltip="Xoá">
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

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            groups: Alpine.$persist([{
                id: 'my-tasks',
                title: 'My tasks',
                activeTasks: [],
                doneTasks: [],
                editing: false,
            }]).as('gpc-todo-groups'),

            activeTasks: [],

            newGroupTitle: '',
            groupAutoNumber: Alpine.$persist(1).as('gpc-todo-group-auto-number'), //dùng đặt tên group theo thứ tự tăng dần khi không nhập tên group khi tạo mới

            newTaskTitle: '',

            currentGroup: {},

            init() {
                const _this = this;

                /**
                 * Copy dữ liệu trong localStorage từ key cũ sang key mới
                 */
                const groups_old = localStorage.getItem("_x_groups");
                const groupAutoNumber_old = localStorage.getItem("_x_groupAutoNumber");
                if (groups_old) {
                    this.groups = JSON.parse(groups_old).map(x => ({
                        id: x.id,
                        title: x.title,
                        activeTasks: x.tasks.filter(x => !x.done),
                        doneTasks: x.tasks.filter(x => x.done),
                        editing: false,
                    }));
                    this.groupAutoNumber = groupAutoNumber_old;

                    // xoá key cũ
                    localStorage.removeItem("_x_groups");
                    localStorage.removeItem("_x_groupAutoNumber");
                }

                this.currentGroup = this.groups[0];
            },

            newGroup(title) {
                return {
                    id: 'g-' + nanoid(),
                    title: title,
                    activeTasks: [],
                    doneTasks: [],
                    editing: false,
                }
            },

            newTask(title) {
                return {
                    id: 't-' + nanoid(),
                    title: title,
                    done: false,
                    editing: false,
                    position: 0,
                }
            },

            addGroup() {
                let title = this.newGroupTitle.trim().length ? this.newGroupTitle.trim() : `My tasks ${this.groupAutoNumber}`;
                this.groups.push(this.newGroup(title));

                this.newGroupTitle = '';
                this.groupAutoNumber++;
            },

            openGroup(group) {
                this.currentGroup = group;
            },

            editGroup(group) {
                //tắt edit ở tất cả groups
                this.groups.forEach(x => { x.editing = false; });

                //mở edit ở group này
                this.group.editing = true;

                //focus vào input edit
                let input = this.$el.querySelector('#' + group.id + '-input');
                if (input) {
                    // set timeout để thực hiện sau khi alpine cập nhật DOM xong
                    setTimeout(() => {
                        input.focus();
                    }, 150);
                }
            },

            saveGroup(group) {
                group.editing = false;
            },

            cancelEditGroup(group) {
                group.editing = false;
            },

            removeGroup(group) {
                // luôn giữ lại ít nhất 1 group
                if (this.groups.length == 1) {
                    return;
                }

                let index = this.groups.findIndex(x => x.id === group.id);
                this.groups.splice(index, 1);

                // nếu xoá group đang mở thì mở lại group đầu tiên
                if (this.currentGroup.id === group.id) {
                    this.currentGroup = this.groups[0];
                }
            },

            addTask() {
                let title = this.newTaskTitle.trim();
                if (!title) {
                    return;
                }

                // task mới thêm luôn là active
                this.currentGroup.activeTasks.push(this.newTask(title))
                this.newTaskTitle = '';
            },

            removeTask(task) {
                task.editing = false;
                let taskList = task.done ? this.currentGroup.doneTasks : this.currentGroup.activeTasks;
                let index = taskList.findIndex(x => x.id === task.id);
                taskList.splice(index, 1);
            },

            toggleTaskStatus(task) {
                //đóng edit khi đổi status
                task.editing = false;

                let fromList = task.done ? this.currentGroup.doneTasks : this.currentGroup.activeTasks;
                let toList = task.done ? this.currentGroup.activeTasks : this.currentGroup.doneTasks;

                this.moveTask(task, fromList, toList);

                task.done = !task.done;
            },

            moveTask(task, fromList, toList) {
                let index = fromList.findIndex(x => x.id === task.id);
                fromList.splice(index, 1);
                toList.push(task);
            },

            editTask(task) {
                /**
                 * đóng edit ở tất cả các active tasks
                 * edit chỉ có ở active tasks, tasks đã xong thì không cho edit
                 */
                this.currentGroup.activeTasks.forEach(x => { x.editing = false; });

                //mở edit ở task này
                task.editing = true;

                //focus vào input edit
                let input = this.$el.querySelector('#' + task.id + '-input');
                if (input) {
                    // set timeout để thực hiện sau khi alpine cập nhật DOM xong
                    setTimeout(() => {
                        input.focus();
                    }, 150);
                }
            },

            saveTask(task) {
                task.editing = false;
            },

            cancelEditTask(task) {
                task.editing = false;
            },

            clearAllTasks() {
                this.currentGroup.activeTasks = [];
                this.currentGroup.doneTasks = [];
            },

            clearAllDoneTasks() {
                this.currentGroup.doneTasks = [];
            },

            onSortTask(item, position) {
                //chỉ cho sort các tasks chưa làm
                let taskList = this.currentGroup.activeTasks;
                let oldIndex = taskList.findIndex(x => x.id === item.id);

                taskList.splice(oldIndex, 1);
                taskList.splice(position, 0, item);

                this.currentGroup.activeTasks = taskList;

                // cập nhật lại keys cho x-for, nếu không UI hiển thị sai thứ tự
                // @see: https://github.com/alpinejs/alpine/discussions/4157
                this.$refs.activeTasksList.querySelector("template")._x_prevKeys = taskList.map((item) => item.id);
            },
        }));
    })
</script>

<?= $this->endSection() ?>