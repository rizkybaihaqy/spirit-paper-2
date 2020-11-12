var img = new Image();
var mobileZoom = 0.75;

// (function () {
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
canvas.setBackgroundImage("imgs/500.png", canvas.renderAll.bind(canvas), {
  left: 250,
  top: 250,
});
if (screen.width < 576) {
  canvas.setZoom(mobileZoom);
  canvas.setWidth(500 * canvas.getZoom());
  canvas.setHeight(500 * canvas.getZoom());
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

document
  .getElementById("pilihanGambar")
  .addEventListener("change", function () {
    // console.log("gambar");
    var gambar = document.getElementById("pilihanGambar").value;
    img.src = gambar;

    fabric.Image.fromURL(img.src, function (img) {
      img.set({
        left: 250,
        top: 250,
        //   selectable: false,
      });

      var filter = new fabric.Image.filters.Brightness({
        brightness: -0.15,
      });
      img.filters.push(filter);
      img.applyFilters();
      canvas.backgroundImage = img;
      // canvas.add(img);
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
function persiapanPrint() {
  var teksAktif = canvas.getActiveObject();
  if (teksAktif) {
    canvas.discardActiveObject(teksAktif);
    canvas.requestRenderAll();
  }
}

function print(nama) {
  $("#c")
    .get(0)
    .toBlob(function (blob) {
      saveAs(blob, nama);
    });
}

document.getElementById("nama").addEventListener("change", function () {
  var nama = document.getElementById("nama").value;
  $("#download").click(function () {
    persiapanPrint();
    setTimeout(function () {
      print(nama);
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

//MULTI

//canvas_multi
var canvas_multi = (this.__canvas = new fabric.Canvas("c-multi", {
  preserveObjectStacking: true,
}));
canvas_multi.setBackgroundImage(
  "imgs/500.png",
  canvas_multi.renderAll.bind(canvas_multi),
  {
    left: 250,
    top: 250,
  }
);

if (screen.width < 576) {
  canvas_multi.setZoom(mobileZoom);
  canvas_multi.setWidth(500 * canvas.getZoom());
  canvas_multi.setHeight(500 * canvas.getZoom());
}

var text_multi = new fabric.Textbox(
  "Text Disni\ntextbox bisa ditambah dengan memilih tombol add new textbox",
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
canvas_multi.add(text_multi);

document
  .getElementById("pilihanGambar-multi")
  .addEventListener("change", function () {
    var gambar = document.getElementById("pilihanGambar-multi").value;
    img.src = gambar;
    //   console.log(img.src);

    fabric.Image.fromURL(img.src, function (img) {
      img.set({
        left: 250,
        top: 250,
        //   selectable: false,
      });

      var filter = new fabric.Image.filters.Brightness({
        brightness: -0.15,
      });
      img.filters.push(filter);
      img.applyFilters();
      canvas_multi.backgroundImage = img;
      // canvas_multi.add(img);
      canvas_multi.bringToFront(text_multi);
    });
  });

function addTextBox_multi() {
  var textLiar = new fabric.Textbox("TEXTBOX TAMBAHAN", {
    width: 200,
    fontSize: 20,
    fontFamily: "Helvetica",
    fill: "white",
    left: 250,
    top: 260,
    textAlign: "center",
  });
  canvas_multi.add(textLiar);
  //   canvas_multi.bringToFront(textLiar);
  //   console.log("ada");
}

function persiapanPrint() {
  var teksAktif = canvas_multi.getActiveObject();
  if (teksAktif) {
    canvas_multi.discardActiveObject(teksAktif);
    canvas_multi.requestRenderAll();
  }
}

function print(nama) {
  $("#c-multi")
    .get(0)
    .toBlob(function (blob) {
      saveAs(blob, nama);
    });
}

//Nama dan Filesaver
document.getElementById("nama-multi").addEventListener("change", function () {
  var nama = document.getElementById("nama-multi").value;
  $("#download-multi").click(function () {
    persiapanPrint();
    setTimeout(function () {
      print(nama);
    }, 1000);
  });
});

function validasiForm_multi() {
  if (document.forms["spiritPaper-multi"]["nama-multi"].value == "") {
    document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
      message: "Tulis Tujuan Surat Terlebih Dahulu",
    });
    return false;
  } else {
    return true;
  }
}
