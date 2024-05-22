// Fetch and display categories
const category = async () => {
  try {
    const categoriesResponse = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await categoriesResponse.json();
    const categoryAll = data.data;
    displayCategories(categoryAll);

    // Fetch and display items for the first category by default
    if (categoryAll.length > 0) {
      displayAll(categoryAll[0].category_id);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Display category buttons
function displayCategories(categoryAll) {
  const categoryContainer = document.getElementById("category-container");

  categoryAll.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="displayAll('${category.category_id}')" class="px-4 bg-gray-500 text-white rounded text-md font-bold">
          ${category.category}
        </button>
      `;
    categoryContainer.appendChild(div);
  });
}

// Fetch and display items for a selected category
async function displayAll(id) {
  try {
    const itemsResponse = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await itemsResponse.json();
    const itemsAll = data.data;
    displayItems(itemsAll);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

// Display item cards
function displayItems(items) {
  const itemsContainer = document.getElementById("card-container");

  itemsContainer.innerHTML = ""; // Clear existing items
  items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
          <figure><img class=" w-[300px] h-[200px] rounded-md" src="${item.thumbnail}" alt="${item.title}" /></figure>
          <div class="card-body">
            <h2 class="card-title">
              ${item.title}
              <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>${item.description}</p>
            <div class="card-actions justify-end">
              
            </div>
          </div>
        </div>
      `;
    itemsContainer.appendChild(div);
  });
}

// Initialize category fetching on page load
category();
