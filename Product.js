//@ Logic For Showing products respective to the value of input field(search bar) 
let searchInput = document.getElementById("searchInput")
let productCards = document.querySelectorAll(".product_card")

searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.toLowerCase()
  productCards.forEach((card) => {
    let productName = card.querySelector("h1").innerText.toLowerCase()
    if (productName.includes(searchValue)) {
      card.style.display = "flex"
    } else {
      card.style.display = "none"
    }
  })

  //@ Logic For Showing only searched input Conatiner (if searched for "riding jacket" only jacket container must be visible with its respective item and not sunglasses and others containers)
  let productContainers = document.querySelectorAll(".products")
  productContainers.forEach((productContainer) => {
    let cards = productContainer.querySelectorAll(".product_card")
    let visiblecount = 0;
    cards.forEach((card) => {
      if (card.style.display == "flex") {
        visiblecount++
      }
    })
    if (visiblecount == 0) {
      productContainer.style.display = "none"
    } else {
      productContainer.style.display = "block"
    }
  })
})

//@ Add to Cart Functionality
let cart = []
let cartQuantity = document.getElementById("cart_quantity")
let cartPrice = document.getElementById("cart_price")
productCards.forEach((card) => {
  let productName = card.querySelector("h1").innerText
  let productImage = card.querySelector("img").src
  let productPrice = parseFloat(card.querySelector("p").innerText.replace("₹", ""))
  let minusBtn = card.querySelector(".minus_btn")
  let plusBtn = card.querySelector(".plus_btn")
  let cardQuantity = card.querySelector(".card_quantity")
  let cardCartIcon = card.querySelector(".card_details2>p")

  cardCartIcon.addEventListener("click", () => {
    sideContainer.style.right = "0px"
    renderSideBar();
  })

  function updateNavbar() {
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQty += item.qty
      totalPrice += item.price * item.qty
    })
    cartQuantity.innerText = totalQty
    cartPrice.innerText = `₹${totalPrice.toFixed(2)}`
  }

  function updateCart(name, price, qty) {
    let existing = cart.find(item => item.name == name)
    if (existing) {
      existing.qty = qty
      if (qty == 0) {
        cart = cart.filter(item => item.name !== name)
      }
    } else {
      cart.push({ name, price, qty, image: productImage })
    }
    updateNavbar()
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  plusBtn.addEventListener("click", () => {
    let qty = parseInt(cardQuantity.innerText)
    qty++
    cardQuantity.innerText = qty
    updateCart(productName, productPrice, qty);
    renderSideBar();
  })

  minusBtn.addEventListener("click", () => {
    let qty = parseInt(cardQuantity.innerText)
    if (qty > 0) {
      qty--
    }
    cardQuantity.innerText = qty
    updateCart(productName, productPrice, qty)
    renderSideBar();
  })
})

//@ Cart SlideBar
let sideContainer = document.querySelector("#side_bar_container")
let cartImage = document.querySelector("#nav_three>i")
let sidebar2 = document.getElementById("sidebar2")
let closeSidebar = document.querySelector("#sidebar1>p")
let totalCartPrice = document.querySelector("#sidebar3>h2>span")

cartImage.addEventListener("click", () => {
  sideContainer.style.right = "0px"
  renderSideBar();
})
closeSidebar.addEventListener("click", () => {
  sideContainer.style.right = "-320px"
})

function renderSideBar() {
  sidebar2.innerHTML = ""
  if (cart.length == 0) {
    sidebar2.innerHTML = `<p style="margin:20px"> Your cart is empty</p>`
    totalCartPrice.innerText = "0.00"
    return
  }
  //@ Functionality to display items in Cart SideBar
  let total = 0
  cart.forEach((item) => {
    total += item.price * item.qty
    let itemDiv = document.createElement("div")
    itemDiv.classList.add("cart_item")
    itemDiv.innerHTML = `
    <div class=cart_item1>
    <img src="${item.image}" alt="${item.name}" height:120 width=150 />
    </div>
    <div class=cart_item2>
    <h2>${item.name}</h2>
    <p>₹${item.price}</p>
    <div class=cart_item2_details>
    <p class=cart_item_quantity>Qty:${item.qty}</p>
    <p class=cart_delete_btn><i class="fa-regular fa-trash-can"></i></p>
    </div>
    </div>
    `
    sidebar2.append(itemDiv)

    //@ Cart Items Deletion Functionality
    let deleteBtn = itemDiv.querySelector(".cart_delete_btn")
    deleteBtn.addEventListener("click", () => {
      cart = cart.filter((existingItem) => existingItem.name !== item.name)
      renderSideBar()
      localStorage.setItem("cart", JSON.stringify(cart))
      //# navbar updation
      let totalQty = 0;
      let totalPrice = 0;
      cart.forEach((item) => {
        totalQty += item.qty
        totalPrice += item.price * item.qty
      })
      cartQuantity.innerText = totalQty
      cartPrice.innerText = `₹${totalPrice.toFixed(2)}`
      //# Reducing quantity at card after deleting item from cart
      let allCards = document.querySelectorAll(".product_card")
      allCards.forEach((card) => {
        let name = card.querySelector("h1").innerText
        if (name == item.name) {
          let quantity = card.querySelector(".card_quantity")
          quantity.innerText = 0
        }
      })
    })
    totalCartPrice.innerText = total.toFixed(2)
  })
}

//@ Functionality for chechout button 
let checkoutBtn = document.getElementById("checkout_btn");
checkoutBtn.addEventListener("click", () => {
  location.href = "CheckOut.html"
})
