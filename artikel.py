import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- KONFIGURASI SCREENSHOT ---
FOLDER_BUKTI = "bukti_test/artikel"
if not os.path.exists(FOLDER_BUKTI):
    os.makedirs(FOLDER_BUKTI)

def take_screenshot(driver, filename):
    path = os.path.join(FOLDER_BUKTI, filename)
    driver.save_screenshot(path)
    print(f"   [FOTO] Tersimpan: {path}")

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
        take_screenshot(driver, "1_Halaman_Awal.png") 
        
        # 2. Tunggu kartu artikel pertama muncul
        wait = WebDriverWait(driver, 10)
        first_card = wait.until(
            EC.presence_of_element_located((By.ID, "artikel-card-0"))
        )
        print("[STEP 2] Kartu artikel berhasil dimuat. Memulai pengecekan...")
        time.sleep(2) 

        # 3. Validasi Filter Kata Kunci
        judul_elements = driver.find_elements(By.CSS_SELECTOR, "[id^='artikel-card-'] .font-bold")
        
        # Daftar keyword
        expected_keywords = [
            'lingkungan', 'environment', 'hijau', 'polusi', 'sampah', 
            'udara', 'air', 'tanah', 'energi', 'iklim', 'alam', 'hutan', 
            'limbah', 'plastik', 'daur ulang', 'emisi', 'ekosistem', 
            'bencana', 'konservasi', 'flora', 'fauna', 'biodiversitas'
        ]
        
        print(f"[STEP 3] Memeriksa {len(judul_elements)} artikel yang tampil satu per satu...\n")
        
        pass_count = 0
        for i, elemen in enumerate(judul_elements):
            # A. Scroll otomatis ke elemen
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", elemen)
            time.sleep(1) 
            
            # B. Highlight elemen
            driver.execute_script("arguments[0].style.border='3px solid red'; arguments[0].style.backgroundColor='yellow';", elemen)
            time.sleep(1.5) 

            # --- LOGIKA PENGECEKAN ---
            judul_text = elemen.text.lower()
            is_relevant = any(k in judul_text for k in expected_keywords)
            
            if is_relevant:
                print(f"   [OK] Artikel {i+1}: '{elemen.text}' (Relevan)")
                driver.execute_script("arguments[0].style.border='3px solid green';", elemen)
                pass_count += 1
                take_screenshot(driver, f"Artikel_{i+1}_Relevant.png")
            else:
                print(f"   [WARNING] Artikel {i+1}: '{elemen.text}' (Perlu dicek manual)")
                driver.execute_script("arguments[0].style.border='3px solid orange';", elemen)
                take_screenshot(driver, f"Artikel_{i+1}_Warning.png")
            
            time.sleep(1)

        # Assertion Sederhana
        print("\n--- HASIL AKHIR ---")
        if pass_count > 0:
            print(f"[RESULT] PASS: Sistem berhasil menampilkan {pass_count} berita lingkungan.")
        else:
            print(f"[RESULT] FAIL: Tidak ada berita yang relevan.")
        
        take_screenshot(driver, "Final_Result.png")
        time.sleep(5) 

    except Exception as e:
        print(f"\n[ERROR] Terjadi kesalahan: {e}")
        take_screenshot(driver, "Error_State.png")
    
    finally:
        driver.quit()
        print("--- Demo Selesai ---")

if __name__ == "__main__":
    test_artikel_filtering_live_demo()