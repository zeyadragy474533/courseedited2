export const novaLogo = "/images/461092553_122113812362493821_2526291267516924762_n.jpg";

export const novaCourseGallery = [
  {
    id: "gal-1",
    url: "/images/494224138_122149925132493821_3546896229289509441_n.jpg",
    title: "معسكر C++ وتطبيقات الذاكرة الحية | Hands-on Coding",
    caption: "جلسات تدريب حية وتطبيق مباشر على لغة C++ ومؤشرات الذاكرة Pointers مع مراجعة الكود سطر بسطر مع المدربين.",
    category: "Coding",
    location: "Nova Tech Hub - المعادي",
    date: "أغسطس 2024",
    tag: "C++ Masterclass"
  },
  {
    id: "gal-2",
    url: "/images/494451460_122149925342493821_6671575989079097046_n.jpg",
    title: "العمل الجماعي وبناء منطق الألعاب | Team Logic & Games",
    caption: "تفاعل الطلاب وتطبيق التفكير الخوارزمي في بيئة عمل تشاركية ملهمة لبناء ألعاب حقيقية ونظم ذكية.",
    category: "Workshop",
    location: "Nova Innovation Lab",
    date: "يوليو 2024",
    tag: "Scratch & Logic"
  },
  {
    id: "gal-3",
    url: "/images/494524007_122149925024493821_2936548654072642787_n.jpg",
    title: "التوجيه الفردي والإرشاد التقني | 1:1 Mentorship",
    caption: "متابعة شخصية مستمرة مع كل طالب ومراجعة دقيقة للأداء لضمان الاستيعاب الكامل والاحتراف البرمجي.",
    category: "Mentorship",
    location: "Nova Cairo Campus",
    date: "يونيو 2024",
    tag: "Problem Solving"
  },
  {
    id: "gal-4",
    url: "/images/494700826_122149925294493821_360724527126655574_n.jpg",
    title: "عرض ومناقشة مشاريع التخرج | Capstone Showcase",
    caption: "الطلاب يشرحون خوارزميات مشاريعهم البرمجية وألعابهم المكتملة أمام لجنة التحكيم وزملائهم بثقة عالية.",
    category: "Projects",
    location: "Nova Demo Day",
    date: "مايو 2024",
    tag: "Graduation Projects"
  },
  {
    id: "gal-5",
    url: "/images/494730697_122149925192493821_2019700793460155445_n.jpg",
    title: "صناع المستقبل والجيل البرمجي | Future Coders",
    caption: "أجواء الحماس والشغف بين أبطال Nova Technology وبناء صداقات تقنية تدوم مدى الحياة في بيئة تعليمية مميزة.",
    category: "Community",
    location: "Nova Community Arena",
    date: "أبريل 2024",
    tag: "Youth Leaders"
  },
  {
    id: "gal-6",
    url: "/images/495024945_122149925408493821_6389513914891642268_n.jpg",
    title: "حفل التكريم والشهادات المعتمدة | Certification",
    caption: "تسليم شهادات إتمام المعسكر التدريبي وتكريم الطلاب أصحاب المشاريع الأفضل والمبتكرة في الحفل السنوي.",
    category: "Awards",
    location: "Nova Annual Gala",
    date: "مارس 2024",
    tag: "Certified Alumni"
  }
];

export interface ModuleLesson {
  id: string;
  title: string;
  titleAr: string;
  duration: string;
  type: "video" | "lab" | "project" | "quiz";
  summary: string;
  codeSnippet?: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  titleAr: string;
  duration: string;
  lessonsCount: number;
  description: string;
  lessons: ModuleLesson[];
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  brand: string;
  instructor: string;
  level: string;
  category: "C++" | "Scratch";
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  lessonsCount: number;
  coverImage: string;
  featured?: boolean;
  popular?: boolean;
  createdAt?: string;
  tags: string[];
  features: string[];
  syllabus: CourseModule[];
}

