'use strict';

var header = document.querySelector('header');
    var section = document.querySelector('section');

    var script = document.createElement('script');
    script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    document.getElementsByTagName('head')[0].appendChild(script);

    window.X = function (json) {
	
    var reference = json.data.reference.item;
    var products = json.data.recommendation;
    
    createReferenceProduct(reference);
    createSuggestions(products)
    }

    function createReferenceProduct(product) {
      if (product) {
          // create a card for the reference product
          var responsive = true;
          var productCard = _createProductCard(product, responsive);
  
          var referenceProductDiv = document.getElementById("reference-product");
  
          // removes the previous product
          if (referenceProductDiv.hasChildNodes()) {
              referenceProductDiv.removeChild(referenceProductDiv.firstChild);
          }
  
          // adds the reference product to its container
          referenceProductDiv.appendChild(productCard);
      } else {
          console.warn("No reference product provided.");
      }
  }

  function createSuggestions(products) {
    if (products) {
        var productCards = products.map(function(prod) {
            return _createProductCard(prod);
        });

        var suggestionsDiv = document.getElementById("suggestion-products-list");
        var gutterWrapper;

        // remove old products
        while (suggestionsDiv.hasChildNodes()) {
            suggestionsDiv.removeChild(suggestionsDiv.firstChild);
        }

        // adds new products to the list
        productCards.forEach(function(card) {
            gutterWrapper = document.createElement("div");
            gutterWrapper.setAttribute("class", "product-wrapper-gutter");

            gutterWrapper.appendChild(card);
            suggestionsDiv.appendChild(gutterWrapper);
        });
    } else {
        console.warn("No suggestions provided.");
    }
}


  function _createProductCard(product, responsive) {
    var card = document.createElement("a"),
        responsiveWrapper = document.createElement("div");

    if (responsive) {
        card.setAttribute("class", "product-wrapper flex-row flex-column-sm card-w-100 card-w-150-px-sm");
    } else {
        card.setAttribute("class", "product-wrapper flex-column");
    }
    card.setAttribute("id", "product-" + product.businessId);
    card.setAttribute("target", "_blank");
    card.setAttribute("rel", "noreferrer noopener");
    card.setAttribute("href", "http:" + product.detailUrl);

    responsiveWrapper.setAttribute("class", "responsive flex-column");

    if (product.imageName) {
        var imageWrapper = _createProductImage(product.imageName);
        card.appendChild(imageWrapper);
    }

    if (product.name) {
        var productName = _createProductName(product.name);
        (responsive ? responsiveWrapper : card).appendChild(productName);
    }

    if (product.oldPrice) {
        var productOldPrice = _createProductOldPrice(product.oldPrice);
        (responsive ? responsiveWrapper : card).appendChild(productOldPrice);
    }

    if (product.price) {
        var productPrice = _createProductPrice(product.price);
        (responsive ? responsiveWrapper : card).appendChild(productPrice);
    }

    if (product.productInfo && product.productInfo.paymentConditions) {
        var paymentConditions = _createProductPaymentConditions(product.productInfo.paymentConditions);
        (responsive ? responsiveWrapper : card).appendChild(paymentConditions);
    }

    if (responsive) {
        card.appendChild(responsiveWrapper);
    }

    return card;
}

function _createProductImage(imageName) {
  var imageWrapper = document.createElement("div");
  imageWrapper.setAttribute("class", "product-image-wrapper");

  var image = document.createElement("img");
  image.setAttribute("src", "http:" + imageName);
  image.setAttribute("class", "product-image");

  imageWrapper.appendChild(image);
  return imageWrapper;
}

function _createProductName(name) {
  var productName = document.createElement("span");
  productName.setAttribute("class", "product-name");
  productName.setAttribute("title", name);
  productName.innerHTML = name;
  return productName;
}

function _createProductOldPrice(oldPrice) {
  var productOldPrice = document.createElement("div");
  productOldPrice.setAttribute("class", "product-old-price");

  var descriptionOld = document.createElement("span");
  descriptionOld.setAttribute("class", "description");
  descriptionOld.innerHTML = "De:";

  var valueOld = document.createElement("span");
  valueOld.setAttribute("class", "value");
  valueOld.innerHTML = oldPrice;

  productOldPrice.appendChild(descriptionOld);
  productOldPrice.appendChild(valueOld);

  return productOldPrice;
}

function _createProductPrice(price) {
  var productPrice = document.createElement("div");
  productPrice.setAttribute("class", "product-price");

  var descriptionNew = document.createElement("span");
  descriptionNew.setAttribute("class", "description");
  descriptionNew.innerHTML = "Por:";

  var valueNew = document.createElement("span");
  valueNew.setAttribute("class", "value");
  valueNew.innerHTML = price;

  productPrice.appendChild(descriptionNew);
  productPrice.appendChild(valueNew);

  return productPrice;
}

function _createProductPaymentConditions(paymentConditions) {
  var paymentConditionsNode = document.createElement("div");
  paymentConditionsNode.setAttribute("class", "product-payment-options");

  var option = document.createElement("span");
  option.setAttribute("class", "option");
  option.innerHTML = paymentConditions;

  var details = document.createElement("span");
  details.setAttribute("class", "details");
  details.innerHTML = "sem juros";

  paymentConditionsNode.appendChild(option);
  paymentConditionsNode.appendChild(details);

  return paymentConditionsNode;
}
