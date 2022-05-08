var domain;
var cur = "$";
var sold = "sold"
chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
var activeTab = tabs[0];
chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
});
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background") {
    // console.log(msg.result);
    if(msg.result=="not_amz_product"){
      var divContainer = document.getElementById("showData");
      divContainer.replaceWith("Please navigate to Amazon product page");
      return;
    } else {
    console.log(msg.result,msg.domain);
    data = msg.result.data.items;
    domain = msg.domain;
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
// var col = ["productId","title","imageUrl","totalOrders","averageRating","productMinPrice"]
// var data = [
//   {
//      "productId":"1005001321925365",
//      "title":"Kit de démarrage de broderie estampillé bricolage Kit d'outils de fils de couleur de tissu de broderie",
//      "imageUrl":"http://ae01.alicdn.com/kf/Hf629e4eda5064760ae57de53b63a0f4dS.jpg",
//      "totalOrders":0,
//      "averageRating":null,
//      "productMinPrice":{
//         "value":0.56
//      }
//   },
//   {
//      "productId":"1005001622024526",
//      "title":"Travail manuel couture plantes point de croix broderie fleurs bricolage Kit de démarrage ruban peinture motif fils outils décoration de la maison",
//      "imageUrl":"http://ae01.alicdn.com/kf/H399f5c9b967b4e64bbb69b7776cc31edu.jpg",
//      "totalOrders":5,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1
//      }
//   },
//   {
//      "productId":"1005001622223873",
//      "title":"Europe bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor",
//      "imageUrl":"http://ae01.alicdn.com/kf/H9486b72df0e4418ca9e1db6a59d1d38ff.jpg",
//      "totalOrders":2,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   },
//   {
//      "productId":"1005001622645253",
//      "title":"Bricolage ruban fleurs broderie ensemble avec cadre pour débutant Kits de couture point de croix série Arts artisanat couture décor Europe",
//      "imageUrl":"http://ae01.alicdn.com/kf/H2ae9d5a64d474aa182a3ef1de2b171e3z.jpg",
//      "totalOrders":18,
//      "averageRating":5,
//      "productMinPrice":{
//         "value":1.09
//      }
//   }]
    // Creating table with products
    var table = document.createElement("table");
    switch(domain) {
      case "www.amazon.co.uk":
        cur = "&pound;";
        break;
      case "www.amazon.de":
        cur = "&euro;";
        sold = "verkauft";
        break;
      case "www.amazon.fr":
        cur = "&euro;";
        sold = "vendus"
        break;
      case "www.amazon.es":
        cur = "&euro;";
        sold = "Vendidos"
        break;
      case "www.amazon.it":
        cur = "&euro;";
        sold = "venduti"
        break;
      case "www.amazon.nl":
        cur = "&euro;";
        sold = "verkocht"
        break;
      case "www.amazon.com.au":
        cur = "AUD ";
        break;
      case "www.amazon.co.jp":
        cur = "&pound";
        break;
      case "www.amazon.in":
        cur = "&#8377;"
        break;
      case "www.amazon.com.tr":
        cur = "&#8378;";
        sold = "satıldı"
        break;
      case "www.amazon.ca":
        cur = "CAD ";
        break;  
    }
    for (var i = 0; i < data.length; i++) {
      if(i%3==0){
        tr = table.insertRow(-1);
      }
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = 
      "<div class='card'><a target='_blank' href='https://www.aliexpress.com/item/"
      +data[i+0][col[0]]+".html'><img height='140px' src='"
      +data[i+0][col[2]]+"'></img></a><a target='_blank' href='https://www.aliexpress.com/item/"
      +data[i+0][col[0]]+".html'><div class='title'>"
      +data[i+0][col[1]]+"</div></a><div class='price'>"+cur+
      +data[i+0][col[5]].value+"</div><div><div class='rating'><i style='color:red' class='fa fa-star fa-sm'></i>"
      +data[i+0][col[4]]+"</div><div class='orders'>"
      +data[i+0][col[3]]+" "+sold+"</div></div></div>";
    }
    // for (var i = 0; i < data.length; i+=3) {
    //   tr = table.insertRow(-1);
    //   var tabCell = tr.insertCell(-1);
    //   tabCell.innerHTML = 
    //   "<div class='card'><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+0][col[0]]+".html'><img height='140px' src='"
    //   +data[i+0][col[2]]+"'></img></a><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+0][col[0]]+".html'><div class='title'>"
    //   +data[i+0][col[1]]+"</div></a><div class='price'>"+cur+
    //   +data[i+0][col[5]].value+"</div><div><div class='rating'><i style='color:red' class='fa fa-star fa-sm'></i>"
    //   +data[i+0][col[4]]+"</div><div class='orders'>"
    //   +data[i+0][col[3]]+" "+sold+"</div></div></div>";
    //   var tabCell = tr.insertCell(-1);
    //   tabCell.innerHTML = 
    //   "<div class='card'><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+1][col[0]]+".html'><img height='140px' src='"
    //   +data[i+1][col[2]]+"'></img></a><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+1][col[0]]+".html'><div class='title'>"
    //   +data[i+1][col[1]]+"</div></a><div class='price'>"+cur+
    //   +data[i+1][col[5]].value+"</div><div><div class='rating'><i style='color:red' class='fa fa-star fa-sm'></i>"
    //   +data[i+1][col[4]]+"</div><div class='orders'>"
    //   +data[i+1][col[3]]+" "+sold+"</div></div></div>";   
    //   var tabCell = tr.insertCell(-1);
    //   tabCell.innerHTML = 
    //   "<div class='card'><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+2][col[0]]+".html'><img height='140px' src='"
    //   +data[i+2][col[2]]+"'></img></a><a target='_blank' href='https://www.aliexpress.com/item/"
    //   +data[i+2][col[0]]+".html'><div class='title'>"
    //   +data[i+2][col[1]]+"</div></a><div class='price'>"+cur+
    //   +data[i+2][col[5]].value+"</div><div><div class='rating'><i style='color:red' class='fa fa-star fa-sm'></i>"
    //   +data[i+2][col[4]]+"</div><div class='orders'>"
    //   +data[i+2][col[3]]+"  "+sold+"</div></div></div>";
    // }
    // Putting table on the page
    var divContainer = document.getElementById("showData");
    divContainer.replaceWith(table);
  }}
});
