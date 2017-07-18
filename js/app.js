(function(angular) {
    // Your starting point. Enjoy the ride!
    angular.module('todoApp', []).controller('Todocontroller', ['$scope', '$location', TodoController])

    function TodoController($scope, $location) {
        //展示数据
        var vm = $scope;
        var todolist = [{ id: 1, name: 'jack0', isCompleted: false },
            { id: 2, name: 'jack1', isCompleted: false },
            { id: 3, name: 'jack2', isCompleted: true },
            { id: 4, name: 'jack3', isCompleted: false }
        ]
        vm.todolist = todolist;
        //添加数据
        vm.taskname = "";
        vm.add = function() {
                if (vm.taskName.trim() === '') {
                    return;
                }
                var id,
                    length = todolist.length;
                if (length === 0) {
                    id = 1;
                } else {
                    id = todolist[todolist.length - 1].id + 1;
                }
                todolist.push({ id: id, name: vm.taskName, isCompleted: false })
                vm.taskName = '';
            }
            //删除任务
        vm.del = function(id) {
            for (var i = 0; i < todolist.length; i++) {
                if (todolist[i].id === id) {
                    todolist.splice(i, 1);
                    break
                }
            }

        }

        //双击修改
        vm.edid = -1;
        vm.edit = function(id) {
            vm.edid = id;
        }
        vm.editsave = function() {
            vm.edid = -1;
        }

        //切换任务
        vm.isCheckedAll = false;
        vm.checkAll = function() {
            for (var i = 0; i < todolist.length; i++) {
                todolist[i].isCompleted = vm.isCheckedAll;
            }
        }

        //清除已完成
        vm.delcom = function() {
            for (var i = 0; i < todolist.length; i++) {
                if (todolist[i].isCompleted) {
                    todolist.splice(i, 1);
                    i--;
                }

            }
        }


        // 清除已完成显示和隐藏
        vm.isshow = function() {
            var onoff = false;
            for (var i = 0; i < todolist.length; i++) {
                if (todolist[i].isCompleted) {
                    onoff = true
                    break
                }
            }
            return onoff
        }




        //未完成任务数
        vm.getCount = function() {
            var count = 0;
            for (var i = 0; i < todolist.length; i++) {
                if (!todolist[i].isCompleted) {
                    count++

                }
            }
            return count
        }

        //显示不同状态任务 即当前的状态标签高亮显示
        vm.status = undefined;
        vm.location = $location;
        vm.$watch('location.url()', function(newval, oldval) {
            switch (newval) {
                case '/active':
                    vm.status = false;
                    break;
                case '/completed':
                    vm.status = true;
                    break;
                default:
                    vm.status = undefined;
                    break;


            }
        })









    }

})(angular);