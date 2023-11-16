const addToCartHandler = async (event) => {
    event.preventDefault();
    console.log("User tried to add to cart");
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        console.log(id);
        const response = await fetch('/api/users/cart', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
          });
    
        if (response.ok) {
          document.location.replace('/cart');
        } else {
          alert('Failed to add product to cart');
        }
      }
};

document.querySelector('.add-to-cart').addEventListener('click', addToCartHandler);