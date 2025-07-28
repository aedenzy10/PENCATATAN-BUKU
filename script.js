// Array untuk menyimpan data buku
let books = [];

// DOM Elements
const bookForm = document.getElementById('bookForm');
const bookTableBody = document.getElementById('bookTableBody');
const searchInput = document.getElementById('searchInput');

// Fungsi untuk menampilkan buku ke dalam tabel
function displayBooks(booksToDisplay = books) {
    bookTableBody.innerHTML = '';
    
    booksToDisplay.forEach((book, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${book.judul}</td>
            <td>${book.pengarang}</td>
            <td>${book.tahun}</td>
            <td>${book.kategori}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editBook(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteBook(${index})">Hapus</button>
            </td>
        `;
        
        bookTableBody.appendChild(row);
    });
}

// Fungsi untuk menambahkan buku baru
function addBook(event) {
    event.preventDefault();
    
    const judul = document.getElementById('judul').value;
    const pengarang = document.getElementById('pengarang').value;
    const tahun = document.getElementById('tahun').value;
    const kategori = document.getElementById('kategori').value;
    
    const newBook = {
        judul,
        pengarang,
        tahun,
        kategori
    };
    
    books.push(newBook);
    displayBooks();
    bookForm.reset();
    
    // Simpan ke localStorage
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

// Fungsi untuk menghapus buku
function deleteBook(index) {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
        books.splice(index, 1);
        displayBooks();
        
        // Update localStorage
        localStorage.setItem('libraryBooks', JSON.stringify(books));
    }
}

// Fungsi untuk mengedit buku
function editBook(index) {
    const book = books[index];
    
    document.getElementById('judul').value = book.judul;
    document.getElementById('pengarang').value = book.pengarang;
    document.getElementById('tahun').value = book.tahun;
    document.getElementById('kategori').value = book.kategori;
    
    // Hapus buku yang akan diedit
    books.splice(index, 1);
    displayBooks();
    
    // Update localStorage
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

// Fungsi untuk mencari buku
function searchBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        displayBooks();
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.judul.toLowerCase().includes(searchTerm) || 
        book.pengarang.toLowerCase().includes(searchTerm) ||
        book.kategori.toLowerCase().includes(searchTerm)
    );
    
    displayBooks(filteredBooks);
}

// Event Listeners
bookForm.addEventListener('submit', addBook);
searchInput.addEventListener('keyup', searchBooks);

// Load data dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const savedBooks = localStorage.getItem('libraryBooks');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
        displayBooks();
    }
});