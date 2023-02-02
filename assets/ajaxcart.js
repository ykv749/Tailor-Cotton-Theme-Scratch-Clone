class AjaxCart extends HTMLElement {
  constructor() {
    super();
    this.initClickEvents();
  }

  initClickEvents() {
    this.previousElementSibling.addEventListener('click', this.close);
    this.querySelector('ajaxcart-header button').addEventListener('click', this.close);
  }

  open(refresh = true){
    document.body.classList.add('overflow-hidden');
    this.closest('.ajax-cart').classList.add('is--open');

    // Refresh cart only if required
    if(refresh) this.refreshCart();
  }

  close(){
    document.body.classList.remove('overflow-hidden');
    this.closest('.ajax-cart').classList.remove('is--open');
  }

  refreshCart(cartElement = false) {
    if(!cartElement){
      fetch("/cart?view=ajaxcart")
      .then((response) => response.text())
      .then((responseText) => {
        this.replaceCart(responseText);
      });
    } else {
      this.replaceCart(cartElement);
    }
  }

  replaceCart(cartElement){
    const html = new DOMParser().parseFromString(cartElement, 'text/html');
    const source = html.querySelector('.ajax-cart');
    const destination = this.closest('.ajax-cart');
    if (source && destination) destination.innerHTML = source.innerHTML;
  }
}
customElements.define('ajax-cart', AjaxCart);


class AjaxcartItem extends HTMLElement {
  constructor() {
    super();
  }
}
customElements.define('ajaxcart-item', AjaxcartItem);