const containerEl = document.querySelector("#container");
const loadingEl = document.querySelector(".main");
(function(){(async () => {
      try{
        loadingWaint(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        loadingWaint(false);
        render(data);
      }
      catch(err){
        error(err)
      }
     })();
     function loadingWaint(isLoading){
      isLoading ? loadingEl.style.display = "block" : loadingEl.style.display = "none";
     }
     function render(data){
      data.map(({image, price, rating, description, category, id}) =>{
        const wprapperElelment = document.createElement("div");
        wprapperElelment.className = "wrapper__elements";
        wprapperElelment.innerHTML =`
        <img src="${image}" alt="" class="img">
        <span class="span">Price: ${price}</span>
        <p class="p-text">Discount: ${rating.count}</p>
        <h3 class="h3-text">Desc: ${description}</h3>
        <h2 class="h2-text">Name: ${category}</h2>
        <button><i data-user-id="${id}"  class="fa-regular fa-trash-can"></i></button>
        `;
        containerEl.appendChild(wprapperElelment);
      })
     }
  }
)();
containerEl.addEventListener("click", (e)=>{
  if(e.target.matches("i")){
    const agreeDelete = confirm("are you sure?")
    if (agreeDelete){
      const userId =e.target.dataset.userId;
    fetch(`https://fakestoreapi.com/products/${userId}`,
      {
        method: "DELETE"
      }
    )
    .then((response) => {
      if (response.status === 200){
        const sucEl = document.querySelector(".madal");
        sucEl.style.display= "flex";
          const canselBtnEl= document.querySelector("#cansel-btn");
          canselBtnEl.addEventListener("click", ()=>{
            sucEl.style.display= "none";
          })
      }
    });
    }
  }
})
