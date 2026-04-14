/**
 * Products page — data-driven cards and filters.
 * Set `image` on a product to a stable HTTPS URL when you have one; otherwise
 * category illustrations in /images/products/ are used (with img onerror fallback).
 */
(function () {
  "use strict";

  var CATEGORY_IMAGES = {
    Pads: "images/products/pads.svg",
    Tampons: "images/products/tampons.svg",
    "Period Underwear": "images/products/period-underwear.svg",
  };

  var PRODUCTS = [
    {
      name: "B-Pure Pads",
      category: "Pads",
      priceTier: "Affordable",
      description: "Simple and very affordable. A good starting option.",
      tags: ["Budget", "Beginner Friendly"],
      link: "https://sameday.dollartree.com/store/dollar-tree/products/32116940-bath-beauty-bpure-lavender-aloe-super-infused-pads-8-ct",
      image: "images/products/b-pure-pads.jpeg",
      alt: "B-Pure Pads product package",
    },
    {
      name: "Breeze Maxi Pads",
      category: "Pads",
      priceTier: "Affordable",
      description: "Basic protection and easy to find in stores.",
      tags: ["Budget"],
      link: "https://www.dollargeneral.com/p/breeze-maxi-pads-wingless-super-24ct/090891949540",
      image: "images/products/breeze-maxi-pads.jpeg",
      alt: "Breeze Maxi Pads product package",
    },
    {
      name: "H-E-B Maxi Pads",
      category: "Pads",
      priceTier: "Affordable",
      description: "Affordable and reliable for everyday use.",
      tags: ["Budget", "Beginner Friendly"],
      link: "https://www.heb.com/product-detail/3913008",
      image: "images/products/heb-maxi-pads.jpeg",
      alt: "H-E-B Maxi Pads product package",
    },
    {
      name: "U by Kotex Overnight Pads",
      category: "Pads",
      priceTier: "Mid-range",
      description: "Great for heavier flow or overnight protection.",
      tags: ["Overnight", "Beginner Friendly"],
      link: "https://www.target.com/p/u-by-kotex-core-maxi-overnight-pads-39ct/-/A-94912086",
      image: "",
      alt: "U by Kotex overnight maxi pads, thirty-nine count box",
    },
    {
      name: "Always Pure Cotton Pads",
      category: "Pads",
      priceTier: "Mid-range",
      description: "Soft cotton feel and more comfortable for sensitive skin.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/always-pure-cotton-extra-heavy-flow-maxi-pads-size-3-22ct/-/A-84743594",
      image: "",
      alt: "Always Pure Cotton extra heavy flow maxi pads, twenty-two count",
    },
    {
      name: "The Honey Pot Pads",
      category: "Pads",
      priceTier: "Mid-range",
      description: "A softer-feeling option that some people prefer for comfort.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/the-honey-pot-company-non-herbal-regular-pads-with-wings-organic-cotton-cover-20ct/-/A-81782449",
      image: "",
      alt: "The Honey Pot regular pads with wings and organic cotton cover, twenty count",
    },
    {
      name: "Cora Organic Pads",
      category: "Pads",
      priceTier: "Higher-end",
      description: "Organic cotton and a softer, more premium feel.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/cora-organic-cotton-ultra-thin-regular-fragrance-free-pads-with-wings-for-periods-regular-absorbency-32ct/-/A-76155164",
      image: "",
      alt: "Cora organic cotton ultra-thin regular pads with wings, thirty-two count",
    },
    {
      name: "L. Organic Cotton Pads",
      category: "Pads",
      priceTier: "Higher-end",
      description: "Simple, clean, and made with organic materials.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/l-ultra-thin-super-menstrual-pads-42ct/-/A-93197760",
      image: "",
      alt: "L. ultra-thin super menstrual pads with organic cotton, forty-two count",
    },
    {
      name: "H-E-B Tampons",
      category: "Tampons",
      priceTier: "Affordable",
      description: "Affordable and simple to use.",
      tags: ["Budget"],
      link: "https://www.heb.com/product-detail/6911501",
      image: "",
      alt: "H-E-B store brand tampons box",
    },
    {
      name: "Tampax Pearl",
      category: "Tampons",
      priceTier: "Mid-range",
      description: "A popular option with a smoother applicator.",
      tags: ["Beginner Friendly"],
      link: "https://www.target.com/p/tampax-pearl-tampons-with-leakguard-braid-regular-absorbency-unscented-18ct/-/A-13234608",
      image: "",
      alt: "Tampax Pearl regular absorbency unscented tampons with leakguard braid, eighteen count",
    },
    {
      name: "Cora Organic Tampons",
      category: "Tampons",
      priceTier: "Mid-range",
      description: "Organic cotton option for a more natural feel.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/cora-organic-cotton-tampons-super-plus-absorbency-16ct/-/A-75665030",
      image: "",
      alt: "Cora organic cotton tampons super plus absorbency, sixteen count",
    },
    {
      name: "L. Organic Tampons",
      category: "Tampons",
      priceTier: "Mid-range",
      description: "Simple, clean, and widely available.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/l-organic-cotton-full-size-refill-tampons-regular-42ct/-/A-84743591",
      image: "",
      alt: "L. organic cotton regular tampons refill, forty-two count",
    },
    {
      name: "Thinx Teens",
      category: "Period Underwear",
      priceTier: "Higher-end",
      description: "Designed specifically for teens. Comfortable and reusable.",
      tags: ["Reusable", "Beginner Friendly"],
      link: "https://www.target.com/p/thinx-teens-bikini-leakproof-period-underwear-black-x-large/-/A-90038243",
      image: "",
      alt: "Thinx Teens black bikini-style leakproof period underwear",
    },
  ];

  var gridEl = document.getElementById("product-grid");
  var emptyEl = document.getElementById("products-empty");
  var clearTagsBtn = document.getElementById("products-clear-tags");
  if (!gridEl) return;

  var selectedCategory = "all";
  var selectedTags = new Set();

  function updateClearTagsButton() {
    if (!clearTagsBtn) return;
    clearTagsBtn.hidden = selectedTags.size === 0;
  }

  function imageSrcFor(product) {
    if (product.image && String(product.image).trim()) {
      return String(product.image).trim();
    }
    return CATEGORY_IMAGES[product.category] || "images/products/pads.svg";
  }

  function tierLabel(tier) {
    if (tier === "Affordable") return "Budget-friendly";
    if (tier === "Mid-range") return "Mid-range";
    if (tier === "Higher-end") return "Premium";
    return tier;
  }

  function productMatches(p) {
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    if (selectedTags.size === 0) return true;
    return p.tags.some(function (t) {
      return selectedTags.has(t);
    });
  }

  function renderCards() {
    gridEl.innerHTML = "";
    var visible = 0;

    PRODUCTS.forEach(function (p, index) {
      var match = productMatches(p);
      if (!match) return;
      visible++;

      var article = document.createElement("article");
      article.className = "product-card";
      article.setAttribute("role", "listitem");
      article.setAttribute("data-category", p.category);
      article.setAttribute("data-index", String(index));

      var media = document.createElement("div");
      media.className = "product-card__media";

      var img = document.createElement("img");
      img.className = "product-card__img";
      img.src = imageSrcFor(p);
      img.alt = p.alt || p.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function onImgErr() {
        img.removeEventListener("error", onImgErr);
        img.src = CATEGORY_IMAGES[p.category] || "images/products/pads.svg";
      });

      media.appendChild(img);

      var body = document.createElement("div");
      body.className = "product-card__body";

      var h2 = document.createElement("h3");
      h2.className = "product-card__title";
      h2.textContent = p.name;

      var meta = document.createElement("p");
      meta.className = "product-card__meta";
      meta.textContent = p.category + " · " + tierLabel(p.priceTier);

      var desc = document.createElement("p");
      desc.className = "product-card__desc";
      desc.textContent = p.description;

      var tagsWrap = document.createElement("ul");
      tagsWrap.className = "product-card__tags";
      tagsWrap.setAttribute("aria-label", "Tags");

      p.tags.forEach(function (tag) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.className = "product-card__tag";
        span.textContent = tag;
        li.appendChild(span);
        tagsWrap.appendChild(li);
      });

      var btn = document.createElement("a");
      btn.className = "product-card__btn";
      btn.href = p.link;
      btn.rel = "noopener noreferrer";
      btn.target = "_blank";
      btn.textContent = "View Product";
      btn.setAttribute("aria-label", "View " + p.name + " (opens in new tab)");

      body.appendChild(h2);
      body.appendChild(meta);
      body.appendChild(desc);
      body.appendChild(tagsWrap);
      body.appendChild(btn);

      article.appendChild(media);
      article.appendChild(body);
      gridEl.appendChild(article);
    });

    if (emptyEl) {
      emptyEl.hidden = visible > 0;
    }
    gridEl.setAttribute("aria-busy", "false");
    updateClearTagsButton();
  }

  function setCategory(cat) {
    selectedCategory = cat;
    document.querySelectorAll("[data-filter-cat]").forEach(function (btn) {
      var v = btn.getAttribute("data-filter-cat") || "all";
      btn.setAttribute("aria-pressed", v === cat ? "true" : "false");
    });
    renderCards();
  }

  function toggleTag(tag) {
    var btn = document.querySelector('[data-filter-tag="' + tag + '"]');
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
      if (btn) btn.setAttribute("aria-pressed", "false");
    } else {
      selectedTags.add(tag);
      if (btn) btn.setAttribute("aria-pressed", "true");
    }
    renderCards();
  }

  function clearTags() {
    selectedTags.clear();
    document.querySelectorAll("[data-filter-tag]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
    });
    renderCards();
  }

  document.querySelectorAll("[data-filter-cat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter-cat") || "all";
      setCategory(cat);
    });
  });

  document.querySelectorAll("[data-filter-tag]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-filter-tag");
      if (!tag) return;
      toggleTag(tag);
    });
  });

  var clearBtn = document.getElementById("products-clear-tags");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      clearTags();
    });
  }

  gridEl.setAttribute("aria-busy", "true");
  renderCards();
})();
