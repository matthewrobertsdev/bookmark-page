const initialState = { bookmarks: getSavedBookmarks(), mode: 'none', checkedArray: [], numChecked: 0,
updateingBookmark: null, needsPassBookmark: false, updatingURL: '', updatingName: '', updatingIndex: null};

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_UPDATING_NAME':
                return { ...state, updatingName: action.name}
        case 'SET_UPDATING_URL':
                return { ...state, updatingURL: action.URL}
        case 'SET_MODE':
            return { ...state, mode: action.mode };
        case 'SET_BOOKMARKS':
            var validatedBookmarks=validateBookmarks(action.bookmarks);
            saveBookmarks(validatedBookmarks);
            return { ...state, bookmarks: validatedBookmarks }
        case 'ADD_BOOKMARK':
            let newBookmarks=[]
            if (state.bookmarks!==null){
                newBookmarks = state.bookmarks.slice(0);
                newBookmarks.unshift(action.bookmark);
            } else {
                newBookmarks=[action.bookmark]
            }
            saveBookmarks(newBookmarks);
            return { ...state, bookmarks: newBookmarks }
        case 'CREATE_UNCHECKED_ARRAY':
            let checkedArray = []
            for (let i = 0; i < state.bookmarks.length; i++) {
                checkedArray.push(false)
            }
            return { ...state, checkedArray: checkedArray, numChecked: 0}
        case 'TOGGLED_CHECKED_STATE':
            let newCheckedState = state.checkedArray.slice(0);
            newCheckedState[action.index] = !newCheckedState[action.index]
            let numChecked = 0;
            for (let i = 0; i < newCheckedState.length; i++) {
                if (newCheckedState[i]) {
                    numChecked += 1;
                }
            }
            return { ...state, checkedArray: newCheckedState, numChecked: numChecked }
        case 'DELETE_CHECKED':
            let keptBookmarks = [];
            for (let i = 0; i < state.bookmarks.length; i++) {
                if (!state.checkedArray[i]) {
                    keptBookmarks.push(state.bookmarks[i])
                }
            }
            saveBookmarks(keptBookmarks);
            return { ...state, bookmarks: keptBookmarks, numChecked: 0 }
        case 'SET_UPDATING_INDEX':
                return {...state, index: action.index}
        case 'UPDATE_BOOKMARK':
                let updatedBookmarks=state.bookmarks
                updatedBookmarks[action.index]=action.bookmark
                saveBookmarks(updatedBookmarks);
                return { ...state, bookmarks: updatedBookmarks}
        case 'APPEND_BOOKMARKS':
                let withAppend=state.bookmarks.concat(validateBookmarks(action.bookmarks));
                saveBookmarks(withAppend);
                return { ...state, bookmarks: withAppend}
        default:
            return state;
    }

}

export const validateBookmarks=function validateBookmarks(bookmarks){
    var validatedBookmarks=[];
    for(let i=0; i<bookmarks.length; i++){
        if (bookmarks[i].name&&bookmarks[i].name!==null&&bookmarks[i].name!==undefined&&bookmarks[i].name!==''
        &&bookmarks[i].URL&&bookmarks[i].URL!==null&&bookmarks[i].URL!==undefined&&bookmarks[i].URL!==''){
            validatedBookmarks.push(bookmarks[i]);
        }
    }
    return validatedBookmarks;
}

export const saveBookmarks=function saveBookmarks(bookmarks) {
    localStorage.setItem('savedBookmarks', JSON.stringify(bookmarks))
}

function getSavedBookmarks() {
    if (localStorage.getItem('savedBookmarks') !== null&&localStorage.getItem('savedBookmarks')!==undefined) {
        try{
            return JSON.parse(localStorage.getItem('savedBookmarks'));
        } catch(e){
            return [];
        }
    } else {
        return [];
    }
}

export default bookmarkReducer