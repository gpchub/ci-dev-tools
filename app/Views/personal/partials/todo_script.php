<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            groups: Alpine.$persist([{
                id: 'my-tasks',
                title: 'My tasks',
                pinTasks: [],
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

                // Thêm pinTasks vào mỗi group ở version mới
                this.groups.forEach((x, index) => {
                    if (!Object.keys(x).includes('pinTasks')) {
                        x.pinTasks = [];
                    }
                });

                this.currentGroup = this.groups[0];
            },

            newGroup(title) {
                return {
                    id: 'g-' + nanoid(),
                    title: title,
                    pinTasks: [],
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

            removeTask(task, list = '') {
                task.editing = false;
                let taskList = this.currentGroup.activeTasks;
                if (list === 'done') {
                    taskList = this.currentGroup.doneTasks;
                } else if (list === 'pin') {
                    taskList = this.currentGroup.pinTasks;
                }

                let index = taskList.findIndex(x => x.id === task.id);
                taskList.splice(index, 1);
            },

            pinTask(task) {
                //đóng edit khi pin
                task.editing = false;

                const fromTask = this.currentGroup.activeTasks;
                const toTask = this.currentGroup.pinTasks;

                this.moveTask(task, fromTask, toTask);
            },

            unpinTask(task) {
                //đóng edit khi unpin
                task.editing = false;

                const fromTask = this.currentGroup.pinTasks;
                const toTask = this.currentGroup.activeTasks;

                this.moveTask(task, fromTask, toTask);
            },

            toggleTaskStatus(task, list = '') {
                //đóng edit khi đổi status
                task.editing = false;

                let fromList = this.currentGroup.activeTasks;
                if (list === 'done') {
                    fromList = this.currentGroup.doneTasks;
                } else if (list === 'pin') {
                    fromList = this.currentGroup.pinTasks;
                }

                // nếu đổi trạng thái task đã xong thì chuyển sang active tasks
                let toList = list === 'done' ? this.currentGroup.activeTasks : this.currentGroup.doneTasks;

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

            async clearAllTasks() {
                let dialog = new ConfirmDialog({
					questionTitle: 'Xoá hết tasks',
					questionText: 'Bạn có chắc muốn xoá hết tasks không?',
					type: 'danger',
				});
				const isConfirmed = await dialog.confirm();
				if (!isConfirmed) {
					return;
				}

                this.currentGroup.activeTasks = [];
                this.currentGroup.doneTasks = [];
                this.currentGroup.pinTasks = [];
            },

            clearAllDoneTasks() {
                this.currentGroup.doneTasks = [];
            },

            onSortTask(list, item, position) {
                let oldIndex = list.findIndex(x => x.id === item.id);

                list.splice(oldIndex, 1);
                list.splice(position, 0, item);

                // cập nhật lại keys cho x-for, nếu không UI hiển thị sai thứ tự
                // @see: https://github.com/alpinejs/alpine/discussions/4157
                this.$refs.tasksList.querySelector("template")._x_prevKeys = list.map((item) => item.id);
            },
        }));
    })
</script>