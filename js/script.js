var img = new Image();

(function () {
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

  var canvas = (this.__canvas = new fabric.Canvas("c", {
    preserveObjectStacking: true,
  }));
  canvas.setBackgroundImage("imgs/500.png", canvas.renderAll.bind(canvas), {
    left: 250,
    top: 250,
  });

  var supportText = new fabric.Textbox(
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
  canvas.add(supportText);

  document
    .getElementById("pilihanGambar")
    .addEventListener("change", function () {
      var gambar = document.getElementById("pilihanGambar").value;
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
        canvas.backgroundImage = img;
        // canvas.add(img);
        canvas.bringToFront(supportText);
      });
    });
})();

var nama = document.getElementById("nama").value;
document.getElementById("nama").addEventListener("change", function () {
  var nama = document.getElementById("nama").value;
  console.log(nama);
  $("#download").click(function () {
    $("#c")
      .get(0)
      .toBlob(function (blob) {
        saveAs(blob, nama);
      });
  });
});

function clear() {
  $("#nama").val("");
}
