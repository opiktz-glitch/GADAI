import subprocess

if __name__ == "__main__":
    print("Starting Next.js development server...")
    try:
        # Menjalankan perintah npm run dev
        subprocess.run(["npm", "run", "dev"], check=True, shell=True)
    except KeyboardInterrupt:
        print("\nServer dihentikan.")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")
