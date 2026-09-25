const arabicDigits = {
  "0":"٠","1":"١","2":"٢","3":"٣","4":"٤",
  "5":"٥","6":"٦","7":"٧","8":"٨","9":"٩"
};

const $ = id => document.getElementById(id);

function toArabicNumbers(value){
  return String(value).split("")
    .map(char => arabicDigits[char] || char)
    .join("");
}

function updatePlate(){
  let ar = $("lettersAr").value.trim() || "ع ع ب";
  let num = $("numbers").value.replace(/\D/g,"").slice(0,4) || "884";
  let en = $("lettersEn").value
    .toUpperCase()
    .replace(/[^A-Z]/g,"")
    .slice(0,3) || "BEV";

  $("arabicLetters").textContent = ar;
  $("arabicNumbers").textContent = toArabicNumbers(num);
  $("englishNumbers").textContent = num;
  $("englishLetters").textContent = en;
}

["lettersAr","numbers","lettersEn"].forEach(id => {
  $(id).addEventListener("input", updatePlate);
});

$("download").addEventListener("click", () => {
  updatePlate();

  const svg = $("saudiPlate").cloneNode(true);
  svg.setAttribute("xmlns","http://www.w3.org/2000/svg");

  const source =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    new XMLSerializer().serializeToString(svg);

  const blob = new Blob([source], {type:"image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "saudi-plate-demo.svg";
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

updatePlate();
