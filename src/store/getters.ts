const getters = {
    // language:state=>(p)=>state.app.username+"---"+p,
    language:(state:any) => state.language,
    // token: state =>
    //  state.user.token
    //   ? state.user.token
    //   : localStorage.getItem("pear_admin_ant_token")
    //   ? localStorage.getItem("pear_admin_ant_token")
    //   : "",
    // addRouters:state=>state.app.addRouters
}

export default getters 