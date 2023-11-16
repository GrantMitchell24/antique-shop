const emailInvoiceHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/invoice', {
        method: 'POST',
        body: JSON.stringify({ status: "invoice" }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("Thanks for your interest. Please check your email for the invoice.");
        document.location.replace('/cart');
    } else {
        alert('Failed to email invoice');
    }
};

document.querySelector('.email-invoice').addEventListener('click', emailInvoiceHandler);