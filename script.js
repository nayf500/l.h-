const arabicDigits = {
  "0":"٠","1":"١","2":"٢","3":"٣","4":"٤",
  "5":"٥","6":"٦","7":"٧","8":"٨","9":"٩"
};

/*
  التحويل المستخدم في لوحات المركبات السعودية:
  ا=A، ب=B، ح=J، د=D، ر=R، س=S، ص=X، ط=T،
  ع=E، ق=G، ك=K، ل=L، م=Z، ن=N، هـ=H، و=U، ى=V
*/
const plateLetterMap = {
  "ا":"A","أ":"A","إ":"A","آ":"A",
  "ب":"B",
  "ح":"J",
  "د":"D",
  "ر":"R",
  "س":"S",
  "ص":"X",
  "ط":"T",
  "ع":"E",
  "ق":"G",
  "ك":"K",
  "ل":"L",
  "م":"Z",
  "ن":"N",
  "ه":"H","هـ":"H",
  "و":"U",
  "ى":"V","ي":"V"
};

const $ = id => document.getElementById(id);

function toArabicNumbers(value){
  return String(value).split("").map(c => arabicDigits[c] || c).join("");
}

function arabicToEnglish(text){
  // إزالة المسافات وتحويل كل حرف عربي إلى الحرف اللاتيني المقابل.
  const chars = text.replace(/\s+/g,"").split("");
  return chars.map(ch => plateLetterMap[ch] || "?").join(" ");
}

function updatePlate(){
  const ar = $("lettersAr").value.trim() || "ع ع ب";
  const num = $("numbers").value.replace(/\D/g,"").slice(0,4) || "884";
  const en = arabicToEnglish(ar);

  $("arabicLetters").textContent = ar;
  $("englishLetters").textContent = en;
  $("lettersEn").value = en;

  $("arabicNumbers").textContent = toArabicNumbers(num);
  $("englishNumbers").textContent = num;

  $("mappingInfo").textContent =
    "التحويل التلقائي: " + ar.replace(/\s+/g," ") + "  ←  " + en;
}

$("lettersAr").addEventListener("input", updatePlate);
$("numbers").addEventListener("input", updatePlate);

$("download").addEventListener("click", () => {
  updatePlate();

  const svg = $("saudiPlate").cloneNode(true);
  svg.setAttribute("xmlns","http://www.w3.org/2000/svg");

  const source =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    new XMLSerializer().serializeToString(svg);

  const blob = new Blob([source], {
    type:"image/svg+xml;charset=utf-8"
  });

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
