const categories = {
    airfilter: Array.from({ length: 5 }, (_, i) => ({
        name: `Air Filter ${i + 1}`,
        description: `Air Filter ${i + 1}の詳細情報です。`,
        image: `https://placehold.jp/24/cccccc/ffffff/250x50.png?text=Air+Filter+${i + 1}`,
    })),
    oil: Array.from({ length: 5 }, (_, i) => ({
        name: `Oil Product ${i + 1}`,
        description: `Oil Product ${i + 1}の詳細情報です。`,
        image: `https://placehold.jp/24/cccccc/ffffff/250x50.png?text=Oil+Product+${i + 1}`,
    })),
    gas: Array.from({ length: 5 }, (_, i) => ({
        name: `Gas Product ${i + 1}`,
        description: `Gas Product ${i + 1}の詳細情報です。`,
        image: `https://placehold.jp/24/cccccc/ffffff/250x50.png?text=Gas+Product+${i + 1}`,
    })),
    etc: Array.from({ length: 5 }, (_, i) => ({
        name: `Other Product ${i + 1}`,
        description: `Other Product ${i + 1}の詳細情報です。`,
        image: `https://placehold.jp/24/cccccc/ffffff/250x50.png?text=Other+Product+${i + 1}`,
    })),
};

document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        const productList = document.querySelector("#product-list");
        const categoryTitle = document.querySelector("#category-title");
        const ul = productList.querySelector(".product-list");

        // カテゴリ名と製品リストの設定
        categoryTitle.textContent = button.textContent;
        ul.innerHTML = categories[category]
            .map(product => `
                <li>
                    <button data-product="${product.name}" data-description="${product.description}" data-image="${product.image}">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.name}
                    </button>
                </li>`)
            .join("");

        // セクションの表示切り替え
        productList.hidden = false;
        productList.style.display = "block";
        document.querySelector("#categories").hidden = true;
        document.querySelector("#categories").style.display = "none";

        // 製品ボタンにイベントリスナーを追加
        ul.querySelectorAll("button").forEach(productButton => {
            productButton.addEventListener("click", () => {
                const productTitle = document.querySelector("#product-title");
                const productDescription = document.querySelector("#product-description");
                const productImage = document.querySelector("#product-image");

                // 製品詳細の設定
                productTitle.textContent = productButton.dataset.product;
                productDescription.textContent = productButton.dataset.description;
                productImage.src = productButton.dataset.image;

                // 製品一覧を非表示
                document.querySelector("#product-list").hidden = true;
                document.querySelector("#product-details").hidden = false;
            });
        });
    });
});
// カテゴリ選択時の処理
document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        const productList = document.querySelector("#product-list");
        const categoryTitle = document.querySelector("#category-title");
        const ul = productList.querySelector(".product-list");

        // カテゴリ名と製品リストの設定
        categoryTitle.textContent = button.textContent;
        ul.innerHTML = categories[category]
            .map(product => `
                <li>
                    <button data-product="${product.name}" data-description="${product.description}" data-image="${product.image}">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.name}
                    </button>
                </li>`)
            .join("");

        // セクションの表示切り替え
        productList.hidden = false;
        productList.style.display = "block";
        document.querySelector("#categories").hidden = true;
        document.querySelector("#categories").style.display = "none";

        // 製品ボタンにイベントリスナーを追加
        ul.querySelectorAll("button").forEach(productButton => {
            productButton.addEventListener("click", () => {
                const productTitle = document.querySelector("#product-title");
                const productDescription = document.querySelector("#product-description");
                const productImage = document.querySelector("#product-image");

                // 製品詳細の設定
                productTitle.textContent = productButton.dataset.product;
                productDescription.textContent = productButton.dataset.description;
                productImage.src = productButton.dataset.image;

                // 製品一覧を非表示
                document.querySelector("#product-list").hidden = true;
                document.querySelector("#product-details").hidden = false;
            });
        });
    });
});

// カテゴリに戻るボタンの処理
document.querySelector("#back-to-categories").addEventListener("click", () => {
    document.querySelector("#categories").hidden = false;
    document.querySelector("#categories").style.display = "block";
    document.querySelector("#product-list").hidden = true;
    document.querySelector("#product-list").style.display = "none";
});

// 製品一覧に戻るボタンの処理
document.querySelector("#back-to-products").addEventListener("click", () => {
    document.querySelector("#product-list").hidden = false;
    document.querySelector("#product-list").style.display = "block";
    document.querySelector("#product-details").hidden = true;
    document.querySelector("#product-details").style.display = "none";
});
