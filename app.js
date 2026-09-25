let seconds=60,total=60,paused=false;
const clock=document.getElementById("clock"),bar=document.getElementById("bar"),pause=document.getElementById("pause");
function draw(){let m=Math.floor(seconds/60),s=seconds%60;clock.textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");bar.style.width=(seconds/Math.max(total,1)*100)+"%"}
setInterval(()=>{if(!paused&&seconds>0){seconds--;draw()}},1000);draw();
document.getElementById("add1").onclick=()=>{seconds+=60;total=Math.max(total,seconds);draw()};
document.getElementById("add2").onclick=()=>{seconds+=120;total=Math.max(total,seconds);draw()};
pause.onclick=()=>{paused=!paused;pause.textContent=paused?"▶ متابعة":"⏸ إيقاف مؤقت"};
document.getElementById("reset").onclick=()=>{seconds=60;total=60;paused=false;pause.textContent="⏸ إيقاف مؤقت";draw()};
const modal=document.getElementById("modal");
document.querySelector(".admin-btn").onclick=()=>modal.classList.remove("hidden");
document.getElementById("close").onclick=()=>modal.classList.add("hidden");
document.getElementById("save").onclick=()=>{seconds=Math.max(1,+document.getElementById("duration").value||60);total=seconds;modal.classList.add("hidden");draw()};
