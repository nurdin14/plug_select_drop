(function ($) {
  $.fn.customTableSelector = function () {
    return this.each(function () {
      const $input = $(this);
      const $targetTable = $($input.data("target")).closest(".tbl-wrapper");

      // Fungsi untuk mengatur posisi tabel
      function setPosition() {
        const offset = $input.offset();
        const height = $input.outerHeight();
        const tableWidth = $input.outerWidth();

        $targetTable.css({
          display: "block",
          position: "fixed",
          top: offset.top + height - $(window).scrollTop(),
          left: offset.left - -$(window).scrollLeft(),
          width: tableWidth,
          "max-width": "100%", // Membatasi lebar maksimal
          "z-index": 9999,
        });
      }

      // Menampilkan tabel saat input diklik
      $input.on("click", function () {
        setPosition();
        $targetTable.fadeIn();
      });

      // Pilih data dari tabel
      $targetTable.on("click", "tbody tr", function () {
        const data = $(this).children("td").first().text();
        $input.val(data);
        $targetTable.fadeOut(); // Sembunyikan tabel setelah memilih
      });

      // Filter tabel saat mengetik di input
      $input.on("keyup", function () {
        const val = $(this).val().toLowerCase();
        $targetTable.find("tbody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1);
        });
      });

      // Sembunyikan tabel jika klik di luar
      $(document).on("click", function (e) {
        if (!$(e.target).closest($input).length && !$(e.target).closest($targetTable).length) {
          $targetTable.fadeOut();
        }
      });
    });
  };
})(jQuery);
