import store from '../store'

const ifNotAuthenticated = (to, from, next) =>{
    // Router chỉ cho phép vào khi chưa đăng nhập
    if(store.getters.isLogin === false){
        next();
    } else {
        next({
            name: 'home-page',
            query:{
                redirect : to.name
            }
        })
    }
}

const ifAuthenticated = (to, from, next) => {
    // Router chỉ cho phép truy cập khi đã đăng nhập
    if(store.getters.isLogin === true){
        next();
    } else {
        next({
            name: 'login',
            query:{
                redirect : to.name
            }
        })
    }
}

export {
    ifAuthenticated , ifNotAuthenticated
}