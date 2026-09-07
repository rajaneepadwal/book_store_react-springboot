const { useState } = React;


/* =========================
   NAVBAR
========================= */

function Navbar({ setPage, cartCount }) {

    return (
        <nav className="navbar">

            <h2
                className="logo"
                onClick={() => setPage("home")}
            >
                Book Store by Rajanee using Springboot with React
            </h2>

            <div className="nav-links">

                <button onClick={() => setPage("home")}>
                    Home
                </button>

                <button onClick={() => setPage("catalogue")}>
                    Catalogue
                </button>

                <button onClick={() => setPage("login")}>
                    Login
                </button>

                <button onClick={() => setPage("register")}>
                    Register
                </button>

                <button onClick={() => setPage("cart")}>
                    Cart ({cartCount})
                </button>

            </div>

        </nav>
    );
}


/* =========================
   HOME PAGE
========================= */

function Home({ setPage }) {

    return (

        <div className="home">

            <section className="hero">

                <h1>
                    Welcome to Book Store
                </h1>

                <p>
                    Discover books you'll love.
                </p>

                <button
                    className="main-button"
                    onClick={() => setPage("catalogue")}
                >
                    Browse Catalogue
                </button>

            </section>


            <section className="features">

                <div className="feature">

                    <h2>📚 Large Collection</h2>

                    <p>
                        Explore books from different
                        genres and authors.
                    </p>

                </div>


                <div className="feature">

                    <h2>💰 Affordable Prices</h2>

                    <p>
                        Find your favourite books
                        at reasonable prices.
                    </p>

                </div>


                <div className="feature">

                    <h2>⭐ Easy to Browse</h2>

                    <p>
                        Search and explore our
                        collection easily.
                    </p>

                </div>

            </section>

        </div>
    );
}


/* =========================
   LOGIN PAGE
========================= */

function Login({ setPage, onLogin }) {

    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = React.useState("");


    function handleChange(event) {

        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });

    }


    function login(event) {

        event.preventDefault();

        fetch("/api/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Login failed");
            }

            return response.json();

        })

        .then(data => {

            if (data) {

                setMessage("Login successful!");

                onLogin(data);

            } else {

                setMessage("Invalid email or password.");

            }

        })

        .catch(error => {

            console.error(error);

            setMessage("Invalid email or password.");

        });

    }


    return (

        <div className="form-container">

            <h2>Login</h2>

            <form onSubmit={login}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Login
                </button>

            </form>


            {message && (
                <p className="message">
                    {message}
                </p>
            )}


            <p>
                Don't have an account?

                <button
                    className="link-button"
                    onClick={() => setPage("register")}
                >
                    Register
                </button>

            </p>

        </div>
    );
}


/* =========================
   REGISTRATION PAGE
========================= */

function Register({ setPage }) {

    const [user, setUser] = useState({

        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""

    });


    const [message, setMessage] = useState("");


    function handleChange(event) {

        setUser({

            ...user,

            [event.target.name]:
                event.target.value

        });

    }


    function register(event) {

        event.preventDefault();

        fetch("/api/users/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            return response.json();

        })

        .then(data => {

            setMessage("Registration successful!");

            setUser({

                name: "",
                email: "",
                password: "",
                phone: "",
                address: ""

            });

        })

        .catch(error => {

            console.error(error);

            setMessage("Registration failed.");

        });

    }


    return (

        <div className="form-container">

            <h1>Create Account</h1>


            <form onSubmit={register}>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={handleChange}
                />


                <textarea
                    name="address"
                    placeholder="Address"
                    value={user.address}
                    onChange={handleChange}
                />


                <button
                    type="submit"
                    className="main-button"
                >
                    Register
                </button>

            </form>


            {message && (
                <p className="message">
                    {message}
                </p>
            )}


            <p>
                Already have an account?

                <button
                    className="link-button"
                    onClick={() => setPage("login")}
                >
                    Login
                </button>

            </p>

        </div>
    );
}


/* =========================
   CATALOGUE PAGE
========================= */

