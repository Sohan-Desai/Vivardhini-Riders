import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from '../constants/favoriteConstants';

export const favoriteReducer = (state = { favItems: [] }, action) => {

    switch (action.type) {
        case ADD_TO_FAVORITE:
            const item = action.payload;

            const isItemExist = state.favItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    favItems: state.favItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    favItems: [...state.favItems, item]
                };
            }
        case REMOVE_FROM_FAVORITE:
            return {
                ...state,
                favItems: state.favItems.filter((i) => i.product !== action.payload)
            }
        default:
            return state

    }
}