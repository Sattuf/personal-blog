const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Allow requests from frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Sample articles data
const articles = [
  {
    id: 1,
    title: 'رحلة في عالم الشعر العربي',
    excerpt: 'الشعر العربي هو أحد أعظم الفنون الأدبية التي عرفتها الإنسانية، فهو يجمع بين جمال اللغة وعمق المعنى...',
    content: `الشعر العربي هو أحد أعظم الفنون الأدبية التي عرفتها الإنسانية، فهو يجمع بين جمال اللغة وعمق المعنى. منذ العصر الجاهلي وحتى يومنا هذا، ظل الشعر العربي مرآة تعكس أحوال المجتمع وتطلعاته.

في هذا المقال، نستكشف جماليات الشعر العربي من خلال أبرز خصائصه: الوزن والقافية، والصور الشعرية، والمعاني العميقة التي يحملها. الشعر ليس مجرد كلمات منظومة، بل هو تجربة إنسانية شاملة تلامس الوجدان وتثير العقل.

من المعلقات السبع إلى الشعر الحديث، نجد أن الشعر العربي قد تطور في أشكاله وموضوعاته، لكنه حافظ على جوهره الأصيل. إنه فن يستحق الدراسة والتأمل، فن يربطنا بتراثنا ويفتح لنا آفاقاً جديدة للتعبير عن الذات.`,
    category: 'literary',
    date: '2025-10-10'
  },
  {
    id: 2,
    title: 'الحرية والمسؤولية: تأملات فلسفية',
    excerpt: 'العلاقة بين الحرية والمسؤولية من أعقد القضايا الفلسفية التي شغلت الفكر الإنساني عبر العصور...',
    content: `العلاقة بين الحرية والمسؤولية من أعقد القضايا الفلسفية التي شغلت الفكر الإنساني عبر العصور. فالحرية ليست مجرد القدرة على فعل ما نشاء، بل هي مسؤولية تجاه أنفسنا والآخرين.

في الفلسفة الوجودية، يرى سارتر أن الإنسان محكوم عليه بأن يكون حراً، وأن هذه الحرية تحمل معها عبء المسؤولية الكاملة عن اختياراتنا. لكن هل الحرية المطلقة ممكنة؟ وهل يمكن أن نكون أحراراً دون قيود؟

الإجابة تكمن في فهم أن الحرية الحقيقية هي تلك التي تأخذ في الاعتبار حقوق الآخرين ومصلحة المجتمع. إنها حرية مسؤولة، تدرك أن كل فعل له عواقب، وأن اختياراتنا تشكل ليس فقط حياتنا، بل حياة من حولنا أيضاً.`,
    category: 'intellectual',
    date: '2025-10-08'
  },
  {
    id: 3,
    title: 'القيم الإسلامية في بناء المجتمع',
    excerpt: 'الإسلام دين شامل يقدم منظومة قيمية متكاملة لبناء مجتمع متماسك قائم على العدل والرحمة...',
    content: `الإسلام دين شامل يقدم منظومة قيمية متكاملة لبناء مجتمع متماسك قائم على العدل والرحمة. هذه القيم ليست مجرد مثل عليا نظرية، بل هي مبادئ عملية تنظم حياة الفرد والمجتمع.

من أبرز هذه القيم: العدل، الذي يعد أساس الحكم والتعامل بين الناس. والرحمة، التي تجعل من المجتمع الإسلامي مجتمعاً متعاطفاً يرعى الضعيف ويساعد المحتاج. والتعاون، الذي يدعو إليه القرآن الكريم بقوله: "وتعاونوا على البر والتقوى".

كما يؤكد الإسلام على أهمية الأخلاق في بناء المجتمع، فالصدق والأمانة والوفاء بالعهد من القيم الأساسية التي تحفظ تماسك المجتمع وتقوي الثقة بين أفراده. إن تطبيق هذه القيم في حياتنا اليومية هو السبيل لبناء مجتمع إسلامي حقيقي يحقق العدالة والسعادة للجميع.`,
    category: 'islamic',
    date: '2025-10-05'
  },
  {
    id: 4,
    title: 'فن الرواية العربية المعاصرة',
    excerpt: 'شهدت الرواية العربية في العقود الأخيرة تطوراً ملحوظاً، حيث برز جيل جديد من الروائيين...',
    content: `شهدت الرواية العربية في العقود الأخيرة تطوراً ملحوظاً، حيث برز جيل جديد من الروائيين الذين أضافوا أبعاداً جديدة لهذا الفن الأدبي. من نجيب محفوظ إلى الطيب صالح، ومن غادة السمان إلى أحلام مستغانمي، نجد تنوعاً ثرياً في الأساليب والموضوعات.

الرواية العربية المعاصرة لم تعد تقتصر على السرد التقليدي، بل أصبحت تجرب تقنيات سردية جديدة، وتتناول قضايا معقدة تعكس واقع المجتمع العربي المعاصر. من الهوية والانتماء، إلى الحرية والديمقراطية، إلى الصراعات الاجتماعية والسياسية.

ما يميز الرواية العربية اليوم هو قدرتها على الجمع بين الأصالة والحداثة، بين التراث والمعاصرة. إنها تقدم رؤية عميقة للواقع العربي، وتفتح نافذة على عوالم إنسانية غنية ومتنوعة.`,
    category: 'literary',
    date: '2025-10-03'
  },
  {
    id: 5,
    title: 'العقل والنقل: جدلية المعرفة في الفكر الإسلامي',
    excerpt: 'العلاقة بين العقل والنقل من القضايا المحورية في الفكر الإسلامي، وقد شغلت العلماء والفلاسفة...',
    content: `العلاقة بين العقل والنقل من القضايا المحورية في الفكر الإسلامي، وقد شغلت العلماء والفلاسفة المسلمين عبر القرون. فالإسلام يدعو إلى استخدام العقل والتفكر، كما يؤكد على أهمية الوحي كمصدر للمعرفة.

يرى الإمام الغزالي أن العقل والنقل لا يتعارضان، بل يتكاملان. فالعقل يدرك الحقائق العامة، بينما النقل يوضح التفاصيل ويرشد إلى الصواب. وهذا التكامل هو ما يميز المنهج الإسلامي في المعرفة.

في عصرنا الحاضر، نحتاج إلى إحياء هذا التوازن بين العقل والنقل. فلا يمكن أن نتقدم بالعقل وحده دون هداية الوحي، ولا يمكن أن نفهم النصوص الشرعية فهماً صحيحاً دون إعمال العقل. إن الجمع بين العقل والنقل هو السبيل لتحقيق نهضة فكرية حقيقية في العالم الإسلامي.`,
    category: 'islamic',
    date: '2025-10-01'
  },
  {
    id: 6,
    title: 'ما بعد الحداثة: نقد وتأمل',
    excerpt: 'ما بعد الحداثة هي حركة فكرية وثقافية ظهرت في النصف الثاني من القرن العشرين...',
    content: `ما بعد الحداثة هي حركة فكرية وثقافية ظهرت في النصف الثاني من القرن العشرين، وتميزت برفض السرديات الكبرى والحقائق المطلقة. لكن هل هذا الرفض يقدم بديلاً حقيقياً، أم أنه يؤدي إلى نسبية مطلقة تهدد أسس المعرفة؟

من جهة، قدمت ما بعد الحداثة نقداً قيماً للحداثة وادعاءاتها بامتلاك الحقيقة المطلقة. فتحت المجال لأصوات مهمشة، وشككت في السلطة والهيمنة. لكن من جهة أخرى، أدت إلى تفكيك كل شيء دون تقديم بديل بناء.

التحدي الذي نواجهه اليوم هو كيف نستفيد من النقد ما بعد الحداثي دون الوقوع في فخ النسبية المطلقة. كيف نحافظ على قيمنا وحقائقنا الأساسية مع الانفتاح على التنوع والاختلاف؟ هذا سؤال يحتاج إلى تأمل عميق ونقاش جاد.`,
    category: 'intellectual',
    date: '2025-09-28'
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
    articlesCount: articles.length
  });
});

