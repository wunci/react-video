import {combineReducers} from 'redux'
const videoList = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_ALL_VIDEO':
            return action.video
        default:
            return state
    }
}
const toast = (state = {icon:'',message:'',isShow:false}, action) => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return action.toast
        default:
            return state
    }
}
const reducer = combineReducers({
    videoList,
    toast
})
export default reducer