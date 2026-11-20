// SpendWise - budget tracker
const STORAGE_KEY = "spendwise-data";
let budget = 0;
let expenses = []; // array of {id, name, amount, category}

const $ = (id) => document.getElementById(id);
const money = (n) => "KES " + Number(n).toLocaleString("en-KE", { maximumFractionDigits: 2 });

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data) { budget = data.budget || 0; expenses = data.expenses || []; }
  } catch (e) { budget = 0; expenses = []; }
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, expenses })); } catch (e) {}
}

function updateFilterOptions() {
  const filter = $("filter");
  const current = filter.value;
  const cats = ["All", ...new Set(expenses.map((e) => e.category))];
  filter.innerHTML = "";
  for (const c of cats) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c === "All" ? "All categories" : c;
    filter.appendChild(opt);
  }
  filter.value = cats.includes(current) ? current : "All";
}

function render() {
  let spent = 0;
  for (const e of expenses) spent += e.amount;
  const remaining = budget - spent;

  $("total-budget").textContent = money(budget);
  $("total-spent").textContent = money(spent);
  $("remaining").textContent = money(remaining);

  // Budget feedback (conditionals)
  const fb = $("feedback");
  const fill = $("meter-fill");
  const pct = budget > 0 ? (spent / budget) * 100 : 0;
  fill.style.width = Math.min(pct, 100) + "%";
  fb.className = "feedback";
  if (budget <= 0) {
    fb.textContent = "Set a budget to get started.";
    fill.style.background = "var(--ok)";
  } else if (spent > budget) {
    fb.textContent = "Over budget by " + money(spent - budget) + ". Cut back on spending.";
    fb.classList.add("bad"); fill.style.background = "var(--bad)";
  } else if (pct >= 80) {
    fb.textContent = "Careful: you have used " + Math.round(pct) + "% of your budget.";
    fb.classList.add("warn"); fill.style.background = "var(--warn)";
  } else {
    fb.textContent = "You are on track. " + money(remaining) + " left.";
    fb.classList.add("ok"); fill.style.background = "var(--ok)";
  }

  // Expense list (loop + DOM)
  updateFilterOptions();
  const list = $("expense-list");
  list.innerHTML = "";
  const selected = $("filter").value;
  let shown = 0;
  for (const e of expenses) {
    if (selected !== "All" && e.category !== selected) continue;
    shown++;
    const li = document.createElement("li");
    const info = document.createElement("div");
    const name = document.createElement("div");
    name.className = "name"; name.textContent = e.name;
    const cat = document.createElement("div");
    cat.className = "cat"; cat.textContent = e.category;
    info.append(name, cat);
    const amt = document.createElement("span");
    amt.className = "amt"; amt.textContent = money(e.amount);
    const del = document.createElement("button");
    del.className = "delete"; del.type = "button";
    del.textContent = "Delete";
    del.setAttribute("aria-label", "Delete " + e.name);
    del.addEventListener("click", () => deleteExpense(e.id));
    li.append(info, amt, del);
    list.appendChild(li);
  }
  $("empty-state").style.display = shown === 0 ? "block" : "none";
}

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  save(); render();
}

$("budget-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const value = parseFloat($("budget-input").value);
  if (isNaN(value) || value <= 0) return;
  budget = value;
  $("budget-input").value = "";
  save(); render();
});

$("expense-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const name = $("expense-name").value.trim();
  const amount = parseFloat($("expense-amount").value);
  const category = $("expense-category").value;
  const error = $("form-error");
  if (!name || isNaN(amount) || amount <= 0) {
    error.textContent = "Enter a description and an amount greater than 0.";
    return;
  }
  error.textContent = "";
  expenses.push({ id: Date.now(), name, amount, category });
  ev.target.reset();
  save(); render();
});

$("filter").addEventListener("change", render);

$("clear-all").addEventListener("click", () => {
  if (confirm("Delete your budget and all expenses?")) {
    budget = 0; expenses = [];
    save(); render();
  }
});

load();
render();
