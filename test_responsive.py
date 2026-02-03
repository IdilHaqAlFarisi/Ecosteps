import time
import unittest
import os
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

        # --- SETUP FOLDER BUKTI ---
        self.folder_bukti = "bukti_test/responsive"
        if not os.path.exists(self.folder_bukti):
            os.makedirs(self.folder_bukti)
        
        print("\n" + "="*50)
        print(" MEMULAI LIVE DEMO AUTOMATED TESTING ")
        print("="*50)

    def tearDown(self):
        print("\nDemo Selesai untuk sesi ini.")
        time.sleep(2)
        self.driver.quit()

    # --- FUNGSI BANTUAN VISUAL & SCREENSHOT ---
    
    def save_evidence(self, name):
        """Simpan screenshot bukti"""
        filename = f"{name}_{int(time.time())}.png"
        path = os.path.join(self.folder_bukti, filename)
        self.driver.save_screenshot(path)
        print(f"   [FOTO] Bukti tersimpan: {path}")

    def highlight_element(self, element):
        try:
            self.driver.execute_script("arguments[0].setAttribute('style', 'border: 3px solid red; background: #ffffcc;');", element)
            time.sleep(0.5)
        except:
            pass 

    def scroll_smooth(self):
        self.driver.execute_script("window.scrollBy({top: 300, behavior: 'smooth'});")
        time.sleep(1)

    def wait_and_highlight(self, by, value, timeout=10):
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
        time.sleep(0.5)
        
        # Isi Password
        pass_field = self.driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        self.highlight_element(pass_field)
        pass_field.clear()
        pass_field.send_keys(password)
        time.sleep(0.5)
        
        # Klik Login
        btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        self.highlight_element(btn)
        print("   -> Klik tombol Masuk")
        self.save_evidence(f"Login_Form_{role_name}")
        btn.click()
        
        print("   -> Menunggu proses redirect...")
        time.sleep(4)

    # --- TEST CASES (DEMO FLOW) ---

    def test_01_landing_page_mobile(self):
        print("\n[Demo] TC_RESP_001: Responsifitas Landing Page")
        self.driver.get(self.base_url)
        # beri waktu react render & trigger ulang event resize agar hook isMobile bereaksi
        time.sleep(2)
        try:
            self.driver.execute_script("window.dispatchEvent(new Event('resize'));")
        except Exception:
            pass

        # Debug: log innerWidth untuk memastikan mode mobile
        try:
            inner_w = self.driver.execute_script("return window.innerWidth;")
            print(f"   -> window.innerWidth: {inner_w}")
        except Exception:
            pass

        print("   -> Mengecek Hamburger Menu...")
        # Pastikan nav sudah muncul terlebih dulu
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "landing-navbar"))
        )
        # Cari hamburger
        try:
            hamburger = WebDriverWait(self.driver, 15).until(
                EC.presence_of_element_located((By.ID, "landing-navbar-toggle"))
            )
        except TimeoutException:
            # Debug tambahan
            page_source = self.driver.page_source
            found_toggle = "landing-navbar-toggle" in page_source
            found_nav = "landing-navbar" in page_source
            print(f"   -> Debug: toggle in source? {found_toggle}, nav in source? {found_nav}")
            raise
        self.highlight_element(hamburger)
        self.assertTrue(hamburger.is_displayed())
        self.save_evidence("1_Landing_Navbar_Closed")

        print("   -> Membuka Menu Mobile...")
        hamburger.click()
        time.sleep(1)

        menu_home = self.wait_and_highlight(By.ID, "landing-nav-home-mobile")
        self.assertTrue(menu_home.is_displayed())
        self.save_evidence("1_Landing_Navbar_Opened")

        self.scroll_smooth()
        self.save_evidence("1_Landing_Content_Scroll")

    def test_02_register_page_mobile(self):
        print("\n[Demo] TC_RESP_002: Halaman Register")
        self.driver.get(f"{self.base_url}/Register")
        time.sleep(1)
        
        self.wait_and_highlight(By.ID, "page-register")
        input_user = self.wait_and_highlight(By.ID, "register-username")
        self.save_evidence("2_Register_Form")
        self.scroll_smooth()

    def test_03_reset_password_mobile(self):
        print("\n[Demo] TC_RESP_003: Reset Password")
        self.driver.get(f"{self.base_url}/reset-password")
        time.sleep(1)
        
        self.wait_and_highlight(By.ID, "page-reset-password")
        self.wait_and_highlight(By.ID, "reset-email-input")
        self.save_evidence("3_Reset_Password_Page")

    def test_04_user_features_mobile(self):
        print("\n[Demo] TC_RESP_004 s/d 008: Fitur User")
        self.login_generic(self.user_email, self.user_pass, "USER")

        # Dashboard
        try:
            self.wait_and_highlight(By.ID, "page-dashboard")
        except TimeoutException:
            self.driver.get(f"{self.base_url}/Dashboard")
            self.wait_and_highlight(By.ID, "page-dashboard")
        
        self.wait_and_highlight(By.ID, "dashboard-widgets")
        self.save_evidence("4_User_Dashboard")
        self.scroll_smooth()

        # Laporan
        print("\n[Cek] Halaman Laporan")
        self.driver.get(f"{self.base_url}/Laporan")
        time.sleep(1)
        self.wait_and_highlight(By.ID, "page-laporan")
        
        try:
            WebDriverWait(self.driver, 5).until(EC.invisibility_of_element_located((By.XPATH, "//*[contains(text(), 'Memuat data...')]")))
        except: pass

        try:
            self.wait_and_highlight(By.ID, "laporan-table-wrapper", timeout=5)
            self.save_evidence("5_Laporan_Table_Initial")
            self.driver.execute_script("arguments[0].scrollLeft += 100;", self.driver.find_element(By.ID, "laporan-table-wrapper"))
            time.sleep(1)
            self.save_evidence("5_Laporan_Table_Scrolled")
        except:
            print("   -> Tabel Kosong (Empty State Valid)")
            self.save_evidence("5_Laporan_Table_Empty")

        # Forum
        print("\n[Cek] Halaman Forum")
        self.driver.get(f"{self.base_url}/Forum")
        time.sleep(1)
        self.wait_and_highlight(By.ID, "btn-open-forum-modal")
        self.save_evidence("6_Forum_Page")

        # Tantangan
        print("\n[Cek] Halaman Tantangan")
        self.driver.get(f"{self.base_url}/Tantangan")
        time.sleep(1)
        self.wait_and_highlight(By.ID, "tantangan-list")
        self.scroll_smooth()
        self.save_evidence("7_Tantangan_Grid")

    def test_09_admin_dashboard_mobile(self):
        print("\n[Demo] TC_RESP_009: Admin Dashboard")
        self.login_generic(self.admin_email, self.admin_pass, "ADMIN")

        self.driver.get(f"{self.base_url}/AdminDashboard")
        
        try:
            self.wait_and_highlight(By.ID, "page-admin-dashboard", timeout=10)
            print("   -> Wrapper Admin Ditemukan")
            time.sleep(2)
            
            self.wait_and_highlight(By.ID, "admin-tab-laporan", timeout=15)
            self.save_evidence("9_Admin_Dashboard")
            self.scroll_smooth()
            
        except TimeoutException:
            print("   [!] Gagal memuat Dashboard Admin.")
            self.save_evidence("9_Admin_Dashboard_Error")
            self.fail("Timeout Admin Dashboard")

if __name__ == "__main__":
    unittest.main()