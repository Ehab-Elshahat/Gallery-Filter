//  Grab Elements
let items = document.querySelector(".items");
let containerButns = document.querySelector(".btn-container");

// Request
let xhttp;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);

    // Get Unique Category
    let uniqe = data
      .map((item) => item.category)
      .filter((value, index, arry) => arry.indexOf(value) === index);
      
    // Add Button All In Container Buttons
    containerButns.innerHTML = `<button type="button" class="btn bg-light text-capitalize" data-filter="all">all</button>`;
    uniqe.forEach((item) => {
      containerButns.innerHTML += `
      <button type="button" class="btn bg-light text-capitalize" data-filter=${item}>${item}</button>`;
    });

    // Select Buttons
    let buttns = document.querySelectorAll(".btn-container button");

    // Loop On Buttons
    buttns.forEach((btn) => {

      // Listen To Clicking Buttons
      btn.addEventListener("click", function (e) {

        // Grab Data Filter For Current Button
        let dataFilter = e.currentTarget.getAttribute("data-filter");

        // If All Items
        if (dataFilter === "all") {
          items.innerHTML = "";
          allData();

          // If Category Is Exsist
        } else if (uniqe.indexOf(dataFilter) > -1) {
          items.innerHTML = "";
          let food = data.filter((item) => item.category === dataFilter);
          food.forEach((item) => {
            items.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mb-4" data-category=${item.category}>
              <img src=${item.imge} alt=${item.title} class="card-img-top" style="height: 16rem">
              <div class="card-body">
                <h5 class="card-title text-primary">${item.title}</h5>
                <p class="card-text text-secondary">${item.desc}</p>
                <span class="text-success">${item.price}</span>
              </div>
            </div>
          </div>`;
          });
        }
      });
    });

    // Window on load
    window.onload = allData;

    // All Data
    function allData() {
      data.forEach((item) => {
        items.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-4" data-category=${item.category}>
          <img src=${item.imge} alt=${item.title} class="card-img-top" style="height: 16rem">
          <div class="card-body">
            <h5 class="card-title text-primary">${item.title}</h5>
            <p class="card-text text-secondary">${item.desc}</p>
            <span class="text-success">${item.price}</span>
          </div>
        </div>
      </div>`;
      });
    }
  }
};
xhttp.open("GET", "./DATA.json", true);
xhttp.send();

