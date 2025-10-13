import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-16 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            صُنع بـ <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> في {new Date().getFullYear()}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            جميع الحقوق محفوظة © مدونة شخصية
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

