/* Products page — “This or That” quiz (fun, gentle, minimal) */
(function () {
  "use strict";

  var section = document.getElementById("products-quiz");
  if (!section) return;

  var form = document.getElementById("products-quiz-form");
  var questionsEl = document.getElementById("products-quiz-questions");
  var submitBtn = document.getElementById("products-quiz-submit");
  var resultEl = document.getElementById("products-quiz-result");
  var resultTextEl = document.getElementById("products-quiz-result-text");
  var retakeBtn = document.getElementById("products-quiz-retake");
  var errorEl = document.getElementById("products-quiz-error");

  if (!form || !questionsEl || !submitBtn || !resultEl || !resultTextEl || !retakeBtn || !errorEl) return;

  var QUESTIONS = [
    { id: "q1", left: "Chocolate 🍫", right: "Sour Candy 🍬" },
    { id: "q2", left: "Water 💧", right: "Sparkling Water ✨" },
    { id: "q3", left: "Chips 🍟", right: "Popcorn 🍿" },
    { id: "q4", left: "Movie Night: Romance 💕", right: "Comedy 😂" },
    { id: "q5", left: "Socks 🧦", right: "Slippers 🥿" },
  ];

  var answers = Object.create(null); // { [id]: "A" | "B" }

  function setError(msg) {
    if (msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove("pg-visually-hidden");
    } else {
      errorEl.textContent = "";
      errorEl.classList.add("pg-visually-hidden");
    }
  }

  function allAnswered() {
    return QUESTIONS.every(function (q) {
      return answers[q.id] === "A" || answers[q.id] === "B";
    });
  }

  function selectAnswer(qid, choice) {
    answers[qid] = choice;

    var group = document.querySelector('[data-quiz-group="' + qid + '"]');
    if (!group) return;

    group.querySelectorAll("[data-quiz-choice]").forEach(function (btn) {
      var isSelected = btn.getAttribute("data-quiz-choice") === choice;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function computeResult() {
    var aCount = 0;
    var bCount = 0;

    QUESTIONS.forEach(function (q) {
      if (answers[q.id] === "A") aCount++;
      if (answers[q.id] === "B") bCount++;
    });

    if (aCount >= 4) {
      return "You’re giving cozy, comfort, keep-it-simple energy 💛\nYou might like starting with pads — they’re easy, familiar, and a lot of people begin here.";
    }
    if (bCount >= 4) {
      return "You’re giving flexible, go-with-the-flow energy ✨\nYou might be open to trying tampons or period underwear.";
    }
    return "You’re a mix of both — and honestly, that makes sense 🤍\nYou might like trying a few different options to see what feels best.";
  }

  function showResult(text) {
    resultTextEl.textContent = text;
    resultEl.hidden = false;
    resultEl.classList.add("is-visible");
    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideResult() {
    resultEl.hidden = true;
    resultEl.classList.remove("is-visible");
    resultTextEl.textContent = "";
  }

  function resetQuiz() {
    answers = Object.create(null);
    setError("");
    hideResult();

    document.querySelectorAll("[data-quiz-choice]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
    });
  }

  function render() {
    var frag = document.createDocumentFragment();

    QUESTIONS.forEach(function (q, idx) {
      var block = document.createElement("section");
      block.className = "products-quiz__q";
      block.setAttribute("aria-labelledby", q.id + "-title");

      var title = document.createElement("h3");
      title.className = "products-quiz__q-title";
      title.id = q.id + "-title";
      title.textContent = String(idx + 1) + ". " + q.left + " or " + q.right;

      var choices = document.createElement("div");
      choices.className = "products-quiz__choices";
      choices.setAttribute("role", "group");
      choices.setAttribute("aria-label", "Choose one");
      choices.setAttribute("data-quiz-group", q.id);

      var btnA = document.createElement("button");
      btnA.type = "button";
      btnA.className = "products-quiz__choice";
      btnA.textContent = q.left;
      btnA.setAttribute("data-quiz-choice", "A");
      btnA.setAttribute("aria-pressed", "false");
      btnA.addEventListener("click", function () {
        selectAnswer(q.id, "A");
        setError("");
      });

      var btnB = document.createElement("button");
      btnB.type = "button";
      btnB.className = "products-quiz__choice";
      btnB.textContent = q.right;
      btnB.setAttribute("data-quiz-choice", "B");
      btnB.setAttribute("aria-pressed", "false");
      btnB.addEventListener("click", function () {
        selectAnswer(q.id, "B");
        setError("");
      });

      choices.appendChild(btnA);
      choices.appendChild(btnB);
      block.appendChild(title);
      block.appendChild(choices);
      frag.appendChild(block);
    });

    questionsEl.innerHTML = "";
    questionsEl.appendChild(frag);
  }

  render();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!allAnswered()) {
      setError("Answer all 5 questions to see your result.");
      errorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    setError("");
    var resultText = computeResult();
    showResult(resultText);
  });

  retakeBtn.addEventListener("click", function () {
    resetQuiz();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    var firstChoice = section.querySelector("[data-quiz-choice]");
    if (firstChoice) firstChoice.focus();
  });
})();

