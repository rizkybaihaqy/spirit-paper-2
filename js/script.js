$(document).ready(function () {
  $("select").formSelect();
  $(".tabs").tabs();
});

var img = new Image();

// (function () {
fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

var canvas = (this.__canvas = new fabric.Canvas("c", {
  preserveObjectStacking: true,
}));
canvas.setBackgroundImage("imgs/500.png", canvas.renderAll.bind(canvas), {
  left: 250,
  top: 250,
});

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
    console.log("gambar");
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

function addTextBox() {
  var textLiar = new fabric.Textbox("TEXTBOX TAMBAHAN", {
    width: 200,
    fontSize: 20,
    fontFamily: "Helvetica",
    fill: "white",
    left: 250,
    top: 260,
    textAlign: "center",
  });
  canvas.add(textLiar);
  //   canvas.bringToFront(textLiar);
  //   console.log("ada");
}
// })();

document.getElementById("nama").addEventListener("change", function () {
  var nama = document.getElementById("nama").value;
  $("#download").click(function () {
    $("#c")
      .get(0)
      .toBlob(function (blob) {
        saveAs(blob, nama);
      });
  });
});

function validasiForm() {
  if (document.forms["spiritPaper"]["nama"].value == "") {
    M.toast({
      html: "Masukan tujuan surat dulu",
      classes: "red",
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
  $("#download-multi").click(function () {
    $("#c-multi")
      .get(0)
      .toBlob(function (blob) {
        saveAs(blob, nama);
      });
  });
});

function validasiForm_multi() {
  if (document.forms["spiritPaper-multi"]["nama-multi"].value == "") {
    M.toast({
      html: "Masukan tujuan surat dulu",
      classes: "red",
    });
    return false;
  } else {
    return true;
  }
}
