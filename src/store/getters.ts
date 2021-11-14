import {State} from './index'
const getters = {
    // language:state=>(p)=>state.app.username+"---"+p,
    language:(state:State) => state.language,
    menus:(state:State) =>state.menus
    // token: state =>
    //  state.user.token
    //   ? state.user.token
    //   : localStorage.getItem("pear_admin_ant_token")
    //   ? localStorage.getItem("pear_admin_ant_token")
    //   : "",
    // addRouters:state=>state.app.addRouters
}

export default getters 