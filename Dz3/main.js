function addReview(event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const reviewText = document.getElementById("review-text").value;

    if (productName.trim() === "" || reviewText.trim() === "") {
      alert("Пожалуйста, введите название продукта и отзыв.");
      return;
    }

    const review = { productName, reviewText };

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("product-name").value = "";
    document.getElementById("review-text").value = "";

    displayProductList();
  }

  function displayProductList() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    reviews.forEach((review) => {
      const li = document.createElement("li");
      li.textContent = review.productName;
      li.addEventListener("click", () =>
        displayReviews(review.productName)
      );
      productList.appendChild(li);
    });
  }

  function displayReviews(productName) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const modalTitle = document.getElementById("modal-title");
    const modalReviewList = document.getElementById("modal-review-list");

    modalTitle.textContent = `Отзывы о продукте "${productName}":`;
    modalReviewList.innerHTML = "";

    reviews.forEach((review) => {
      if (review.productName === productName) {
        const li = document.createElement("li");
        li.textContent = review.reviewText;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "Удалить";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteReview(review));

        li.appendChild(deleteBtn);
        modalReviewList.appendChild(li);
      }
    });

    document.getElementById("modal").style.display = "block";
  }

  function deleteReview(reviewToDelete) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews = reviews.filter(
      (review) =>
        !(
          review.productName === reviewToDelete.productName &&
          review.reviewText === reviewToDelete.reviewText
        )
    );
    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayProductList();

    document.getElementById("modal").style.display = "none";
  }


  displayProductList();
  document
    .getElementById("review-form")
    .addEventListener("submit", addReview);
























