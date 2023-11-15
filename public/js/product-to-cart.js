const addToCartHandler = async (event) => {
    event.preventDefault();
    console.log("User tried to add to cart");
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        console.log(id);
    
        if (response.ok) {
          document.location.replace('/cart');
        } else {
          alert('Failed to delete project');
        }
      }
};

document.querySelector('.add-to-cart').addEventListener('click', addToCartHandler);