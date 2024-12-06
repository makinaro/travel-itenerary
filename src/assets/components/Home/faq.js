// faq.js
export function toggleFAQAnswer(event) {
  const answer = event.target.nextElementSibling;
  if (answer.style.display === "block") {
    answer.style.display = "none";
  } else {
    answer.style.display = "block";
  }
}