export const allCourses: Course[] = [
  {
    id: "cpp-programming-course",
    title: "C++ Programming Masterclass: From Zero to Pro",
    titleAr: "كورس لغة C++ الشامل: من الصفر إلى الاحتراف",
    brand: "Nova Technology",
    instructor: "م. حسام الدين & م. يوسف كمال",
    level: "من الصفر حتى الاحتراف",
    category: "C++",
    rating: 4.9,
    reviewsCount: 342,
    studentsCount: 1250,
    duration: "8 أسابيع (48 ساعة تدريب)",
    price: 1000,
    originalPrice: 1500,
    lessonsCount: 24,
    coverImage: "/images/494224138_122149925132493821_3546896229289509441_n.jpg",
    featured: true,
    popular: true,
    createdAt: "2024-08-10",
    tags: ["C++", "OOP", "Data Structures", "Problem Solving", "Algorithms", "Memory Management"],
    features: [
      "مشاريع حقيقية مع إدارة الذاكرة Pointers & References",
      "جلسات حل مسائل برمجية Problem Solving & Codeforces",
      "تطبيق عملي لمفاهيم البرمجة كائنية التوجه (OOP)",
      "شهادة معتمدة من Nova Technology ومراجعة كود فردية",
      "دعم مستمر وإرشاد تقني عبر مجتمع المنصة الخاص",
      "بناء مشروع تخرج متكامل وتطبيقي"
    ],
    description:
      "كورسات برمجة مش بس تعليم… دي تجربة كاملة!\n\nلقطات من أحد أقوى كورساتنا في لغة C++، واللي حولنا فيها البرمجة من حاجة معقدة لحاجة ممتعة وسهلة.\n\nطلابنا مش بس اتعلموا يكتبوا كود، دول بنوا مشاريع حقيقية، اشتغلوا في فرق، وخرجوا بفهم عملي للبرمجة المنطقية وإدارة الذاكرة، وبناء خوارزميات سريعة وفعالة.\n\nلو نفسك تتعلم برمجة بأسلوب عملي، تفاعلي، وواقعي – يبقى أنت في المكان الصح.\n\nتابعنا علشان تشوف أول بأول مواعيد الكورسات في C++ و Scratch.",
    shortDescription:
      "تعلم لغة C++ من الصفر مع مشاريع عملية وتطبيقات واقعية، تفكير منطقي، وفهم عميق للـ OOP وهياكل البيانات.",
    syllabus: [
      {
        id: "mod-1",
        moduleNumber: 1,
        title: "Introduction & Algorithmic Thinking",
        titleAr: "مقدمة البرمجة والتفكير الخوارزمي في C++",
        duration: "الأسبوع 1-2",
        lessonsCount: 6,
        description: "تثبيت بيئة التطوير، المتغيرات، الأنواع الأساسية، جمل التحكم والشرط، والحلقات التكرارية.",
        lessons: [
          {
            id: "les-1-1",
            title: "Setting up IDE (VS Code / CLion) & Hello World",
            titleAr: "تهيئة بيئة العمل وكتابة أول برنامج",
            duration: "45 دقيقة",
            type: "lab",
            summary: "شرح الـ Compilers وكيف يتحول كود C++ إلى Machine Code.",
            codeSnippet: `#include <iostream>\n\nint main() {\n    std::cout << "🚀 مرحباً بك في كورس Nova C++!" << std::endl;\n    return 0;\n}`
          },
          {
            id: "les-1-2",
            title: "Variables, Data Types & Fast I/O",
            titleAr: "المتغيرات وأنواع البيانات والإدخال السريع",
            duration: "50 دقيقة",
            type: "video",
            summary: "التعامل مع int, float, double, char, boolean والـ Type Casting."
          },
          {
            id: "les-1-3",
            title: "Conditionals, Logic Gates & Switch Cases",
            titleAr: "الجمل الشرطية والمنطق البرمجي",
            duration: "60 دقيقة",
            type: "project",
            summary: "بناء حاسبة ذكية لمعالجة الأوامر الرياضية."
          }
        ]
      },
      {
        id: "mod-2",
        moduleNumber: 2,
        title: "Functions, Memory & Pointers",
        titleAr: "الدوال، المؤشرات (Pointers) وإدارة الذاكرة",
        duration: "الأسبوع 3-4",
        lessonsCount: 6,
        description: "الفهم الحقيقي للذاكرة العشوائية RAM، التمرير بالقيمة والمرجع، والتعامل المباشر مع العناوين في الذاكرة.",
        lessons: [
          {
            id: "les-2-1",
            title: "Functions Architecture & Scope",
            titleAr: "هيكلية الدوال ونطاق المتغيرات",
            duration: "45 دقيقة",
            type: "video",
            summary: "Pass-by-value vs Pass-by-reference و Recursion."
          },
          {
            id: "les-2-2",
            title: "Deep Dive into Pointers & Dynamic Allocation",
            titleAr: "الغوص في المؤشرات وحجز الذاكرة الديناميكية (new/delete)",
            duration: "75 دقيقة",
            type: "lab",
            summary: "التحكم الكامل في الـ Stack والـ Heap وتفادي Memory Leaks.",
            codeSnippet: `int value = 42;\nint* ptr = &value;\n*ptr = 100; // عدلنا القيمة مباشرة في الذاكرة!\nstd::cout << "Value: " << value << std::endl;`
          }
        ]
      },
      {
        id: "mod-3",
        moduleNumber: 3,
        title: "Object Oriented Programming (OOP)",
        titleAr: "البرمجة كائنية التوجه (OOP)",
        duration: "الأسبوع 5-6",
        lessonsCount: 6,
        description: "الـ Classes, Encapsulation, Inheritance, Polymorphism, Virtual Functions, و Abstract Classes.",
        lessons: [
          {
            id: "les-3-1",
            title: "Encapsulation & Constructors/Destructors",
            titleAr: "التغليف والـ Constructors",
            duration: "60 دقيقة",
            type: "video",
            summary: "بناء فئات احترافية لحماية البيانات وضمان سلامتها."
          },
          {
            id: "les-3-2",
            title: "Inheritance & Polymorphism",
            titleAr: "الوراثة وتعدد الأشكال (Virtual Functions)",
            duration: "70 دقيقة",
            type: "project",
            summary: "بناء نظام كامل لمحاكاة الكائنات في المشاريع البرمجية."
          }
        ]
      },
      {
        id: "mod-4",
        moduleNumber: 4,
        title: "Data Structures & Final Capstone Project",
        titleAr: "هياكل البيانات STL ومشاريع التخرج",
        duration: "الأسبوع 7-8",
        lessonsCount: 6,
        description: "Vectors, Stacks, Queues, Maps, معالجة الملفات والـ Streams وبناء مشروع تخرج حقيقي.",
        lessons: [
          {
            id: "les-4-1",
            title: "C++ STL Library (Vector, Map, Set, Queue)",
            titleAr: "مكتبة STL القياسية والبحث والترتيب السريع",
            duration: "65 دقيقة",
            type: "lab",
            summary: "استخدام الأدوات الجاهزة عالية الأداء في حل المسابقات البرمجية."
          },
          {
            id: "les-4-2",
            title: "Capstone Project & Code Review",
            titleAr: "تسليم ومناقشة مشروع التخرج",
            duration: "120 دقيقة",
            type: "project",
            summary: "بناء نظام إدارة بيانات / تطبيق متكامل ومناقشته لايف."
          }
        ]
      }
    ]
  },
  {
    id: "scratch-kids-logic",
    title: "Scratch & Game Logic for Young Coders",
    titleAr: "كورس برمجة الألعاب والتفكير المنطقي (Scratch)",
    brand: "Nova Technology",
    instructor: "م. سلمى طارق & فريق Nova Kids",
    level: "للأطفال والناشئين",
    category: "Scratch",
    rating: 5.0,
    reviewsCount: 188,
    studentsCount: 820,
    duration: "6 أسابيع (24 ساعة تدريب)",
    price: 800,
    originalPrice: 1200,
    lessonsCount: 16,
    coverImage: "/images/494451460_122149925342493821_6671575989079097046_n.jpg",
    featured: true,
    popular: true,
    createdAt: "2024-07-01",
    tags: ["Scratch", "Game Dev", "Logic", "Animation", "Kids Coding"],
    features: [
      "تصميم ألعاب تفاعلية ورسوم متحركة شيقة",
      "تطوير التفكير التحليلي والإبداعي والمنطقي",
      "جلسات تفاعلية ومشاريع ممتعة أسبوعياً",
      "شهادة تكريم خاصة لكل طالب بعد إتمام المشروع"
    ],
    description:
      "كورس مخصص للأطفال والناشئين لتعليم أساسيات البرمجة والتفكير المنطقي من خلال بناء الألعاب والقصص التفاعلية باستخدام لغة سكراتش البصرية الممتعة.",
    shortDescription:
      "تطوير مهارات التفكير المنطقي وبناء ألعاب تفاعلية ورسوم متحركة بأسلوب ممتع وشيق.",
    syllabus: [
      {
        id: "sc-1",
        moduleNumber: 1,
        title: "Introduction to Blocks & Sprite Movement",
        titleAr: "مقدمة عن البلوكات وحركة الشخصيات",
        duration: "الأسبوع 1-2",
        lessonsCount: 4,
        description: "التعرف على بيئة Scratch وتحريك الشخصيات وتفاعل الأصوات.",
        lessons: [
          {
            id: "sc-1-1",
            title: "First Animation & Storytelling",
            titleAr: "أول قصة كرتونية متحركة",
            duration: "40 دقيقة",
            type: "project",
            summary: "تصميم شخصيات تتحدث وتتحرك بتناغم."
          }
        ]
      },
      {
        id: "sc-2",
        moduleNumber: 2,
        title: "Building Arcade & Maze Games",
        titleAr: "بناء ألعاب المتاهة وجمع النقاط",
        duration: "الأسبوع 3-4",
        lessonsCount: 6,
        description: "الشروط والعدادات والتصادم والفيزياء البسيطة.",
        lessons: [
          {
            id: "sc-2-1",
            title: "Maze Runner Game with Obstacles",
            titleAr: "لعبة المتاهة مع الوحوش والحواجز",
            duration: "50 دقيقة",
            type: "lab",
            summary: "التحكم بلوحة المفاتيح وحساب النتيجة."
          }
        ]
      },
      {
        id: "sc-3",
        moduleNumber: 3,
        title: "Variables, Scores & Final Game Project",
        titleAr: "المتغيرات والنقاط ومشروع اللعبة النهائي",
        duration: "الأسبوع 5-6",
        lessonsCount: 6,
        description: "بناء لعبة متكاملة بالمراحل وحساب النقاط ومشاركتها.",
        lessons: [
          {
            id: "sc-3-1",
            title: "Final Game Project Presentation",
            titleAr: "عرض ومناقشة اللعبة المكتملة",
            duration: "60 دقيقة",
            type: "project",
            summary: "عرض المشروع والتكريم وتوزيع الشهادات."
          }
        ]
      }
    ]
  }
];

