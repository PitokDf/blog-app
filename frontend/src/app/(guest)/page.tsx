import Link from 'next/link';
import { MoveRight, BookOpen, Users, Layers, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Tuangkan Ceritamu ke Dunia <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300">Digital</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            BlogSphere adalah platform modern untuk menulis, berbagi, dan terhubung dengan pembaca di seluruh dunia.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/post" className='w-full md:w-fit'>
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
    </>
  );
}
