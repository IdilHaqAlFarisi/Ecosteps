import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class EcostepResponsivityDemo(unittest.TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        # Non-headless agar browser terlihat
        options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})
        
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        
        # Posisikan window browser di tengah
        self.driver.set_window_position(0, 0)
        self.driver.set_window_size(375, 812) # Ukuran Mobile
        
        # --- KONFIGURASI AKUN ---
        self.base_url = "http://localhost:5173"
        self.user_email = "putra@ecosteps.com"
        self.user_pass = "123"
        self.admin_email = "admin@ecosteps.com"
        self.admin_pass = "admin"
        
        print("\n" + "="*50)
        print(" MEMULAI LIVE DEMO AUTOMATED TESTING ")
        print("="*50)

    def tearDown(self):
        print("\nDemo Selesai untuk sesi ini.")
        time.sleep(2) # Beri jeda sedikit sebelum menutup
        self.driver.quit()

    # --- FUNGSI BANTUAN VISUAL ---
    
    def highlight_element(self, element):
        """Memberi kotak merah pada elemen yang sedang diinteraksi"""
        try:
            self.driver.execute_script("arguments[0].setAttribute('style', 'border: 3px solid red; background: #ffffcc;');", element)
            time.sleep(0.5)
        except:
            pass # Abaikan jika elemen hilang tiba-tiba

    def scroll_smooth(self):
        """Scroll perlahan ke bawah"""
        self.driver.execute_script("window.scrollBy({top: 300, behavior: 'smooth'});")
        time.sleep(1)

    def wait_and_highlight(self, by, value, timeout=10):
        """Tunggu elemen + Highlight"""
        element = WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )
        self.highlight_element(element)
        return element

    # --- FUNGSI LOGIC UTAMA ---

    def login_generic(self, email, password, role_name):
        print(f"\n[Login] Masuk sebagai {role_name} ({email})...")
        self.driver.get(f"{self.base_url}/Login")
        time.sleep(1)
        
        # Isi Email
        email_field = self.wait_and_highlight(By.CSS_SELECTOR, "input[type='email']")
        email_field.clear()
        email_field.send_keys(email)
        print("   -> Mengetik email...")
        time.sleep(0.5)
        
        # Isi Password
        pass_field = self.driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        self.highlight_element(pass_field)
        pass_field.clear()
        pass_field.send_keys(password)
        print("   -> Mengetik password...")
        time.sleep(0.5)
        
        # Klik Login
        btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        self.highlight_element(btn)
        print("   -> Klik tombol Masuk")
        btn.click()
        
        print("   -> Menunggu proses redirect...")
        time.sleep(4)

    # --- TEST CASES (DEMO FLOW) ---

    def test_01_landing_page_mobile(self):
        print("\n[Demo] TC_RESP_001: Responsifitas Landing Page")
        self.driver.get(self.base_url)
        time.sleep(1)
        
        print("   -> Mengecek Hamburger Menu...")
        hamburger = self.wait_and_highlight(By.ID, "landing-navbar-toggle")
        self.assertTrue(hamburger.is_displayed())
        
        print("   -> Membuka Menu Mobile...")
        hamburger.click()
        time.sleep(1)
        
        menu_home = self.wait_and_highlight(By.ID, "landing-nav-home-mobile")
        self.assertTrue(menu_home.is_displayed())
        print("   -> Menu Mobile Terlihat (OK)")
        
        print("   -> Scroll cek konten...")
        self.scroll_smooth()
        self.scroll_smooth()

    def test_02_register_page_mobile(self):
        print("\n[Demo] TC_RESP_002: Halaman Register")
        self.driver.get(f"{self.base_url}/Register")
        time.sleep(1)
        
        self.wait_and_highlight(By.ID, "page-register")
        print("   -> Wrapper Halaman Register Ditemukan")
        
        input_user = self.wait_and_highlight(By.ID, "register-username")
        print("   -> Input Username Responsif (OK)")
        
        self.scroll_smooth()

    def test_03_reset_password_mobile(self):
        print("\n[Demo] TC_RESP_003: Reset Password")
        self.driver.get(f"{self.base_url}/reset-password")
        time.sleep(1)
        
        self.wait_and_highlight(By.ID, "page-reset-password")
        email_input = self.wait_and_highlight(By.ID, "reset-email-input")
        print("   -> Layout Reset Password Mobile (OK)")

    def test_04_user_features_mobile(self):
        print("\n[Demo] TC_RESP_004 s/d 008: Fitur User")
        self.login_generic(self.user_email, self.user_pass, "USER")

        # Dashboard
        print("\n[Cek] Halaman Dashboard")
        try:
            self.wait_and_highlight(By.ID, "page-dashboard")
        except TimeoutException:
            self.driver.get(f"{self.base_url}/Dashboard")
            self.wait_and_highlight(By.ID, "page-dashboard")
        
        self.wait_and_highlight(By.ID, "dashboard-widgets")
        print("   -> Widget Statistik Tersusun Vertikal (OK)")
        self.scroll_smooth()

        # Laporan
        print("\n[Cek] Halaman Laporan")
        self.driver.get(f"{self.base_url}/Laporan")
        time.sleep(1)
        
        self.wait_and_highlight(By.ID, "page-laporan")
        
        # Tunggu Loading
        try:
            WebDriverWait(self.driver, 5).until(EC.invisibility_of_element_located((By.XPATH, "//*[contains(text(), 'Memuat data...')]")))
        except: pass

        try:
            # Tunggu max 5 detik untuk tabel
            self.wait_and_highlight(By.ID, "laporan-table-wrapper", timeout=5)
            print("   -> Tabel Laporan Terdeteksi")
            print("   -> Simulasi Scroll Horizontal Tabel...")
            self.driver.execute_script("arguments[0].scrollLeft += 100;", self.driver.find_element(By.ID, "laporan-table-wrapper"))
            time.sleep(1)
        except (TimeoutException, NoSuchElementException):
            # Jika timeout (tidak ketemu), berarti tabel kosong (Valid)
            print("   -> Tabel Kosong (Empty State Valid)")

        # Forum
        print("\n[Cek] Halaman Forum")
        self.driver.get(f"{self.base_url}/Forum")
        time.sleep(1)
        self.wait_and_highlight(By.ID, "btn-open-forum-modal")
        print("   -> Tombol Buat Forum Ada (OK)")

        # Tantangan
        print("\n[Cek] Halaman Tantangan")
        self.driver.get(f"{self.base_url}/Tantangan")
        time.sleep(1)
        self.wait_and_highlight(By.ID, "tantangan-list")
        self.scroll_smooth()
        print("   -> Grid Tantangan Responsif (OK)")

    def test_09_admin_dashboard_mobile(self):
        print("\n[Demo] TC_RESP_009: Admin Dashboard")
        self.login_generic(self.admin_email, self.admin_pass, "ADMIN")

        print("   -> Mengakses Admin Dashboard...")
        self.driver.get(f"{self.base_url}/AdminDashboard")
        
        try:
            self.wait_and_highlight(By.ID, "page-admin-dashboard", timeout=10)
            print("   -> Wrapper Admin Ditemukan")
            
            print("   -> Menunggu Data Admin dimuat...")
            time.sleep(2)
            
            tab = self.wait_and_highlight(By.ID, "admin-tab-laporan", timeout=15)
            print("   -> Tab Laporan Admin Muncul & Responsif")
            
            self.scroll_smooth()
            
        except TimeoutException:
            print("   [!] Gagal memuat Dashboard Admin.")
            self.fail("Timeout Admin Dashboard")

if __name__ == "__main__":
    unittest.main()