export const novaCourse = allCourses[0];

export const studentReviews = [
  {
    id: "rev-1",
    name: "كريم عبد العزيز",
    role: "طالب هندسة حاسبات",
    course: "C++ Masterclass",
    avatar: "👨‍💻",
    rating: 5,
    date: "منذ أسبوعين",
    comment:
      "كورس C++ مع Nova نقلني نقلة نوعية في فهم المؤشرات Pointers والـ Memory Management. الشرح العملي والتطبيقات المباشرة خلتني أحل مسائل Codeforces بثقة تامة!"
  },
  {
    id: "rev-2",
    name: "سارة ممدوح",
    role: "ولية أمر ومطورة برمجيات",
    course: "Scratch & Game Logic",
    avatar: "👩‍💼",
    rating: 5,
    date: "منذ 3 أسابيع",
    comment:
      "ابني كان دايماً بيلعب ألعاب فيديو، بعد ما اشترك في كورس سكراتش في نوفا بقى هو اللي بيصنع ألعابه بنفسه ومتحمس جداً لكل حصة. أسلوب المدربين راقي ومبهر."
  },
  {
    id: "rev-3",
    name: "ياسين محمود",
    role: "بطل برمجة صغير (11 سنة)",
    course: "Scratch & Logic",
    avatar: "🚀",
    rating: 5,
    date: "منذ شهر",
    comment:
      "اتعلمت إزاي أعمل ألعاب وقصص متحركة بنفسي، والمدربين كانوا بيساعدوني خطوة بخطوة لما وقفت في كود الحركة. تجربة ممتازة!"
  },
  {
    id: "rev-4",
    name: "نور الدين سامي",
    role: "طالب جامعي",
    course: "C++ Masterclass",
    avatar: "⚡",
    rating: 5,
    date: "منذ شهرين",
    comment:
      "الفكرة مش بس كود! الفكرة إزاي تفكر كمبرمج. الأجواء في المعسكر كانت مليانة حماس ومنافسة شريفة ومشاريع حقيقية بنتعلم منها كل يوم."
  }
];

