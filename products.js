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
      description: "A simple, low-cost option that can help you get started without overthinking it.",
      tags: ["Budget", "Beginner Friendly"],
      link: "https://sameday.dollartree.com/store/dollar-tree/products/32116940-bath-beauty-bpure-lavender-aloe-super-infused-pads-8-ct",
      image: "images/products/b-pure-pads.jpeg",
      alt: "B-Pure Pads product package",
    },
    {
      name: "Breeze Maxi Pads",
      category: "Pads",
      priceTier: "Affordable",
      description: "Basic protection that’s easy to find and easy to use.",
      tags: ["Budget"],
      link: "https://www.dollargeneral.com/p/breeze-maxi-pads-wingless-super-24ct/090891949540",
      image: "images/products/breeze-maxi-pads.jpeg",
      alt: "Breeze Maxi Pads product package",
    },
    {
      name: "H-E-B Maxi Pads",
      category: "Pads",
      priceTier: "Affordable",
      description: "A reliable everyday option that many people start with.",
      tags: ["Budget", "Beginner Friendly"],
      link: "https://www.heb.com/product-detail/3913008",
      image: "images/products/heb-maxi-pads.jpeg",
      alt: "H-E-B Maxi Pads product package",
    },
    {
      name: "Kotex U Maxi Night Defense",
      category: "Pads",
      priceTier: "Mid-range",
      description:
        "Great for heavier days or when you’re drifting off to sleep and don’t want leak worries tagging along—big coverage, low drama.",
      tags: ["Overnight", "Beginner Friendly"],
      link: "https://www.target.com/p/u-by-kotex-core-maxi-overnight-pads-39ct/-/A-94912086",
      image: "images/products/kotex-u-maxi-night-defense.png",
      alt: "Kotex U Maxi Night Defense overnight maxi pads box, thirty-nine count",
    },
    {
      name: "Always Pure Cotton with FlexFoam Pads (Size 3)",
      category: "Pads",
      priceTier: "Mid-range",
      description:
        "When your flow turns the volume up, a softer, more flexible pad can help you get through the day without constantly checking your outfit.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/always-pure-cotton-extra-heavy-flow-maxi-pads-size-3-22ct/-/A-84743594",
      image: "images/products/always-pure-cotton-flexfoam-size-3.png",
      alt: "Always Pure Cotton with FlexFoam pads size 3 extra heavy flow, twenty-two count box",
    },
    {
      name: "The Honey Pot Cotton Comfort Non-Herbal Pads (Regular with Wings)",
      category: "Pads",
      priceTier: "Mid-range",
      description:
        "Organic cotton up top and wings that help things stay put—nice if your skin likes simpler stuff and you want a calmer, everyday-at-school feel.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/the-honey-pot-company-non-herbal-regular-pads-with-wings-organic-cotton-cover-20ct/-/A-81782449",
      image: "images/products/honeypot-cotton-comfort-pads.png",
      alt: "The Honey Pot Cotton Comfort regular pads with wings, organic cotton cover, twenty count",
    },
    {
      name: "Cora Regular Pads (The Peace-of-Mind Pad)",
      category: "Pads",
      priceTier: "Higher-end",
      description:
        "Breathable organic cotton for regular-flow days when you want something gentle on your skin and a little “okay, I’m covered” in your pocket.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/cora-organic-cotton-ultra-thin-regular-fragrance-free-pads-with-wings-for-periods-regular-absorbency-32ct/-/A-76155164",
      image: "images/products/cora-peace-of-mind-pads.png",
      alt: "Cora The Peace-of-Mind Pad organic cotton topsheet regular pads, thirty-two count box",
    },
    {
      name: "L. 100% Organic Cotton Top Layer Pads - Super",
      category: "Pads",
      priceTier: "Higher-end",
      description:
        "A bit more absorbency for days that ask more of you—still aiming for a slimmer fit so you’re not doing the awkward waddle between classes.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/l-ultra-thin-super-menstrual-pads-42ct/-/A-93197760",
      image: "images/products/l-organic-cotton-pads-super.png",
      alt: "L. organic cotton top layer super menstrual pads, forty-two count box",
    },
    {
      name: "H-E-B Tampons",
      category: "Tampons",
      priceTier: "Affordable",
      description: "A simple and affordable option if you’re curious about trying tampons.",
      tags: ["Budget"],
      link: "https://www.heb.com/product-detail/6911501",
      image: "",
      alt: "H-E-B store brand tampons box",
    },
    {
      name: "Tampax Pearl Regular Tampons, 18 Count",
      category: "Tampons",
      priceTier: "Mid-range",
      description:
        "A lot of people’s first tampon for a reason—the smooth applicator can make the learning curve feel a little less awkward when you’re still figuring things out.",
      tags: ["Beginner Friendly"],
      link: "https://www.target.com/p/tampax-pearl-tampons-with-leakguard-braid-regular-absorbency-unscented-18ct/-/A-13234608",
      image: "images/products/tampax-pearl-regular.png",
      alt: "Front view of a box of 18 Tampax Pearl Regular tampons featuring the Leakguard Braid",
    },
    {
      name: "Cora The Comfort Fit Tampon",
      category: "Tampons",
      priceTier: "Mid-range",
      description:
        "Organic cotton with extra absorbency for heavier days—plus a comfort-minded applicator when you want tampons to feel a bit less scary to try.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/cora-organic-cotton-tampons-super-plus-absorbency-16ct/-/A-75665030",
      image: "images/products/cora-comfort-fit-tampons.png",
      alt: "Cora The Comfort Fit Tampon organic cotton Super+ absorbency, sixteen count box",
    },
    {
      name: "L. 100% Organic Cotton Tampons",
      category: "Tampons",
      priceTier: "Mid-range",
      description:
        "Lots of regular tampons tucked into pretty, reusable packaging—so restocking feels less like a chore and more like future-you getting a tiny treat.",
      tags: ["Organic Cotton"],
      link: "https://www.target.com/p/l-organic-cotton-full-size-refill-tampons-regular-42ct/-/A-84743591",
      image: "images/products/l-organic-cotton-tampons.png",
      alt: "L. organic cotton regular tampons Love for Women artists series, forty-two count box",
    },
    {
      name: "Thinx Teens™",
      category: "Period Underwear",
      priceTier: "Higher-end",
      description:
        "Feels closer to normal underwear while catching leaks—handy for school, practice, or anytime you want less “what if” noise in your head.",
      tags: ["Reusable", "Beginner Friendly"],
      link: "https://www.target.com/p/thinx-teens-bikini-leakproof-period-underwear-black-x-large/-/A-90038243",
      image: "images/products/thinx-teens-bikini.png",
      alt: "Thinx Teens bikini-style leakproof period underwear packaging",
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
      media.className = "product-card__media product-image";

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
      btn.textContent = "Learn More";
      btn.setAttribute("aria-label", "Learn more about " + p.name + " (opens in new tab)");

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
