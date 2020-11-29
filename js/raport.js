var img = new Image();
var mobileZoom = 0.61;

// (function () {
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
canvas.setBackgroundImage(
  "../imgs/raport/595x842.png",
  canvas.renderAll.bind(canvas),
  {
    originX: "left",
    originY: "top",
  }
);
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(canvas.width * canvas.getZoom());
  canvas.setHeight(canvas.height * canvas.getZoom());
}
$("#mobileZoomOut").on("click", function () {
  mobileZoom = mobileZoom - 0.01;
  canvas.setZoom(mobileZoom);
  canvas.setWidth(595 * canvas.getZoom());
  canvas.setHeight(842 * canvas.getZoom());
  console.log(canvas.width);
});
$("#mobileZoomIn").on("click", function () {
  mobileZoom = mobileZoom + 0.01;
  canvas.setZoom(mobileZoom);
  canvas.setWidth(595 * canvas.getZoom());
  canvas.setHeight(842 * canvas.getZoom());
});

var textOptions = {
  width: 480,
  fontSize: 15,
  fontFamily: "Helvetica",
  fill: "white",
  left: 320,
  top: 380,
  textAlign: "left",
  lockRotation: true,
  lockScalingX: true,
  lockScalingY: true,
  lockScalingFlip: true,
};
var isiNamaTeks;
var isiJabatanTeks;
var warnaDivisi = "rgba(255,0,0,0.5)";
var added;

var text = new fabric.Textbox(
  "Kalo masih ada yang mau disampein dan udah gamuat, kalian bisa pakek yang satunya lagi yang ada gamabar makannanya. Teks box ini Bisa di atur posisinya dengan cara pilh teksbox lalu geser. Cara edit teksnya adalah dengan select tekxbox hingga dapat mengedit teks. ",
  textOptions
);

var namaTeks = new fabric.Textbox("Nama", textOptions);
namaTeks.set({
  fontSize: 20,
  fill: "black",
  fontWeight: "bold",
  top: 235,
  selectable: false,
});
var jabatanTeks = new fabric.Textbox("Jabatan", textOptions);
jabatanTeks.set({
  fontSize: 25,
  fill: "black",
  fontWeight: "bold",
  top: 280,
  selectable: false,
});
// canvas.add(namaTeks);
// canvas.add(jabatanTeks);
// canvas.add(text);

