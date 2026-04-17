/**
 * Resources page — example May 2026 period tracker (plain JS, no persistence).
 */
(function () {
  "use strict";

  var grid = document.getElementById("periodCalendar");
  var summaryEl = document.getElementById("calendarSummary");
  var resetBtn = document.getElementById("calendarResetBtn");
  if (!grid || !summaryEl || !resetBtn) return;

  var flowStates = [
    { name: "none", emoji: "", label: "no flow selected" },
    { name: "light", emoji: "🌸", label: "light flow" },
    { name: "medium", emoji: "❤️", label: "medium flow" },
    { name: "heavy", emoji: "🌙", label: "heavy flow" },
  ];

  var year = 2026;
  var monthIndex = 4;
  var monthLabel = "May";
  var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  var startWeekday = new Date(year, monthIndex, 1).getDay();

  var defaultSummary = "Tap a few days to see an example pattern.";

  function ariaFor(dayNum, stateIdx) {
    return monthLabel + " " + dayNum + ", " + flowStates[stateIdx].label;
  }

  function applyState(btn, stateIdx) {
    var s = flowStates[stateIdx];
    btn.dataset.stateIndex = String(stateIdx);
    btn.dataset.state = s.name;
    btn.setAttribute("aria-label", ariaFor(btn.dataset.day, stateIdx));
    var emojiEl = btn.querySelector(".day-emoji");
    if (emojiEl) emojiEl.textContent = s.emoji;
  }

  function countMarkedDays() {
    var n = 0;
    var buttons = grid.querySelectorAll(".calendar-day");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.state !== "none") n++;
    }
    return n;
  }

  function updateSummary() {
    var c = countMarkedDays();
    if (c === 0) {
      summaryEl.textContent = defaultSummary;
    } else if (c === 1) {
      summaryEl.textContent = "Your period lasted about 1 day.";
    } else {
      summaryEl.textContent = "Your period lasted about " + c + " days.";
    }
  }

  function advanceState(ev) {
    var btn = ev.currentTarget;
    var idx = parseInt(btn.dataset.stateIndex, 10) || 0;
    idx = (idx + 1) % flowStates.length;
    applyState(btn, idx);
    updateSummary();
  }

  var i;
  for (i = 0; i < startWeekday; i++) {
    var spacer = document.createElement("span");
    spacer.className = "calendar-spacer";
    spacer.setAttribute("aria-hidden", "true");
    grid.appendChild(spacer);
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var dayBtn = document.createElement("button");
    dayBtn.type = "button";
    dayBtn.className = "calendar-day";
    dayBtn.dataset.day = String(d);

    var numSpan = document.createElement("span");
    numSpan.className = "day-number";
    numSpan.textContent = String(d);

    var emojiSpan = document.createElement("span");
    emojiSpan.className = "day-emoji";
    emojiSpan.setAttribute("aria-hidden", "true");

    dayBtn.appendChild(numSpan);
    dayBtn.appendChild(emojiSpan);
    applyState(dayBtn, 0);
    dayBtn.addEventListener("click", advanceState);
    grid.appendChild(dayBtn);
  }

  resetBtn.addEventListener("click", function () {
    var buttons = grid.querySelectorAll(".calendar-day");
    for (var j = 0; j < buttons.length; j++) {
      applyState(buttons[j], 0);
    }
    updateSummary();
  });
})();
