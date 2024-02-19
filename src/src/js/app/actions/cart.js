import productListStore from '../storage/productListStore';


export function addItemToCart(item) {
    console.log(item);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let foundCartItem = cart.find((existingItem) => existingItem.id == item.id);
    if(foundCartItem) {
        let combinedQuantity = parseInt(foundCartItem.quantity) + parseInt(item.quantity);
        let foundProd = productListStore.storageData.products.find((productListStoreItem) => productListStoreItem.id == item.id);
        if(combinedQuantity <= foundProd.amount_available) {
            foundCartItem.quantity = combinedQuantity;
        }
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(localStorage);
}



