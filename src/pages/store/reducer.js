import {combineReducers} from 'redux'
const videoList = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_ALL_VIDEO':
            // console.log('11', action.video)
            return action.video
        default:
            return state
    }
}
const reducer = combineReducers({
    videoList
})
export default reducer