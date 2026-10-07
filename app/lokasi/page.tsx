import { redirect } from "next/navigation";

export default function LokasiPage() {
  // Redirect ke halaman Hub Provinsi yang baru kita buat untuk menghindari duplicate content
  redirect("/simulasi-gadai-bpkb");
}
