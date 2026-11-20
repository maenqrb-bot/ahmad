/* غيّر اسمك من هنا فقط وبيتغير في كل الصفحات */
const MAKER = "اسمك هنا";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".maker").forEach(e => (e.textContent = MAKER));

  /* ظهور ناعم للبطاقات */
  const cards = document.querySelectorAll(".card,.qa,.qz");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    cards.forEach(c => { c.classList.add("rv"); io.observe(c); });
  }

  /* أظهر وأخفِ الإجابة */
  document.querySelectorAll(".tg").forEach(b => b.addEventListener("click", () => {
    const a = b.nextElementSibling;
    a.hidden = !a.hidden;
    b.classList.toggle("on", !a.hidden);
    b.textContent = a.hidden ? "أظهر الإجابة" : "أخفِ الإجابة";
  }));

  /* الاختبار التفاعلي */
  const qs = [...document.querySelectorAll(".qz")];
  if (!qs.length) return;
  const total = qs.length;
  let score = 0, done = 0;
  const $ = id => document.getElementById(id);

  const update = () => {
    $("sc").textContent = score;
    $("dn").textContent = done;
    $("pg").style.width = (done / total * 100) + "%";
    if (done === total) {
      $("fin").textContent = score + " من " + total;
      const r = score / total;
      $("msg").textContent = r >= 0.9 ? "أداء ممتاز" : r >= 0.7 ? "أداء جيد جدا" : r >= 0.5 ? "أداء جيد" : "راجع الدرس وأعد المحاولة";
      $("res").hidden = false;
      $("res").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  qs.forEach(q => q.querySelectorAll(".opt").forEach(o => o.addEventListener("click", () => {
    if (q.dataset.done) return;
    q.dataset.done = 1; done++;
    const ok = o.dataset.ok === "1";
    if (ok) score++;
    o.classList.add(ok ? "right" : "wrong");
    if (!ok) q.querySelector('.opt[data-ok="1"]').classList.add("right");
    const f = q.querySelector(".fb");
    f.textContent = (ok ? "إجابة صحيحة " : "إجابة خاطئة ") + (f.dataset.note || "");
    f.className = "fb show " + (ok ? "good" : "bad");
    update();
  })));

  document.querySelectorAll(".again").forEach(b => b.addEventListener("click", () => {
    score = 0; done = 0;
    qs.forEach(q => {
      delete q.dataset.done;
      q.querySelectorAll(".opt").forEach(o => o.classList.remove("right", "wrong"));
      q.querySelector(".fb").className = "fb";
    });
    $("res").hidden = true;
    update();
    $("res").hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
});