function Catalogue({ onBuyNow }) {

    const [books, setBooks] = React.useState([]);

    const [search, setSearch] = React.useState("");


    React.useEffect(() => {

        fetch("/api/books")

            .then(response => response.json())

            .then(data => setBooks(data))

            .catch(error =>
                console.error("Error:", error)
            );

    }, []);


    const filteredBooks = books.filter(book =>
        book.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    return (

        <div className="catalogue">

            <h1>Book Catalogue</h1>


            <input
                className="search"
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


            <div className="book-grid">

                {filteredBooks.map(book => (

                    <div
                        className="book-card"
                        key={book.id}
                    >

                        <img
                            src={book.imageUrl}
                            alt={book.title}
                        />


                        <div className="book-details">

                            <h2>
                                {book.title}
                            </h2>


                            <p>
                                Author: {book.author}
                            </p>


                            <p>
                                Category: {book.category}
                            </p>


                            <h3>
                                ₹{book.price}
                            </h3>


                            <button
                                onClick={() => onBuyNow(book)}
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}


/* =========================
   CART PAGE
========================= */

function Cart({
    cart,
    setPage,
    removeFromCart
}) {

    const total = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );


    return (

        <div className="catalogue">

            <h1>Your Cart</h1>


            {cart.length === 0 ? (

                <div>

                    <p>
                        Your cart is empty.
                    </p>

                    <br />

                    <button
                        className="main-button"
                        onClick={() => setPage("catalogue")}
                    >
                        Browse Catalogue
                    </button>

                </div>

            ) : (

                <>

                    <div className="book-grid">

                        {cart.map(item => (

                            <div
                                className="book-card"
                                key={item.id}
                            >

                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                />


                                <div className="book-details">

                                    <h2>
                                        {item.title}
                                    </h2>


                                    <p>
                                        Author: {item.author}
                                    </p>


                                    <p>
                                        Quantity: {item.quantity}
                                    </p>


                                    <h3>
                                        ₹{item.price * item.quantity}
                                    </h3>


                                    <button
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="form-container">

                        <h2>
                            Total: ₹{total}
                        </h2>


                        <br />


                        <button
                            className="main-button"
                            onClick={() => setPage("checkout")}
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}


/* =========================
   CHECKOUT PAGE
========================= */

function Checkout({
    cart,
    loggedInUser,
    setPage,
    clearCart
}) {

    const [message, setMessage] = useState("");

    const total = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.quantity),
        0
    );


    function placeOrder() {

        const orderData = {

            userId: loggedInUser.id,

            total: total,

            items: cart.map(item => ({

                bookId: item.bookId,

                quantity: item.quantity,

                price: item.price

            }))

        };


        fetch("/api/orders", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(orderData)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Order failed");
            }

            return response.json();

        })

        .then(async data => {

    await clearCart();

    setMessage(
        "Order placed successfully! Order ID: "
        + data.id
    );

})

        .catch(error => {

            console.error(error);

            setMessage(
                "Failed to place order."
            );

        });

    }


    return (

        <div className="form-container">

            <h1>Checkout</h1>


            <p>
                Number of items: {cart.length}
            </p>


            <h2>
                Total Amount: ₹{total}
            </h2>


            <br />


            {message && (

                <p className="message">
                    {message}
                </p>

            )}


            {!message && (

                <button
                    className="main-button"
                    onClick={placeOrder}
                >
                    Place Order
                </button>

            )}


            <br />
            <br />


            <button
                className="link-button"
                onClick={() => setPage("cart")}
            >
                Back to Cart
            </button>

        </div>
    );
}


/* =========================
   MAIN APP
========================= */

function App() {

    const [page, setPage] =
        useState("home");


    const [loggedInUser, setLoggedInUser] =
        useState(null);


    const [cart, setCart] =
        useState([]);


    const [pendingBook, setPendingBook] =
        useState(null);


    /* =========================
       LOAD CART FROM DATABASE
    ========================= */

    function loadCart(userId) {

        fetch(`/api/cart/${userId}`)

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to load cart");
                }

                return response.json();

            })

            .then(data => {

                setCart(data);

            })

            .catch(error => {

                console.error(
                    "Error loading cart:",
                    error
                );

            });
    }


    /* =========================
       LOGIN SUCCESS
    ========================= */

    function handleLogin(user) {

        setLoggedInUser(user);


        /*
         If a book was selected
         before login, save it
         directly into database.
        */

        if (pendingBook) {

            fetch("/api/cart", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    userId: user.id,

                    bookId: pendingBook.id,

                    quantity: 1

                })

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to add book"
                    );
                }

                return response.json();

            })

            .then(data => {

                setPendingBook(null);

                loadCart(user.id);

                setPage("cart");

            })

            .catch(error => {

                console.error(
                    "Error adding book:",
                    error
                );

            });

        } else {

            loadCart(user.id);

            setPage("home");

        }

    }


    /* =========================
       BUY NOW
    ========================= */

    function handleBuyNow(book) {

        /*
         User is not logged in.
         Remember selected book.
        */

        if (!loggedInUser) {

            setPendingBook(book);

            setPage("login");

            return;

        }


        /*
         User is logged in.
         Save book in database.
        */

        fetch("/api/cart", {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                userId: loggedInUser.id,

                bookId: book.id,

                quantity: 1

            })

        })

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Failed to add book"
                );
            }

            return response.json();

        })

        .then(data => {

            loadCart(loggedInUser.id);

            setPage("cart");

        })

        .catch(error => {

            console.error(
                "Error adding book:",
                error
            );

        });

    }


    /* =========================
       REMOVE FROM CART
    ========================= */

    function removeFromCart(cartItemId) {

        fetch(`/api/cart/${cartItemId}`, {

            method: "DELETE"

        })

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Failed to remove item"
                );
            }

            return response;

        })

        .then(() => {

            loadCart(loggedInUser.id);

        })

        .catch(error => {

            console.error(
                "Error removing item:",
                error
            );

        });

    }


    /* =========================
       CLEAR CART
    ========================= */
async function clearCart() {

    if (!loggedInUser) {
        return;
    }

    try {

        const response = await fetch(
            `/api/cart/user/${loggedInUser.id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to clear cart");
        }

        setCart([]);

        console.log("Cart cleared successfully");

    } catch (error) {

        console.error(
            "Error clearing cart:",
            error
        );

    }
}


    return (

        <>

            <Navbar
                setPage={setPage}
                cartCount={cart.length}
            />


            {page === "home" && (

                <Home
                    setPage={setPage}
                />

            )}


            {page === "login" && (

                <Login
                    setPage={setPage}
                    onLogin={handleLogin}
                />

            )}


            {page === "register" && (

                <Register
                    setPage={setPage}
                />

            )}


            {page === "catalogue" && (

                <Catalogue
                    onBuyNow={handleBuyNow}
                />

            )}


            {page === "cart" && (

                <Cart
                    cart={cart}
                    setPage={setPage}
                    removeFromCart={removeFromCart}
                />

            )}


            {page === "checkout" && (

                <Checkout
                    cart={cart}
                    loggedInUser={loggedInUser}
                    setPage={setPage}
                    clearCart={clearCart}
                />

            )}

        </>

    );
}


/* =========================
   START REACT
========================= */

ReactDOM
    .createRoot(
        document.getElementById("root")
    )
    .render(
        <App />
    );