export const UPDATE_CUSTOMER_SELECTION = 'UPDATE_CUSTOMER_SELECTION';
export const UPDATE_GROUP_QUERY = 'UPDATE_GROUP_QUERY';
export const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';
export const UPDATE_TOTAL_AMOUNT = 'UPDATE_TOTAL_AMOUNT';
export const updateGroupQuery = (groupQuery)=>({type: UPDATE_GROUP_QUERY, payload: groupQuery});
export const updateCustomerSelection = (customer)=>({type: UPDATE_CUSTOMER_SELECTION, payload: customer});
export const setCartItems = (cartItems)=>({type: UPDATE_CART_ITEMS, payload: cartItems});
export const updateTotalAmount = (amt)=>({type: UPDATE_TOTAL_AMOUNT, payload: amt});
