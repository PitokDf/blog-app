import Link from 'next/link';
import { MoveRight, BookOpen, Users, Layers, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:rotate-6 transition-transform duration-300" />
          <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 tracking-tight">
            BlogSphere
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors">
              Masuk
            </Button>
          </Link>

          <Link href="/register">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md dark:shadow-none transition-colors">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Tuangkan Ceritamu ke Dunia <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300">Digital</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              BlogSphere adalah platform modern untuk menulis, berbagi, dan terhubung dengan pembaca di seluruh dunia.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/blog" className='w-full md:w-fit'>
                <Button size="lg" className="group w-full md:w-fit">
                  Jelajahi Artikel
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/register" className='w-full md:w-fit'>
                <Button size="lg" variant="outline" className="group w-full md:w-fit">
                  Mulai Menulis
                  <FileEdit className="ml-2 h-4 w-4 transition-opacity opacity-70 group-hover:opacity-100" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <Layers className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Kategori Dinamis</h3>
                <p className="text-gray-700 dark:text-gray-300">Atur tulisanmu dalam kategori agar mudah ditemukan dan tersusun rapi.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <FileEdit className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Editor Praktis</h3>
                <p className="text-gray-700 dark:text-gray-300">Tulis, pratinjau, dan publikasikan tulisanmu dengan mudah.</p>
              </div>
            </div>
            <div className="space-y-6 mt-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <Users className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Kelola Pengguna</h3>
                <p className="text-gray-700 dark:text-gray-300">Berikan peran berbeda untuk timmu dengan akses yang bisa diatur.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <BookOpen className="h-10 w-10 text-pink-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Tampilan Elegan</h3>
                <p className="text-gray-700 dark:text-gray-300">Nikmati desain yang clean dan responsif di setiap perangkat.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-12">Cara Kerjanya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mt-4 mb-4">Buat Akun</h3>
              <p className="text-gray-700 dark:text-gray-300">Daftar sebagai penulis atau admin dan mulai eksplorasi fitur kami.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mt-4 mb-4">Tulis Kontenmu</h3>
              <p className="text-gray-700 dark:text-gray-300">Gunakan editor untuk menuangkan ide dan menambahkan media visual.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mt-4 mb-4">Publikasikan & Bagikan</h3>
              <p className="text-gray-700 dark:text-gray-300">Bagikan tulisanmu dan jangkau pembaca dari berbagai penjuru dunia.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="font-bold text-xl">BlogSphere</span>
            </div>
            <div className="flex gap-8">
              <Link href="/blog" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Tentang
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                Kontak
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
