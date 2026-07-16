const sampleCart = [
    {
        product: {
            productId: "123456",
            name: "Sample Product",
            images: "https://via.placeholder.com/300",
            price: 999.99,
            labeledPrice: 1299.99
        },
        qty: 1
    },
    {
        product: {
            productId: "789012",
            name: "Another Product",
            images: "https://via.placeholder.com/300",
            price: 499.99,
            labeledPrice: 599.99
        },
        qty: 2
    },
    {
        product: {
            productId: "345678",
            name: "Third Product",
            images: "https://via.placeholder.com/300",
            price: 199.99,
            labeledPrice: 249.99
        },
        qty: 1
    }, 
    {
        product: {
            productId: "901234",
            name: "Fourth Product",
            images: "https://via.placeholder.com/300",
            price: 299.99,
            labeledPrice: 349.99
        },
        qty: 3
    }
]

export function getCart() {
const cartString = localStorage.getItem("cart");
if (!cartString) {
    localStorage.setItem("cart", []);
    return [];
}
const cart = JSON.parse(cartString);
return cart;
}

export function addToCart(product, qty) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.product.productId === product.productId);
    if (existingProductIndex == -1 && qty > 0) {
        cart.push({ product: {
            productId: product.productId,
            name: product.name,
            images: product.images[0],
            price: product.price,
            labeledPrice: product.labeledPrice
        }, 
        qty: qty 
    });
    } 
    if (existingProductIndex != -1) {
        cart[existingProductIndex].qty += qty;
        if (cart[existingProductIndex].qty <= 0) {
            cart.splice(existingProductIndex, 1);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));    
}

export function getCartTotal(cart) {
    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.qty;
    });
    return total;
}
//getCartTotal(getCart());
//getCartTotal(sampleCart);