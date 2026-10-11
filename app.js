"use strict";
const briefForm = document.getElementById("brief-form");
if (briefForm) briefForm.addEventListener("submit", function(event) {
 event.preventDefault();
 const values = new FormData(this);
 const text = ["INDUSTRIAL GEARBOX REPAIR BRIEF", "Prepared at industrialgearboxservice.com", "", "Equipment: " + values.get("equipment"), "Facility: " + (values.get("location") || "Not specified"), "Symptoms and application: " + values.get("symptoms"), "Deadline: " + (values.get("deadline") || "Not specified"), "", "Attach nameplate and equipment photographs where available.", "This brief has not been sent."].join("\n");
 const status = document.getElementById("brief-status");
 if (event.submitter && event.submitter.value === "email") {
  const draft = document.createElement("a");
  draft.href = "mailto:industrialgearboxservices@gmail.com?subject=" + encodeURIComponent("Gearbox repair inquiry") + "&body=" + encodeURIComponent(text);
  document.body.appendChild(draft); draft.click(); draft.remove();
  status.textContent = "Email draft requested. Review and send it in your email app. If no app opens, save the brief and email it to industrialgearboxservices@gmail.com. Nothing has been sent automatically.";
  return;
 }
 const url = URL.createObjectURL(new Blob([text], {type:"text/plain;charset=utf-8"}));
 const a = document.createElement("a"); a.href=url; a.download="industrial-gearbox-repair-brief.txt"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
 status.textContent="Your repair brief is ready to download. Nothing has been sent. You can attach it to an email to industrialgearboxservices@gmail.com.";
});
