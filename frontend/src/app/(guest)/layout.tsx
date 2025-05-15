import { FooterBlog } from "@/components/FooterBlog";
import { HeaderBlog } from "@/components/Header";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
            <HeaderBlog />
            <main className="flex-1 md:container min-h-[70dvh] mx-3 md:mx-auto py-10 ">
                {children}
            </main>
            <FooterBlog />
        </div>
    )
}