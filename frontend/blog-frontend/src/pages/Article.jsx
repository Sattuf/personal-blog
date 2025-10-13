import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`);
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      literary: 'أدبي',
      intellectual: 'فكري',
      islamic: 'إسلامي'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      literary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      intellectual: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      islamic: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">المقال غير موجود</h2>
        <Link to="/">
          <Button>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-block mb-6">
        <Button variant="outline" size="sm">
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للرئيسية
        </Button>
      </Link>

      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
            <Tag className="w-4 h-4 inline mr-1" />
            {getCategoryLabel(article.category)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Calendar className="w-5 h-5" />
          <span>{new Date(article.date).toLocaleDateString('ar-SA', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index} className="mb-4 text-foreground leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Article;

