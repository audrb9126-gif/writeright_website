/* ===== Scroll Reveal (Intersection Observer) ===== */
(() => {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
})();

/* ===== Signup Form ===== */
const form = document.querySelector(".signup-form");
const statusEl = document.querySelector(".form-status");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const email = String(data.get("email") || "").trim();
  const interest = String(data.get("interest") || "").trim();
  const endpoint = form.dataset.endpoint;
  const recipient = form.dataset.recipient || "mykyu718@naver.com";

  if (!email) {
    statusEl.textContent = "이메일을 입력해주세요.";
    return;
  }

  const payload = {
    email,
    interest,
    createdAt: new Date().toISOString(),
    source: "WriteRight landing page",
  };

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("request failed");
      statusEl.textContent = "신청이 완료되었습니다. 베타 소식으로 곧 만나요.";
      form.reset();
      return;
    } catch {
      statusEl.textContent = "전송이 막혀 메일 앱으로 연결합니다.";
    }
  } else {
    statusEl.textContent = "메일 앱으로 신청 내용을 전달합니다.";
  }

  const subject = encodeURIComponent("[WriteRight] 베타 알림 신청");
  const body = encodeURIComponent(
    `이메일: ${email}\n관심 사용처: ${interest}\n신청 시간: ${payload.createdAt}`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

/* ===== Header Scroll Effect ===== */
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        header.style.boxShadow = "0 4px 24px rgba(12, 20, 32, 0.08)";
      } else {
        header.style.boxShadow = "none";
      }
      lastScroll = currentScroll;
    },
    { passive: true }
  );
})();
