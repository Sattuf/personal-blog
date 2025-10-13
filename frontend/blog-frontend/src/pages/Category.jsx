import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Loader2 } from 'lucide-react';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticlesByCategory();
  }, [category]);

  const fetchArticlesByCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/articles/category/${category}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (cat) => {
    const titles = {
      literary: 'المقالات الأدبية',
      intellectual: 'المقالات الفكرية',
      islamic: 'المقالات الإسلامية'
    };
    return titles[cat] || cat;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
        {getCategoryTitle(category)}
      </h1>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">لا توجد مقالات في هذا التصنيف حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;

