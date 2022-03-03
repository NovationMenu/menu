/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        // if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        //     document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        // }else{
        //     document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        // }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`, {
    interval: 200
})

/*==================== ANIMATION SCROLL DE TEXTE====================*/
size = document.getElementById("over")
console.log(size)

infos = document.querySelectorAll(".menu__detail")

for (i = 0; i < infos.length; i++) {
    if (infos[i].scrollHeight > infos[i].clientHeight){
    infos[i].classList.add("marque");
    }
}
$(document).ready(function () {
    $('.marque').marquee({
        //duration in milliseconds of the marquee
        duration: 15000,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'up',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: true
    });
  });

//   ANIM CART

(function(){
 
    $(".caddie").on("click", function() {
      $(".shopping-cart").fadeToggle( "fast");
    });
    
  })();

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
    $(".shopping-cart").fadeToggle( "fast");
});

// Gestion du panier

const addToCart = document.getElementsByClassName('menu__button')
const ListCart = document.getElementsByClassName('shopping-cart-items')
const ButtonSendData = document.querySelector('.senddata')

ButtonSendData.addEventListener('click', sendListItems)

function sendListItems() {
    console.log('Click')
    console.log(ButtonSendData.parentElement.getElementsByClassName('clearfix'))
    var ListOrder = ButtonSendData.parentElement.getElementsByClassName('clearfix')
    TableList = []
    for (var i = 0; i < ListOrder.length; i++) {
        console.log(ListOrder[i].getElementsByClassName('item-id')[0].textContent)
        console.log(ListOrder[i].getElementsByClassName('item-quantity')[0].textContent)
        TableList.push([ListOrder[i].getElementsByClassName('item-id')[0].textContent, ListOrder[i].getElementsByClassName('item-quantity')[0].textContent])
    }
    console.log(TableList)
    function createQueryString(sendName, items)
{
    var result = '';
    for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items[i].length; j++) {
            result += sendName + '[' + i + '][' + j + ']=' + items[i][j] + '&';
        }
    }

    return result;
}
console.log(createQueryString('orders', TableList))
document.location.href="ajoutcommande?" + createQueryString('orders', TableList);

}

for (var i = 0; i < addToCart.length; i++) {
    button = addToCart[i];
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
    // console.log(this.parentElement)
    button = event.target;
    var cartItem = this.parentElement;
    var id = cartItem.getElementsByClassName('menu__id')[0].innerText;
    var name = cartItem.getElementsByClassName('menu__name')[0].innerText;
    var price = cartItem.getElementsByClassName('menu__preci')[0].innerText;
    
    // var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
    // addItemToCart (price, imageSrc);
    addItemToCart (id, name, price);
    // updateCartPrice()
}
const listItems = document.getElementsByClassName('clearfix');


function addItemToCart (id, name, price) {
var productRow = document.createElement('li');
productRow.classList.add('clearfix');
var productRows = document.getElementsByClassName('shopping-cart-items')[0];
var Present = 'no'
var cartRowItems = `
    <span class="item-id">${id}</span>
    <span class="item-name">${name}</span>
    <div class="qte"><span class="item-price">${price}</span>
    Quantité: <span class="item-quantity">1</span><i class="fas fa-times remove-btn"></i></div>
            `
var ListeArticles = document.getElementsByClassName('clearfix')
console.log(ListeArticles)
console.log(ListeArticles.length)
for (var i = 0; i < ListeArticles.length; i++) {
    // console.log(ListeArticles[i].innerHTML)
    // console.log(ListeArticles[i].getElementsByClassName('item-id'))
    console.log(ListeArticles[i].getElementsByClassName('item-id')[0].textContent)
    console.log(`${id}`)
    if(ListeArticles[i].getElementsByClassName('item-id')[0].textContent == `${id}`){
        console.log("Déjà présent")
        var QuantiteArticle = ListeArticles[i].getElementsByClassName('item-quantity')[0].textContent
        console.log(QuantiteArticle)
        ListeArticles[i].getElementsByClassName('item-quantity')[0].innerText = parseInt(QuantiteArticle) + 1
        updateQty();
        updateRemoveItem()
        Present = 'yes'

    }
}

if (Present == 'no'){
    productRow.innerHTML = cartRowItems;
    productRows.append(productRow);
    updateQty();
    updateRemoveItem()
    }
}

// Remove products from cart
function updateRemoveItem(){
    const removeBtn = document.getElementsByClassName('remove-btn')
    // console.log(removeBtn.length)
    // console.log(removeBtn)
    for (var i = 0; i < removeBtn.length; i++) {
        button = removeBtn[i]
        // console.log(button)
        button.addEventListener('click', removeItem)
    }
}

function removeItem (event) {
  btnClicked = event.target
    // console.log(removeBtn)
    console.log(this.parentElement.parentElement)
    this.parentElement.parentElement.remove()
  updateQty()
}

function updateQty(){
    var Quantite =0;
    var total =0;
    // var name = [];
    for (var i = 0; i < listItems.length; i ++) {
        // console.log(listItems.length)
        cartRow = listItems[i]
        // var nameElement = cartRow.getElementsByClassName('item-name')
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = parseInt(quantityElement.innerText)
        Quantite = Quantite + quantity
        total = total + (price * quantity )
    }
    document.getElementsByClassName('main-color-text')[0].innerText = total + ' €'
    qty = document.getElementsByClassName('badge');
    for (var i = 0; i < qty.length; i ++) {
        qty[i].innerText = Quantite
    }

}

