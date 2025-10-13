import { BookOpen, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
          من أنا
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            مرحباً بك في مدونتي الشخصية. هذه المساحة مخصصة للكتابة والتأمل في مختلف جوانب الحياة، من خلال ثلاثة محاور رئيسية: الأدب، الفكر، والإسلام.
          </p>

          <p className="text-lg text-foreground leading-relaxed mb-6">
            أؤمن بأن الكتابة هي وسيلة للتعبير عن الذات، وللتواصل مع الآخرين، ولمشاركة الأفكار والتجارب التي قد تكون مفيدة أو ملهمة للقراء.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 text-center">
            <BookOpen className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">الأدب</h3>
            <p className="text-muted-foreground">
              استكشاف عالم الكلمات والجمال اللغوي
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
            <Lightbulb className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">الفكر</h3>
            <p className="text-muted-foreground">
              تأملات في القضايا الفلسفية والثقافية
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
            <Heart className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">الإسلام</h3>
            <p className="text-muted-foreground">
              مقالات في الدين والروحانية والقيم
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">رسالة المدونة</h2>
          <p className="text-lg text-foreground leading-relaxed">
            هدفي من هذه المدونة هو إنشاء مساحة للحوار والتفكير، حيث يمكن للقراء أن يجدوا محتوى يثري عقولهم ويلامس قلوبهم. أسعى لتقديم مقالات تجمع بين العمق الفكري والأسلوب الأدبي الجميل، مع الحفاظ على القيم الإسلامية الأصيلة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

