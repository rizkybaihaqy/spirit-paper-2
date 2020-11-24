var img = new Image();
var mobileZoom = 0.65;

// (function () {
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
canvas.setBackgroundImage("../imgs/500.png", canvas.renderAll.bind(canvas), {
  left: 250,
  top: 250,
});
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(canvas.height * canvas.getZoom());
  canvas.setHeight(canvas.width * canvas.getZoom());
}

var text = new fabric.Textbox(
  "Text Disni\ntextbox bisa diubah ukuran dan posisi",
  {
    width: 200,
    fontSize: 20,
    fontFamily: "Helvetica",
    fill: "white",
    left: 250,
    top: 260,
    textAlign: "center",
  }
);
canvas.add(text);

// document
//   .getElementById("pilihanGambar")
//   .addEventListener("change", function () {
//     // console.log("gambar");
//     var gambar = document.getElementById("pilihanGambar").value;
//     img.src = gambar;

//     fabric.Image.fromURL(img.src, function (img) {
//       img.set({
//         left: 250,
//         top: 250,
//         //   selectable: false,
//       });

//       var filter = new fabric.Image.filters.Brightness({
//         brightness: -0.15,
//       });
//       img.filters.push(filter);
//       img.applyFilters();
//       canvas.backgroundImage = img;
//       // canvas.add(img);
//       canvas.bringToFront(text);
//     });
//   });

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
        left: 250,
        top: 100,
        clipPath: new fabric.Circle({
          left: 250,
          top: 100,
          radius: 100,
          absolutePositioned: true,
        }),
      });
      canvas.add(img);
    });
  };
  reader.readAsDataURL(file);
});

//Grafik Nilai

var rectOptions = {
  width: 100,
  height: 300,
  top: 400,
  left: 100,
  fill: "rgba(255,0,0,0.5)",
  selectable: false,
};

var nilai1 = new fabric.Rect(rectOptions);
nilai1.set("left", 100);
// canvas.add(nilai1);
var nilai2 = new fabric.Rect(rectOptions);
nilai2.set("left", 250);
// canvas.add(nilai2);
var nilai3 = new fabric.Rect(rectOptions);
nilai3.set("left", 400);
// canvas.add(nilai3);

// group clipping
var clipPath = new fabric.Rect({
  width: 450,
  height: 200,
  top: 300,
  left: 250,
  absolutePositioned: true,
});
canvas.add(clipPath);
var group = new fabric.Group([nilai1, nilai2, nilai3]);
group.set({
  selectable: false,
});
group.clipPath = clipPath;
canvas.add(group);

var teksNilaiOptions = {
  width: 200,
  fontSize: 20,
  fontFamily: "Helvetica",
  fill: "white",
  left: 100,
  top: 300,
  textAlign: "center",
  selectable: false,
};

var teksNilai1 = new fabric.Textbox("Nilai1", teksNilaiOptions);
teksNilai1.set("left", 100);
canvas.add(teksNilai1);
var teksNilai2 = new fabric.Textbox("Nilai2", teksNilaiOptions);
teksNilai2.set("left", 250);
canvas.add(teksNilai2);
var teksNilai3 = new fabric.Textbox("Nilai3", teksNilaiOptions);
teksNilai3.set("left", 400);
canvas.add(teksNilai3);

$("#nilai1").on("input", function () {
  kelasWarnaBiru(0);
  nilai1.set("height", parseInt(this.value) * 3);
  teksNilai1.text = "Nilai1\n" + String(this.value);
  canvas.requestRenderAll();
  $("#nilai1").on("mouseup touchend", function () {
    kelasWarnaAbu(0);
  });
});
$("#nilai2").on("input", function () {
  kelasWarnaBiru(1);
  nilai2.set("height", parseInt(this.value) * 3);
  teksNilai2.text = "Nilai2\n" + String(this.value);
  canvas.requestRenderAll();
  $("#nilai2").on("mouseup touchend", function () {
    kelasWarnaAbu(1);
  });
});
$("#nilai3").on("input", function () {
  kelasWarnaBiru(2);
  nilai3.set("height", parseInt(this.value) * 3);
  teksNilai3.text = "Nilai3\n" + String(this.value);
  canvas.requestRenderAll();
  $("#nilai3").on("mouseup touchend", function () {
    kelasWarnaAbu(2);
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
var canvasWrapper = document.getElementById("canvasWraper");
canvasWrapper.tabIndex = 1000;
canvasWrapper.addEventListener("keydown", deleteObjectKeyboard(), false);

function deleteObjectKeyboard() {
  document.onkeydown = function (e) {
    if ("Delete" === e.key) {
      canvas.remove(canvas.getActiveObject());
      canvas.requestRenderAll();
    }
  };
}