export const platformStats = [
  { number: "+1,250", label: "طالب خريج", sub: "Graduated Students", icon: "Users" },
  { number: "98%", label: "نسبة الرضا والنجاح", sub: "Satisfaction Rate", icon: "Award" },
  { number: "+85", label: "مشروع عملي تخرج", sub: "Real Capstone Projects", icon: "Code2" },
  { number: "24/7", label: "دعم فني ومجتمع نشط", sub: "Active Tech Community", icon: "Sparkles" }
];

export const faqItems = [
  {
    question: "هل أحتاج أي خبرة سابقة في البرمجة قبل الاشتراك؟",
    answer: "إطلاقاً! دوراتنا في C++ و Scratch مصممة لتبدأ معك من الصفر خطوة بخطوة مع شروحات مفصلة، أمثلة توضيحية، ومشاريع تبدأ من الأساسيات وتتدرج حتى الاحتراف."
  },
  {
    question: "هل أحصل على شهادة معتمدة بعد إنهاء الكورس؟",
    answer: "نعم، يحصل كل طالب بعد إتمام المهام العملية واجتياز مشروع التخرج ومراجعته مع المدرب على شهادة إتمام معتمدة من Nova Technology بكود تحقق رسمي."
  },
  {
    question: "كيف تتم المتابعة وحل المشاكل مع المدربين؟",
    answer: "نوفر متابعة مستمرة وجلسات أسبوعية لايف لمراجعة الكود، وحل المشكلات، والإجابة عن كل الاستفسارات."
  },
  {
    question: "هل الدروس مسجلة أم جلسات تفاعلية حية (Live)؟",
    answer: "المعسكرات تجمع بين ورش العمل التفاعلية المباشرة (Live Coding) وبين التطبيقات العملية والملفات البرمجية للرجوع إليها في أي وقت."
  }
];
