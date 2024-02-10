


export function addItemToCart(item) {
    console.log(item)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find((existingItem) => existingItem.id == item.id);
    if(found) {
        found.quantity = parseInt(found.quantity) + parseInt(item.quantity);
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

   console.log(cart);
}



