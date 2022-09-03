/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("events").del();
  await knex("events").insert([
    {
      id: "esign_komentar",
      type: "komentar",
      text: "Telah berkomentar di dokumen",
    },
    {
      id: "esign_peserta",
      type: "peserta",
      text: "Anda telah ditambahkan sebagai di dokumen",
    },
    {
      id: "esign_setuju_review",
      type: "setuju_review",
      text: "Telah menyetujui dokumen sebagai reviewer",
    },
    {
      id: "esign_tolak_review",
      type: "tolak_review",
      text: "Telah menolak dokumen sebagai reviewer",
    },
    {
      id: "esign_setuju_ttd",
      type: "setuju_ttd",
      text: "Telah menyetujui dokumen sebagai penerima tanda tangan",
    },
    {
      id: "esign_tolak_ttd",
      type: "total_ttd",
      text: "Telah menolak dokumen sebagai penerima tanda tangan",
    },
    {
      id: "esign_hapus_dokumen",
      type: "hapus_dokumen",
      text: "Telah menghapus dokumen",
    },
  ]);
};
