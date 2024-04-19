const datas = [
    {
        id: 1,
        img: './assests/imgs/p1.jpg',
        name: 'Quần lót nam Modal Air dáng trunk',
        price: '199.000',
        discount: '149.000'
    },
    {
        id: 2,
        img: './assests/imgs/p8.jpg',
        name: 'Quần lót nam Modal Air dáng Brief',
        price: '129.000',
        discount: '99.000'
    },
    {
        id: 3,
        img: './assests/imgs/p3.jpg',
        name: 'Quần lót nam Microfiber Mesh dáng trunk',
        price: '119.000đ',
        discount: '99.000'
    }
]

var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);
const idParam = url_param.get('id')
const getDataProductDetail = (id) => {
    return datas.filter(item => item.id == idParam)
}
const objData = getDataProductDetail(idParam)[0];

// get Container Detail

const imgDetailContainer = document.querySelector('.product-detail-media .item-image');
const contentDetailContainer = document.querySelector('.product-detail-infomation-content .product-info-main')

imgDetailContainer.innerHTML = `<img class="lb image-detail" class="img-responsive" src=${objData.img} alt=${objData.name} />`
contentDetailContainer.innerHTML = ` <div class="product-name-label">
<h1 class="product-name">${objData.name}</h1>
</div>
<div class="product-info-price">
<div class="price-box price-final_price" data-role="priceBox" data-product-id="53666"
  data-price-box="product-id-53666">
  <span class="special-price">
    <span class="price-container price-final_price tax weee">
      <span id="product-price-53666" data-price-amount="1758400" data-price-type="finalPrice"
        class="price-wrapper "><span class="price">${objData.discount}&nbsp;VND</span></span>
    </span>
  </span>
  <span class="old-price">
    <span class="price-container price-final_price tax weee">
      <span id="old-price-53666" data-price-amount="2198000" data-price-type="oldPrice"
        class="price-wrapper "><span class="price">${objData.price}&nbsp;VND</span></span>
    </span>
  </span>
</div>
</div>
<div class="product attribute sku">
<strong class="type">SKU:</strong> <span class="value" itemprop="sku">FF2306103DMSIPT</span>
</div>
<div class="line"></div>
<div class="product-options-wrapper" id="product-options-wrapper">
<div class="option-title title"><span>Kích cỡ</span></div>
<div class="option-list">
  <span class="option-item">S</span>
  <span class="option-item">M</span>
  <span class="option-item">L</span>
  <span class="option-item">XL</span>
</div>
</div>
<div class="product-options-wrapper" id="product-options-wrapper">
<div class="option-title title"><span>Số lượng</span></div>
<div class="button-inventory">
  <i class="fa-solid fa-minus"></i>
  <span class="mx-4">1</span>
  <i class="fa-solid fa-plus"></i>
</div>
</div>
<div class="button-group">
<div class="btn-add-cart btnn">
  Thêm vào giỏ
</div>
<div class="btn-add btnn">
  Thêm vào yêu thích
</div>

</div>`