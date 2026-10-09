"use strict";
document.getElementById("brief-form").addEventListener("submit",function(event){
 event.preventDefault();
 const values=new FormData(this);
 const text=["INDUSTRIAL GEARBOX REPAIR BRIEF", "Prepared at industrialgearboxservice.com preview", "", "Equipment: "+values.get("equipment"), "Facility: "+values.get("location"), "Symptoms and application: "+values.get("symptoms"), "Deadline: "+values.get("deadline"), "", "Attach nameplate and equipment photographs when submitting to your repair provider.", "This brief has not been sent."].join("\n");
 const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="industrial-gearbox-repair-brief.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 document.getElementById("brief-status").textContent="Your repair brief is ready to download. Nothing has been sent.";
});
