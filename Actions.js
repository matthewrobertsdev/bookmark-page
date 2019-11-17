
export const setMode = (mode) => ({ type: 'SET_MODE', mode });

export const setBookmarks = (bookmarks) => ({ type: 'SET_BOOKMARKS', bookmarks });

export const addBookmark = (bookmark) => ({ type: 'ADD_BOOKMARK', bookmark });

export const createUncheckedArray = () => ({ type: 'CREATE_UNCHECKED_ARRAY' });

export const toggleCheckedState = (index) => ({ type: 'TOGGLED_CHECKED_STATE', index });

export const deleteChecked = () => ({ type: 'DELETE_CHECKED'});

export const setUpdatingName = (name) => ({ type: 'SET_UPDATING_NAME', name});

export const setUpdatingURL = (URL) => ({ type: 'SET_UPDATING_URL', URL});

export const setUpdatingIndex = (index) => ({ type: 'SET_UPDATING_INDEX', index});

export const updateBookmark = (index, bookmark) => ({ type: 'UPDATE_BOOKMARK', index, bookmark});

export const appendBookmarks = (bookmarks) => ({ type: 'APPEND_BOOKMARKS', bookmarks});


