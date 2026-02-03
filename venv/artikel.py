import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_artikel_filtering_live_demo():
    print("--- DEMO MODE: TC_RS9_001 (Filtering Artikel) ---")
    
    # Setup Driver Chrome
    driver = webdriver.Chrome()
    driver.maximize_window()
    print("[INIT] Browser dibuka...")
    time.sleep(2)  # Jeda agar browser terlihat terbuka
    
    try:
        # 1. Buka Halaman Artikel
        target_url = "http://localhost:5173/Artikel"
        driver.get(target_url)
        print(f"[STEP 1] Membuka URL: {target_url}")
        
        # Jeda agar halaman terlihat termuat penuh
        time.sleep(3) 
        
        # 2. Tunggu kartu artikel pertama muncul
        wait = WebDriverWait(driver, 10)
        first_card = wait.until(
            EC.presence_of_element_located((By.ID, "artikel-card-0"))
        )
        print("[STEP 2] Kartu artikel berhasil dimuat. Memulai pengecekan...")
        time.sleep(2) # Jeda sebelum mulai loop

        # 3. Validasi Filter Kata Kunci
        judul_elements = driver.find_elements(By.CSS_SELECTOR, "[id^='artikel-card-'] .font-bold")
        
        # Daftar keyword (Sesuai Frontend Artikel.tsx)
        expected_keywords = [
            'lingkungan', 'environment', 'hijau', 'polusi', 'sampah', 
            'udara', 'air', 'tanah', 'energi', 'iklim', 'alam', 'hutan', 
            'limbah', 'plastik', 'daur ulang', 'emisi', 'ekosistem', 
            'bencana', 'konservasi', 'flora', 'fauna', 'biodiversitas'
        ]
        
        print(f"[STEP 3] Memeriksa {len(judul_elements)} artikel yang tampil satu per satu...\n")
        
        pass_count = 0
        for i, elemen in enumerate(judul_elements):
            # --- EFEK VISUAL UNTUK DEMO ---
            
            # A. Scroll otomatis ke elemen agar terlihat
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", elemen)
            time.sleep(1) # Jeda setelah scroll
            
            # B. Highlight elemen (Kotak merah & background kuning)
            driver.execute_script("arguments[0].style.border='3px solid red'; arguments[0].style.backgroundColor='yellow';", elemen)
            time.sleep(1.5) # Jeda agar judul terbaca

            # --- LOGIKA PENGECEKAN ---
            judul_text = elemen.text.lower()
            is_relevant = any(k in judul_text for k in expected_keywords)
            
            if is_relevant:
                print(f"   [OK] Artikel {i+1}: '{elemen.text}' (Relevan)")
                # Ubah border jadi hijau jika lolos
                driver.execute_script("arguments[0].style.border='3px solid green';", elemen)
                pass_count += 1
            else:
                print(f"   [WARNING] Artikel {i+1}: '{elemen.text}' (Perlu dicek manual)")
                driver.execute_script("arguments[0].style.border='3px solid orange';", elemen)
            
            # Jeda sebelum lanjut
            time.sleep(1)

        # Assertion Sederhana
        print("\n--- HASIL AKHIR ---")
        if pass_count > 0:
            print(f"[RESULT] PASS: Sistem berhasil menampilkan {pass_count} berita lingkungan.")
        else:
            print(f"[RESULT] FAIL: Tidak ada berita yang relevan.")

        print("Browser akan ditutup dalam 5 detik...")
        time.sleep(5) # Jeda terakhir

    except Exception as e:
        print(f"\n[ERROR] Terjadi kesalahan: {e}")
    
    finally:
        driver.quit()
        print("--- Demo Selesai ---")

if __name__ == "__main__":
    test_artikel_filtering_live_demo()
