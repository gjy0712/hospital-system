<template>
    <div class="search-doctor-container">
        我是按医生挂号
        <!-- 绑定class，当items循环中的id等于我们设置的选中todoId时候,就会加上active这个calss,这样样式就会发生变化。-->
        <a @click="goList(item.id)" class="list-todo list activeListClass" :class="{'active': item.id === todoId}" v-for="item in items">
            <span class="icon-lock" v-if="item.locked"></span>

            <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
            {{item.title}}
        </a>
        <a class=" link-list-new" @click="addTodoList">
      <span class="icon-plus">
      </span>
            新增
        </a>
    </div>
</template>

<script>
    import { getTodoList, addTodo } from '../../api/api'; // 引入我们 封装好的两个接口函数。
    export default {
        name: "search-doctor",
        data() {
            return {
                items: [], // 菜单数据
                todoId: '' // 默认选中id
            };
        },
        created() { // 调用请求菜单列表数据的接口
            getTodoList({}).then(res => {
                console.log(res)
                const TODOS = res.data.todos; // 数据都会返回在res.data里面。
                this.items = TODOS; // 我的把菜单数据赋值给定义的this.items
                this.todoId = TODOS[0].id; // 把菜单数据的默认的第一个对象的id赋值给默认选中的id
            });
        },
        methods: {
            goList(id) { // 点击菜单时候,替换选中id
                this.todoId = id;
            },
            addTodoList() { // 点击新增按钮时候
                // 调用新增菜单的接口，在接口调用成功在请求数据
                addTodo({}).then(data => {
                    getTodoList({}).then(res => {
                        const TODOS = res.data.todos;
                        this.todoId = TODOS[TODOS.length - 1].id;
                        this.items = TODOS;
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .search-doctor-container {

    }
</style>