// Routes
app.get('/api/articles', (req, res) => {
  try {
    console.log(`Fetching all articles. Total: ${articles.length}`);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});

app.get('/api/articles/:id', (req, res) => {
  try {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (article) {
      console.log(`Article found: ${article.title}`);
      res.json(article);
    } else {
      console.log(`Article not found with id: ${req.params.id}`);
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

app.get('/api/articles/category/:category', (req, res) => {
  try {
    const categoryArticles = articles.filter(a => a.category === req.params.category);
    console.log(`Category: ${req.params.category}, Articles found: ${categoryArticles.length}`);
    res.json(categoryArticles);
  } catch (error) {
    console.error('Error fetching category articles:', error);
    res.status(500).json({ message: 'Error fetching category articles', error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║  🚀 Personal Blog Backend Server                  ║
║  📡 Server: http://localhost:${PORT}                  ║
║  ✅ Status: Running                               ║
║  📚 Articles: ${articles.length} loaded                         ║
║  🕐 Started: ${new Date().toLocaleString('ar-SA')}      ║
╚════════════════════════════════════════════════════╝
  `);
  console.log('\n📝 Available Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/articles`);
  console.log(`   GET  http://localhost:${PORT}/api/articles/:id`);
  console.log(`   GET  http://localhost:${PORT}/api/articles/category/:category`);
  console.log('\n');
});