$("#nama").on("change", function (isiNamaTeks) {
  isiNamaTeks = String(this.value);
  namaTeks.text = isiNamaTeks;
  canvas.requestRenderAll();
});
$("#jabatan").on("change", function (isiJabatanTeks) {
  isiJabatanTeks = String(this.value);
  jabatanTeks.text = isiJabatanTeks;

  var gambar;

  switch (isiJabatanTeks) {
    case "KETUA":
    case "WAKIL KETUA":
    case "SEKRETARIS 1":
    case "SEKRETARIS 2":
    case "BENDAHARA 1":
    case "BENDAHARA 2":
      gambar = "../imgs/raport/PH.png";
      warnaDivisi = "rgba(0,204,255,0.5)";
      break;
    case "KEPALA STAFF AHLI KOMINFO":
    case "STAFF AHLI KOMINFO":
      gambar = "../imgs/raport/KOMS.png";
      warnaDivisi = "rgba(51,96,153,0.5)";
      break;
    case "KEPALA DIVISI DIKLAT":
    case "DIVISI DIKLAT":
      gambar = "../imgs/raport/DIKLAT.png";
      warnaDivisi = "rgba(63,164,206,0.5)";
      break;
    case "KEPALA DIVISI PSDM":
    case "DIVISI PSDM":
      gambar = "../imgs/raport/PSDM.png";
      warnaDivisi = "rgba(191,53,57,0.5)";
      break;
    case "KEPALA DIVISI SOSIAL":
    case "DIVISI SOSIAL":
      gambar = "../imgs/raport/SOSIAL.png";
      warnaDivisi = "rgba(253,197,78,0.5)";
      break;
    case "KEPALA DIVISI EKOKEU":
    case "DIVISI EKOKEU":
      gambar = "../imgs/raport/EKOKU.png";
      warnaDivisi = "rgba(168,207,69,0.5)";
      break;
    case "KEPALA DIVISI MIKAT":
    case "DIVISI MIKAT":
      gambar = "../imgs/raport/MIKAT.png";
      warnaDivisi = "rgba(234,96,68,0.5)";
      break;
    default:
      gambar = "../imgs/raport/595x842.png";
      break;
  }

  nilai1.set("fill", warnaDivisi);
  nilai2.set("fill", warnaDivisi);
  nilai3.set("fill", warnaDivisi);
  nilai4.set("fill", warnaDivisi);

  img.src = gambar;

  fabric.Image.fromURL(img.src, function (img) {
    img.set({
      // Needed to position backgroundImage at 0/,
      originX: "left",
      originY: "top",
    });

    var filter = new fabric.Image.filters.Brightness({
      brightness: -0.15,
    });
    img.filters.push(filter);
    img.applyFilters();

    canvas.backgroundImage = img;
    // canvas.add(img);

    if (Boolean(added) == false) {
      canvas.add(namaTeks);
      canvas.add(jabatanTeks);
      canvas.add(text);

      canvas.add(group);

      canvas.add(teksNilai1);
      canvas.add(teksNilai2);
      canvas.add(teksNilai3);
      canvas.add(teksNilai4);

      added = true;
    }

    canvas.requestRenderAll();
    canvas.bringToFront(text);
  });
});

// function addTextBox() {
//   var textLiar = new fabric.Textbox("TEXTBOX TAMBAHAN", {
//     width: 200,
//     fontSize: 20,
//     fontFamily: "Helvetica",
//     fill: "white",
//     left: 250,
//     top: 260,
//     textAlign: "center",
//   });
//   canvas.add(textLiar);
//   canvas.bringToFront(textLiar);
//   console.log("ada");
// }
// })();

document.getElementById("nama").addEventListener("change", function () {
  var nama = document.getElementById("nama").value;
  nama = nama + ".png";
  $("#download").click(function () {
    //bersihkan canvas sebelum print
    canvas.discardActiveObject(canvas.getActiveObject());
    canvas.requestRenderAll();
    setTimeout(function () {
      //printing
      $("#c")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        });
    }, 1000);
  });
});

function validasiForm() {
  if (document.forms["spiritPaper"]["nama"].value == "") {
    document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
      message: "Tulis Tujuan Surat Terlebih Dahulu",
    });
    return false;
  } else {
    return true;
  }
}

// foto
document.getElementById("profil").addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      img.scale(0.2).set({
        left: 475,
        top: 200,
        clipPath: new fabric.Circle({
          left: 475,
          top: 150,
          radius: 79,
          absolutePositioned: true,
        }),
      });
      canvas.add(img);
    });
  };
  reader.readAsDataURL(file);
});

//Grafik Nilai

var modifier = 4;

var rectOptions = {
  width: 75,
  height: 100 * modifier,
  top: 775,
  left: 150,
  fill: warnaDivisi,
  selectable: false,
  rx: 10,
};

var nilai1 = new fabric.Rect(rectOptions);
nilai1.set("left", 100);
// canvas.add(nilai1);
var nilai2 = new fabric.Rect(rectOptions);
nilai2.set("left", 235);
// canvas.add(nilai2);
var nilai3 = new fabric.Rect(rectOptions);
nilai3.set("left", 365);
// canvas.add(nilai3);
var nilai4 = new fabric.Rect(rectOptions);
nilai4.set("left", 500);
// canvas.add(nilai3);

