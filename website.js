const CART_KEY = "saffron-table-cart";
const FAVORITES_KEY = "saffron-table-favorites";
const ORDER_KEY = "saffron-table-last-order";
const indianRupees = new Intl.NumberFormat("en-IN", {
	currency: "INR",
	maximumFractionDigits: 0,
	style: "currency"
});

function readStorage(key) {
	try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}

function writeStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function formatPrice(value) {
	return indianRupees.format(value);
}

const MENU_ITEMS = [
	{ id: "golden-granola", category: "breakfast", name: "Golden granola", price: 260, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85", description: "Toasted oats, local fruit, yogurt, honey." },
	{ id: "herb-toast", category: "breakfast", name: "Herb toast", price: 300, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85", description: "Sourdough, whipped ricotta, herbs, chili oil." },
	{ id: "masala-omelette", category: "breakfast", name: "Masala omelette", price: 280, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=85", description: "Three eggs, onion, coriander, green chili, toast." },
	{ id: "idli-sambar", category: "breakfast", name: "Idli sambar", price: 240, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=85", description: "Steamed rice cakes, lentil sambar, coconut chutney." },
	{ id: "avocado-toast", category: "breakfast", name: "Avocado toast", price: 360, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=700&q=85", description: "Sourdough, avocado, poached egg, chili flakes." },
	{ id: "poha-bowl", category: "breakfast", name: "Kanda poha", price: 220, image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=85", description: "Flattened rice, onion, peanuts, curry leaves, lime." },
	{ id: "lemon-pancakes", category: "breakfast", name: "Lemon pancakes", price: 320, image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=700&q=85", description: "Fluffy pancakes, lemon curd, berries, maple." },
	{ id: "berry-yogurt", category: "breakfast", name: "Berry yogurt", price: 250, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=85", description: "Thick yogurt, seasonal berries, seeds, honey." },
	{ id: "aloo-paratha", category: "breakfast", name: "Aloo paratha", price: 260, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=700&q=85", description: "Potato-stuffed flatbread, yogurt, pickle, butter." },
	{ id: "shakshuka", category: "breakfast", name: "Tomato shakshuka", price: 390, image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=700&q=85", description: "Baked eggs, spiced tomato, herbs, warm bread." },
	{ id: "garden-bowl", category: "dinner", name: "Garden bowl", price: 340, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=85", description: "Greens, roasted roots, herbs, lemon tahini." },
	{ id: "sunday-pasta", category: "dinner", name: "Sunday pasta", price: 520, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85", description: "Hand-cut ribbons, slow tomato, basil, parmesan." },
	{ id: "citrus-chicken", category: "dinner", name: "Citrus chicken", price: 650, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85", description: "Roasted chicken, citrus, greens, pan jus." },
	{ id: "paneer-tikka", category: "dinner", name: "Paneer tikka", price: 420, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85", description: "Charred paneer, peppers, mint chutney, lime." },
	{ id: "masala-thali", category: "dinner", name: "Masala thali", price: 560, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85", description: "Dal, seasonal sabzi, rice, roti, pickle, raita." },
	{ id: "margherita-pizza", category: "dinner", name: "Margherita pizza", price: 480, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85", description: "San Marzano tomato, mozzarella, basil, olive oil." },
	{ id: "wild-mushroom-risotto", category: "dinner", name: "Wild mushroom risotto", price: 590, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=700&q=85", description: "Creamy arborio rice, wild mushrooms, parmesan." },
	{ id: "patatas-bravas", category: "dinner", name: "Patatas bravas", price: 360, image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=85", description: "Crisp potatoes, smoky tomato bravas sauce, aioli." },
	{ id: "seafood-paella", category: "dinner", name: "Seafood paella", price: 720, image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=700&q=85", description: "Saffron rice, prawns, mussels, peppers, lemon." },
	{ id: "chicken-biryani", category: "dinner", name: "Chicken biryani", price: 620, image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=700&q=85", description: "Fragrant basmati, saffron chicken, fried onions, raita." },
	{ id: "berry-cake", category: "dessert", name: "Berry cake", price: 280, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85", description: "Olive oil cake, berries, mascarpone cream." },
	{ id: "gulab-jamun", category: "dessert", name: "Gulab jamun", price: 220, image: "https://images.unsplash.com/photo-1601303516534-5d3a0a2b0c65?auto=format&fit=crop&w=700&q=85", description: "Warm milk dumplings, rose syrup, pistachio." },
	{ id: "classic-tiramisu", category: "dessert", name: "Classic tiramisu", price: 360, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85", description: "Espresso-soaked sponge, mascarpone, cocoa." },
	{ id: "churros", category: "dessert", name: "Cinnamon churros", price: 280, image: "https://images.unsplash.com/photo-1624371414361-e670edf4898a?auto=format&fit=crop&w=700&q=85", description: "Crisp churros, cinnamon sugar, chocolate sauce." },
	{ id: "baked-cheesecake", category: "dessert", name: "Baked cheesecake", price: 390, image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?auto=format&fit=crop&w=700&q=85", description: "Silky cheesecake, vanilla, berry compote." },
	{ id: "mango-kulfi", category: "dessert", name: "Mango kulfi", price: 240, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=85", description: "Slow-set mango kulfi, cardamom, toasted nuts." },
	{ id: "panna-cotta", category: "dessert", name: "Vanilla panna cotta", price: 320, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=85", description: "Vanilla cream, citrus syrup, fresh fruit." },
	{ id: "chocolate-mousse", category: "dessert", name: "Chocolate mousse", price: 340, image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=700&q=85", description: "Dark chocolate, sea salt, whipped cream." },
	{ id: "jalebi-rabri", category: "dessert", name: "Jalebi rabri", price: 260, image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=85", description: "Crisp jalebi, chilled rabri, saffron, nuts." },
	{ id: "tres-leches", category: "dessert", name: "Tres leches", price: 360, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85", description: "Three-milk sponge, cinnamon, soft cream." }
];

function getProduct(card) {
	const image = card.dataset.image || card.querySelector("img")?.src || "";
	const name = card.dataset.name || card.querySelector("h3")?.textContent.trim() || "Dish";
	const priceText = card.dataset.price || card.querySelector(".price")?.textContent.replace(/[^0-9.]/g, "") || "0";
	return {
		id: card.dataset.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		name,
		price: Number(priceText),
		image,
		description: card.dataset.description || card.querySelector(".dish-info p")?.textContent.trim() || "Made fresh for you."
	};
}

function updateBadges() {
	const cart = readStorage(CART_KEY);
	const favorites = readStorage(FAVORITES_KEY);
	document.querySelectorAll("[data-cart-count]").forEach((badge) => { badge.textContent = `(${cart.length})`; });
	document.querySelectorAll("[data-favorite-count]").forEach((badge) => { badge.textContent = `(${favorites.length})`; });
}

function updateSummary() {
	const cart = readStorage(CART_KEY);
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const count = document.querySelector("#order-count");
	const orderTotal = document.querySelector("#order-total");
	if (count) count.textContent = `${cart.length} ${cart.length === 1 ? "item" : "items"}`;
	if (orderTotal) orderTotal.textContent = `· Total ${formatPrice(total)}`;
}

function makeDishCard(item) {
	const card = document.createElement("article");
	card.className = "dish";
	card.dataset.product = "";
	card.dataset.id = item.id;
	card.dataset.name = item.name;
	card.dataset.price = item.price;
	card.dataset.image = item.image;
	card.dataset.description = item.description;
	card.innerHTML = `<img src="${item.image}" alt="${item.name}"><div class="dish-info"><div><h3>${item.name}</h3><p>${item.description}</p></div><div class="price">${formatPrice(item.price)}</div></div><div class="dish-actions"><button class="add-dish" type="button">Add to cart</button><button class="favorite-btn" type="button" aria-label="Save ${item.name}" aria-pressed="false">♡</button></div>`;
	return card;
}

function renderMenu() {
	document.querySelectorAll("[data-menu-grid]").forEach((grid) => {
		const category = grid.dataset.menuGrid;
		MENU_ITEMS.filter((item) => item.category === category).forEach((item) => grid.appendChild(makeDishCard(item)));
	});
}

function renderFavorites() {
	const grid = document.querySelector("[data-favorites-grid]");
	if (!grid) return;
	const favorites = readStorage(FAVORITES_KEY);
	grid.replaceChildren();
	if (!favorites.length) {
		grid.innerHTML = `<div class="empty-state">No saved dishes yet. <a href="menu.html">Browse the menu</a> and tap the heart on anything you love.</div>`;
		return;
	}
	favorites.forEach((item) => grid.appendChild(makeDishCard(item)));
}

function renderCart() {
	const list = document.querySelector("[data-cart-items]");
	if (!list) return;
	const cart = readStorage(CART_KEY);
	list.replaceChildren();
	if (!cart.length) {
		list.innerHTML = `<div class="empty-state">Your cart is waiting for something delicious. <a href="menu.html">Explore the menu</a>.</div>`;
	} else {
		cart.forEach((item) => {
			const row = document.createElement("div");
			row.className = "cart-row";
			row.innerHTML = `<img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${item.description}</p><button class="remove-item" type="button" data-remove-id="${item.id}">Remove</button></div><div class="row-price">${formatPrice(item.price)}</div>`;
			list.appendChild(row);
		});
	}
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const count = document.querySelector("[data-summary-count]");
	const summaryTotal = document.querySelector("[data-summary-total]");
	if (count) count.textContent = cart.length;
	if (summaryTotal) summaryTotal.textContent = formatPrice(total);
	const placeOrderButton = document.querySelector("[data-place-order]");
	if (placeOrderButton) placeOrderButton.disabled = cart.length === 0;
}

function renderBill() {
	const list = document.querySelector("[data-bill-items]");
	if (!list) return;
	const order = readStorage(ORDER_KEY);
	list.replaceChildren();
	if (!order.items?.length) {
		list.innerHTML = `<div class="empty-state">No completed order yet. <a href="menu.html">Choose something delicious</a>.</div>`;
		const total = document.querySelector("[data-bill-total]");
		if (total) total.textContent = formatPrice(0);
		return;
	}
	order.items.forEach((item) => {
		const row = document.createElement("div");
		row.className = "bill-row";
		row.innerHTML = `<span>${item.name}</span><span>${formatPrice(item.price)}</span>`;
		list.appendChild(row);
	});
	const total = document.querySelector("[data-bill-total]");
	if (total) total.textContent = formatPrice(order.items.reduce((sum, item) => sum + item.price, 0));
	const date = document.querySelector("[data-bill-date]");
	if (date) date.textContent = new Date(order.placedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function bindProductCards() {
	const cart = readStorage(CART_KEY);
	const favorites = readStorage(FAVORITES_KEY);
	document.querySelectorAll("[data-product]").forEach((card) => {
		const product = getProduct(card);
		let addButton = card.querySelector(".add-dish");
		let favoriteButton = card.querySelector(".favorite-btn");
		if (!favoriteButton) {
			favoriteButton = document.createElement("button");
			favoriteButton.className = "favorite-btn";
			favoriteButton.type = "button";
			favoriteButton.setAttribute("aria-label", `Save ${product.name}`);
			favoriteButton.textContent = "♡";
			addButton.parentElement?.appendChild(favoriteButton);
		}
		const isInCart = cart.some((item) => item.id === product.id);
		const isFavorite = favorites.some((item) => item.id === product.id);
		if (addButton) { addButton.textContent = isInCart ? "In cart ✓" : "Add to cart"; addButton.setAttribute("aria-pressed", String(isInCart)); }
		favoriteButton.textContent = isFavorite ? "♥" : "♡";
		favoriteButton.setAttribute("aria-pressed", String(isFavorite));

		addButton?.addEventListener("click", () => {
			const current = readStorage(CART_KEY);
			const exists = current.some((item) => item.id === product.id);
			writeStorage(CART_KEY, exists ? current.filter((item) => item.id !== product.id) : [...current, product]);
			addButton.textContent = exists ? "Add to cart" : "In cart ✓";
			addButton.setAttribute("aria-pressed", String(!exists));
			updateBadges(); updateSummary(); renderCart();
		});
		favoriteButton.addEventListener("click", () => {
			const current = readStorage(FAVORITES_KEY);
			const exists = current.some((item) => item.id === product.id);
			writeStorage(FAVORITES_KEY, exists ? current.filter((item) => item.id !== product.id) : [...current, product]);
			favoriteButton.textContent = exists ? "♡" : "♥";
			favoriteButton.setAttribute("aria-pressed", String(!exists));
			updateBadges(); renderFavorites();
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-current-year], #current-year").forEach((year) => { year.textContent = new Date().getFullYear(); });
	renderMenu();
	bindProductCards();
	updateBadges();
	updateSummary();
	renderFavorites();
	renderCart();
	renderBill();
	document.addEventListener("click", (event) => {
		const placeOrderButton = event.target.closest("[data-place-order]");
		if (placeOrderButton) {
			const items = readStorage(CART_KEY);
			if (!items.length) return;
			writeStorage(ORDER_KEY, { items, placedAt: new Date().toISOString() });
			writeStorage(CART_KEY, []);
			window.location.href = "bill.html";
			return;
		}
		const printButton = event.target.closest("[data-print-bill]");
		if (printButton) {
			window.print();
			return;
		}
		const removeButton = event.target.closest("[data-remove-id]");
		if (!removeButton) return;
		writeStorage(CART_KEY, readStorage(CART_KEY).filter((item) => item.id !== removeButton.dataset.removeId));
		updateBadges(); updateSummary(); renderCart();
	});
});
