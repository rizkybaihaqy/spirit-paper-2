var img = new Image();
var mobileZoom = 0.65;

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

//Nama dan Filesaver
document.getElementById("nama-multi").addEventListener("change", function () {
  var nama = document.getElementById("nama-multi").value;
  nama = nama + ".png";
  $("#download-multi").click(function () {
    //bersihkan canvas sebelum print
    canvas_multi.discardActiveObject(canvas_multi.getActiveObject());
    canvas_multi.requestRenderAll();
    setTimeout(function () {
      //printing
      $("#c-multi")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        });
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

//utility
//keyboard delete
var canvasWrapper = document.getElementById("canvasWraper");
canvasWrapper.tabIndex = 1000;
canvasWrapper.addEventListener("keydown", deleteObjectKeyboard(), false);

function deleteObjectKeyboard() {
  document.onkeydown = function (e) {
    if ("Delete" === e.key) {
      canvas_multi.remove(canvas_multi.getActiveObject());
      canvas_multi.requestRenderAll();
    }
  };
}

//CUSTOM

//canvas_custom
var canvas_custom = (this.__canvas = new fabric.Canvas("c-custom", {
  preserveObjectStacking: true,
}));
canvas_custom.setBackgroundImage(
  "imgs/500.png",
  canvas_custom.renderAll.bind(canvas_custom),
  {
    left: 250,
    top: 250,
  }
);

if (screen.width < 576) {
  canvas_custom.setZoom(mobileZoom);
  canvas_custom.setWidth(500 * canvas.getZoom());
  canvas_custom.setHeight(500 * canvas.getZoom());
}

// foto
document
  .getElementById("pilihanGambar-custom")
  .addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        // console.log(img.width + "x" + img.height);
        // console.log(canvas_custom.width + "x" + canvas_custom.height);
        img.set({
          top: 250,
          left: 250,
        });
        img.scaleToHeight(500);
        img.scaleToWidth(500);
        var filter = new fabric.Image.filters.Brightness({
          brightness: -0.15,
        });
        img.filters.push(filter);
        img.applyFilters();
        // canvas_custom.backgroundImage = img;
        canvas_custom.add(img);
      });
    };
    reader.readAsDataURL(file);
  });

function addTextBox_custom() {
  var textLiarCustom = new fabric.Textbox("TEXTBOX TAMBAHAN", {
    width: 200,
    fontSize: 20,
    fontFamily: "Helvetica",
    fill: "white",
    left: 250,
    top: 250,
    textAlign: "center",
  });
  fabric.Image.fromURL("imgs/note.png", function (img) {
    img.scale(0.15).set({
      top: 250,
      left: 250,
    });
    canvas_custom.add(img);
  });
  canvas_custom.add(textLiarCustom);
  setTimeout(function () {
    canvas_custom.bringToFront(textLiarCustom);
  }, 1000);
  //   console.log("ada");
}

//Nama dan Filesaver
document.getElementById("nama-custom").addEventListener("change", function () {
  var nama = document.getElementById("nama-custom").value;
  nama = nama + ".png";
  $("#download-custom").click(function () {
    //bersihkan canvas sebelum print
    canvas_custom.discardActiveObject(canvas_custom.getActiveObject());
    canvas_custom.requestRenderAll();
    setTimeout(function () {
      //printing
      $("#c-custom")
        .get(0)
        .toBlob(function (blob) {
          saveAs(blob, nama);
        });
    }, 1000);
  });
});

function validasiForm_custom() {
  if (document.forms["spiritPaper-custom"]["nama-custom"].value == "") {
    document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({
      message: "Tulis Tujuan Surat Terlebih Dahulu",
    });
    return false;
  } else {
    return true;
  }
}

//utility
//keyboard delete
var canvasWrapper = document.getElementById("canvasWraper");
canvasWrapper.tabIndex = 1000;
canvasWrapper.addEventListener("keydown", deleteObjectKeyboard(), false);

function deleteObjectKeyboard() {
  document.onkeydown = function (e) {
    if ("Delete" === e.key) {
      canvas_custom.remove(canvas_custom.getActiveObject());
      canvas_custom.requestRenderAll();
    }
  };
}