// group clipping
var clipPath = new fabric.Rect({
  width: 500,
  height: 250,
  top: 650,
  left: 300,
  absolutePositioned: true,
});
// canvas.add(clipPath);
var group = new fabric.Group([nilai1, nilai2, nilai3, nilai4]);
group.set({
  selectable: false,
});
group.clipPath = clipPath;
// canvas.add(group);

// Nilai

var isiTeksNilai1 = "Komitmen";
var isiTeksNilai2 = "Komunikasi";
var isiTeksNilai3 = "Inisiatif";
var isiTeksNilai4 = "Bidang";

var teksNilaiOptions = {
  width: 200,
  fontSize: 20,
  fontFamily: "Helvetica",
  fill: "white",
  left: 100,
  top: 775,
  textAlign: "center",
  selectable: false,
};

var teksNilai1 = new fabric.Textbox("100\n" + isiTeksNilai1, teksNilaiOptions);
teksNilai1.set("left", 100);
// canvas.add(teksNilai1);
var teksNilai2 = new fabric.Textbox("100\n" + isiTeksNilai2, teksNilaiOptions);
teksNilai2.set("left", 235);
// canvas.add(teksNilai2);
var teksNilai3 = new fabric.Textbox("100\n" + isiTeksNilai3, teksNilaiOptions);
teksNilai3.set("left", 365);
// canvas.add(teksNilai3);
var teksNilai4 = new fabric.Textbox("100\n" + isiTeksNilai4, teksNilaiOptions);
teksNilai4.set("left", 500);
// canvas.add(teksNilai4);

$("#nilai1").on("input", function () {
  kelasWarnaBiru(0);
  nilai1.set("height", parseInt(this.value) * modifier);
  teksNilai1.text = String(this.value) + "\n" + isiTeksNilai1;
  canvas.requestRenderAll();
  $("#nilai1").on("mouseup touchend", function () {
    kelasWarnaAbu(0);
  });
});
$("#nilai2").on("input", function () {
  kelasWarnaBiru(1);
  nilai2.set("height", parseInt(this.value) * modifier);
  teksNilai2.text = String(this.value) + "\n" + isiTeksNilai2;
  canvas.requestRenderAll();
  $("#nilai2").on("mouseup touchend", function () {
    kelasWarnaAbu(1);
  });
});
$("#nilai3").on("input", function () {
  kelasWarnaBiru(2);
  nilai3.set("height", parseInt(this.value) * modifier);
  teksNilai3.text = String(this.value) + "\n" + isiTeksNilai3;
  canvas.requestRenderAll();
  $("#nilai3").on("mouseup touchend", function () {
    kelasWarnaAbu(2);
  });
});
$("#nilai4").on("input", function () {
  kelasWarnaBiru(3);
  nilai4.set("height", parseInt(this.value) * modifier);
  teksNilai4.text = String(this.value) + "\n" + isiTeksNilai4;
  canvas.requestRenderAll();
  $("#nilai4").on("mouseup touchend", function () {
    kelasWarnaAbu(3);
  });
});

//styling grafik nilai
function kelasWarnaAbu(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--blue")
    .addClass("mdl-color-text--grey-400");
}

function kelasWarnaBiru(i) {
  $(".label-slider")
    .eq(i)
    .removeClass("mdl-color-text--grey-400")
    .addClass("mdl-color-text--blue");
}

//Utility

//tombol close
var img = document.createElement("img");
img.src = "../imgs/close.png";

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24,
});

function deleteObject(eventData, target) {
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}

//keyboard delete
// var canvasWrapper = document.getElementById("canvasWraper");
// canvasWrapper.tabIndex = 1000;
// canvasWrapper.addEventListener("keydown", deleteObjectKeyboard(), false);

// function deleteObjectKeyboard() {
//   document.onkeydown = function (e) {
//     if ("Delete" === e.key) {
//       canvas.remove(canvas.getActiveObject());
//       canvas.requestRenderAll();
//     }
//   };
// }
