import { State } from "@/typings/vuex"

const getters = {  
    language:(state:State) => state.language,
    menus:(state:State) =>state.app?.menus
}

export default getters 