import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArtikelGrid from '../pages/userPage/Artikel';

// Mock environment variable (sesuai dengan .env: VITE_API_BASE_URL=http://localhost:8081)
vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8081');

// Mock useLocation hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/Artikel'
    })
  };
});

/**
 * TC_RS9_001: ArtikelGrid Component Unit Tests
 * 
 * Requirement:
 * 1. Mock global.fetch menggunakan vi.fn()
 * 2. Dummy data response API berisi 2 artikel relevan + 1 tidak relevan
 * 3. Test Skenario 1: Render artikel relevan saja
 * 4. Test Skenario 2: Artikel tidak relevan tidak muncul
 * 5. Test Skenario 3: Response kosong menampilkan pesan
 */
describe('TC_RS9_001: ArtikelGrid Component Logic Tests', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  // Dummy data dengan 2 artikel relevan (sampah, hutan) dan 1 tidak relevan (saham)
  const MOCK_RESPONSE_WITH_ARTICLES = {
    articles: [
      {
        title: 'Cara Mengelola Sampah Rumah Tangga dengan Efisien',
        description: 'Tips praktis mengelola sampah organik dan anorganik untuk lingkungan lebih bersih.',
        url: 'https://example.com/artikel-sampah',
        urlToImage: 'https://example.com/img-sampah.jpg',
        source: { name: 'EcoNews Indonesia' },
      },
      {
        title: 'Pelestarian Hutan Tropis untuk Generasi Mendatang',
        description: 'Program konservasi hutan sebagai paru-paru dunia dan habitat flora fauna.',
        url: 'https://example.com/artikel-hutan',
        urlToImage: 'https://example.com/img-hutan.jpg',
        source: { name: 'Green Earth Daily' },
      },
      {
        title: 'Harga Saham Naik Drastis di Bursa Indonesia',
        description: 'Analisis pergerakan indeks saham dan proyeksi pasar modal hari ini.',
        url: 'https://example.com/artikel-saham',
        urlToImage: 'https://example.com/img-saham.jpg',
        source: { name: 'Finance Today' },
      },
    ],
  };

  // Response kosong
  const MOCK_RESPONSE_EMPTY = {
    articles: [],
  };

  beforeEach(() => {
    // Mock global.fetch menggunakan vi.fn()
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ============================================================================
  // TEST SKENARIO 1: RENDER ARTIKEL RELEVAN SAJA
  // ============================================================================
  describe('Skenario 1: Render Artikel Relevan Saja', () => {
    it('TC_RS9_001_S1_TC01 - Harus menampilkan artikel relevan yang berisi kata "sampah"', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Artikel dengan kata "sampah" harus muncul
      await waitFor(() => {
        const sampahArticle = screen.getByText('Cara Mengelola Sampah Rumah Tangga dengan Efisien');
        expect(sampahArticle).toBeInTheDocument();
      });
    });

    it('TC_RS9_001_S1_TC02 - Harus menampilkan artikel relevan yang berisi kata "hutan"', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Artikel dengan kata "hutan" harus muncul
      await waitFor(() => {
        const hutanArticle = screen.getByText('Pelestarian Hutan Tropis untuk Generasi Mendatang');
        expect(hutanArticle).toBeInTheDocument();
      });
    });

    it('TC_RS9_001_S1_TC03 - Harus memanggil fetch API dengan endpoint yang benar', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8081/api/artikel');
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });

    it('TC_RS9_001_S1_TC04 - Hanya artikel relevan yang ditampilkan di grid', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Hanya 2 artikel relevan yang ditampilkan, bukan 3
      await waitFor(() => {
        const articleLinks = screen.getAllByRole('link');
        expect(articleLinks).toHaveLength(2);
      });
    });
  });

  // ============================================================================
  // TEST SKENARIO 2: ARTIKEL TIDAK RELEVAN TIDAK MUNCUL
  // ============================================================================
  describe('Skenario 2: Artikel Tidak Relevan (Non-Lingkungan) TIDAK Muncul', () => {
    it('TC_RS9_001_S2_TC01 - Artikel "Harga Saham Naik" TIDAK boleh ditampilkan (queryByText null)', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Tunggu hingga loading selesai (artikel relevan muncul)
      await waitFor(() => {
        expect(screen.getByText('Cara Mengelola Sampah Rumah Tangga dengan Efisien')).toBeInTheDocument();
      });

      // Assert: Artikel tidak relevan harus NULL
      const nonRelevantArticle = screen.queryByText('Harga Saham Naik Drastis di Bursa Indonesia');
      expect(nonRelevantArticle).toBeNull();
    });

    it('TC_RS9_001_S2_TC02 - Deskripsi artikel saham juga tidak boleh muncul', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_WITH_ARTICLES,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Cara Mengelola Sampah Rumah Tangga dengan Efisien')).toBeInTheDocument();
      });

      // Assert: Deskripsi artikel saham tidak ada di dokumen
      const nonRelevantDesc = screen.queryByText(/Analisis pergerakan indeks saham/);
      expect(nonRelevantDesc).toBeNull();
    });

    it('TC_RS9_001_S2_TC03 - Hanya artikel dengan keyword lingkungan yang ditampilkan', async () => {
      // Arrange: Dummy data mixed content
      const mixedResponse = {
        articles: [
          {
            title: 'Kebijakan Lingkungan Baru Pemerintah Indonesia',
            description: 'Pemerintah meluncurkan kebijakan lingkungan yang progresif.',
            url: 'https://example.com/kebijakan',
            source: { name: 'News' },
          },
          {
            title: 'Resep Kue Lezat untuk Keluarga',
            description: 'Tutorial membuat kue yang mudah dan lezat di rumah.',
            url: 'https://example.com/kue',
            source: { name: 'Cooking' },
          },
          {
            title: 'Polusi Udara di Kota Besar Semakin Parah',
            description: 'Tingkat polusi udara mencapai level berbahaya bagi kesehatan.',
            url: 'https://example.com/polusi',
            source: { name: 'EcoNews' },
          },
          {
            title: 'Tips Memilih Gadget Terbaru 2025',
            description: 'Review gadget flagship terbaru dengan spesifikasi tertinggi.',
            url: 'https://example.com/gadget',
            source: { name: 'TechNews' },
          },
        ],
      };

      fetchMock.mockResolvedValueOnce({
        json: async () => mixedResponse,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Hanya artikel lingkungan yang muncul
      await waitFor(() => {
        expect(screen.getByText('Kebijakan Lingkungan Baru Pemerintah Indonesia')).toBeInTheDocument();
        expect(screen.getByText('Polusi Udara di Kota Besar Semakin Parah')).toBeInTheDocument();
      });

      // Assert: Artikel non-lingkungan tidak ada
      expect(screen.queryByText('Resep Kue Lezat untuk Keluarga')).toBeNull();
      expect(screen.queryByText('Tips Memilih Gadget Terbaru 2025')).toBeNull();
    });
  });

  // ============================================================================
  // TEST SKENARIO 3: RESPONSE KOSONG MENAMPILKAN PESAN
  // ============================================================================
  describe('Skenario 3: Response Kosong - Tampilkan Pesan "Tidak ada artikel lingkungan ditemukan"', () => {
    it('TC_RS9_001_S3_TC01 - Ketika response articles kosong, tampilkan pesan yang tepat', async () => {
      // Arrange: Empty response
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_EMPTY,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Pesan harus muncul
      await waitFor(() => {
        expect(screen.getByText('Tidak ada artikel lingkungan ditemukan.')).toBeInTheDocument();
      });
    });

    it('TC_RS9_001_S3_TC02 - Ketika semua artikel tidak relevan, tampilkan pesan', async () => {
      // Arrange: Semua artikel non-lingkungan
      const nonEnvResponse = {
        articles: [
          {
            title: 'Berita Olahraga: Tim A Menang Piala',
            description: 'Pertandingan seru berakhir dengan kemenangan Tim A.',
            url: 'https://example.com/olahraga',
            source: { name: 'Sports Daily' },
          },
          {
            title: 'Teknologi AI Mengubah Industri',
            description: 'Artificial Intelligence menjadi game changer di berbagai sektor.',
            url: 'https://example.com/ai',
            source: { name: 'Tech News' },
          },
          {
            title: 'Fashion Trend Musim Ini',
            description: 'Koleksi fashion terbaru dari designer ternama dunia.',
            url: 'https://example.com/fashion',
            source: { name: 'Fashion Weekly' },
          },
        ],
      };

      fetchMock.mockResolvedValueOnce({
        json: async () => nonEnvResponse,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Pesan harus muncul (tidak ada artikel relevan)
      await waitFor(() => {
        expect(screen.getByText('Tidak ada artikel lingkungan ditemukan.')).toBeInTheDocument();
      });

      // Assert: Artikel non-lingkungan juga tidak ada
      expect(screen.queryByText('Berita Olahraga: Tim A Menang Piala')).toBeNull();
      expect(screen.queryByText('Teknologi AI Mengubah Industri')).toBeNull();
    });

    it('TC_RS9_001_S3_TC03 - Fetch dipanggil bahkan ketika response kosong', async () => {
      // Arrange
      fetchMock.mockResolvedValueOnce({
        json: async () => MOCK_RESPONSE_EMPTY,
      });

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8081/api/artikel');
      });
    });
  });

  // ============================================================================
  // ADDITIONAL TESTS: LOADING STATE & ERROR HANDLING
  // ============================================================================
  describe('Bonus: Loading State & Error Handling', () => {
    it('TC_RS9_001_LOAD_TC01 - Harus menampilkan teks loading sebelum data dimuat', () => {
      // Arrange: Mock fetch yang hanging (tidak resolve)
      fetchMock.mockImplementation(() => new Promise(() => {}));

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert
      expect(screen.getByText('Memuat artikel...')).toBeInTheDocument();
    });

    it('TC_RS9_001_ERROR_TC01 - Harus handle error fetch dengan graceful', async () => {
      // Arrange: Mock fetch error
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      // Act
      render(
        <BrowserRouter>
          <ArtikelGrid limit={8} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Pesan "Tidak ada artikel" muncul setelah error
      await waitFor(() => {
        expect(screen.getByText('Tidak ada artikel lingkungan ditemukan.')).toBeInTheDocument();
      });
    });

    it('TC_RS9_001_PROPS_TC01 - Harus respek prop limit untuk jumlah artikel yang ditampilkan', async () => {
      // Arrange: Dummy data dengan 3+ artikel
      const manyArticlesResponse = {
        articles: [
          {
            title: 'Sampah Plastik di Laut Semakin Mengkhawatirkan',
            description: 'Plastik menjadi ancaman serius bagi ekosistem laut.',
            url: 'https://example.com/1',
            source: { name: 'News' },
          },
          {
            title: 'Hutan Hujan Amazon dalam Bahaya',
            description: 'Deforestasi mengancam paru-paru dunia.',
            url: 'https://example.com/2',
            source: { name: 'News' },
          },
          {
            title: 'Energi Terbarukan Berkembang Pesat',
            description: 'Investasi energi terbarukan meningkat signifikan.',
            url: 'https://example.com/3',
            source: { name: 'News' },
          },
        ],
      };

      fetchMock.mockResolvedValueOnce({
        json: async () => manyArticlesResponse,
      });

      // Act: Render dengan limit=2
      render(
        <BrowserRouter>
          <ArtikelGrid limit={2} isDashboard={false} />
        </BrowserRouter>
      );

      // Assert: Hanya 2 artikel yang ditampilkan (respect limit)
      await waitFor(() => {
        expect(screen.getByText('Sampah Plastik di Laut Semakin Mengkhawatirkan')).toBeInTheDocument();
        expect(screen.getByText('Hutan Hujan Amazon dalam Bahaya')).toBeInTheDocument();
        expect(screen.queryByText('Energi Terbarukan Berkembang Pesat')).toBeNull();
      });
    });
  });
});
