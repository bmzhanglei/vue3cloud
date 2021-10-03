import { Module } from "vuex";
import { State } from "..";
import { Todo } from "../../types";
import http from 'apis/request'
const initialState = {
  todos: [
    {
      id: 1,
      name: "vue3+ts",
      completed: false,
    },
  ] as Todo[],
};

export type TodoState = typeof initialState;

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    initTodo(state, payload: Todo[]) {
      state.todos = payload;
    },
    addTodo(state, payload: Todo) {
      state.todos.push(payload);
    },
  },
  actions: {
    initTodo({ commit }) {
      setTimeout(() => {
        commit("initTodo", [
          {
            id: 1,
            name: "vue3--------3+ts",
            completed: false,
          },
        ]);
      }, 500);
    },
    addTodo({commit,state},payload){
      http.get<Todo>("/api/todos/1").then(data=>{
        console.log(data)
        // commit("addTodo", data.data)
      })
      setTimeout(() => {
        commit("addTodo", {
          id: state.todos.length+1,
          name: payload,
          completed: false,
        })
      },500)
    }
  },
} as Module<TodoState, State>;
