const IS_SEARCH = 'IS_SEARCH'

const storeSearchResult = (data) => {
    return{
        type: IS_SEARCH,
        payload: data
    }
}

export {storeSearchResult, IS_SEARCH}