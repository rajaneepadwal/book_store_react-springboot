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

                <button
                    onClick={() => setPage("home")}
                >
                    Home
                </button>

                <button
                    onClick={() => setPage("catalogue")}
                >
                    Catalogue
                </button>

                <button
                    onClick={() => setPage("login")}
                >
                    Login
                </button>

                <button
                    onClick={() => setPage("register")}
                >
                    Register
                </button>

                <button
                    onClick={() => setPage("cart")}
                >
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

                // Tell App that login was successful
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

function Cart({ cart, setPage, removeFromCart }) {

    const total = cart.reduce(
        (sum, book) => sum + book.price,
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

                        {cart.map((book, index) => (

                            <div
                                className="book-card"
                                key={index}
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


                                    <h3>
                                        ₹{book.price}
                                    </h3>


                                    <button
                                        onClick={() =>
                                            removeFromCart(index)
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

function Checkout({ cart, setPage }) {

    const total = cart.reduce(
        (sum, book) => sum + book.price,
        0
    );


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


            <button
                className="main-button"
                onClick={() =>
                    alert("Order placed successfully!")
                }
            >
                Place Order
            </button>


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

    const [page, setPage] = useState("home");


    // Stores the currently logged-in user
    const [loggedInUser, setLoggedInUser] =
        useState(null);


    // Stores books in cart
    const [cart, setCart] = useState([]);


    // Stores the book clicked before login
    const [pendingBook, setPendingBook] =
        useState(null);


    /* =========================
       LOGIN SUCCESS
    ========================= */

    function handleLogin(user) {

        setLoggedInUser(user);


        /*
         If user clicked Buy Now
         before logging in,
         add that book to cart.
        */

        if (pendingBook) {

            setCart(previousCart => [
                ...previousCart,
                pendingBook
            ]);

            setPendingBook(null);

            setPage("cart");

        } else {

            setPage("home");

        }

    }


    /* =========================
       BUY NOW
    ========================= */

    function handleBuyNow(book) {

        /*
         User is NOT logged in
         */

        if (!loggedInUser) {

            // Remember selected book
            setPendingBook(book);

            // Send user to login
            setPage("login");

            return;
        }


        /*
         User is already logged in
         */

        setCart(previousCart => [
            ...previousCart,
            book
        ]);

        setPage("cart");

    }


    /* =========================
       REMOVE FROM CART
    ========================= */

    function removeFromCart(index) {

        setCart(previousCart =>
            previousCart.filter(
                (_, i) => i !== index
            )
        );

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
                    setPage={setPage}
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