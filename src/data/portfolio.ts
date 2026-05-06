export const portfolioData = {
  name: "Vasu Margana",
  email: "marganaavinash@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/146NHCZpQH1My53cRdLK-vGmHOPgu1SyS/view?usp=sharing",
  github: "https://github.com/VasuML07",
  linkedin: "https://www.linkedin.com/in/vasu-margana-49265031b/",
  location: "VIT-AP University, Amaravati",
  githubUsername: "VasuML07",
  leetcodeUsername: "coder_2028",

  hero: {
    headline: "I build machine learning systems\nand interactive web experiences.",
    sub: "Undergraduate at VIT-AP University, specializing in AI/ML. I work across deep learning, NLP, and full-stack development — with a preference for understanding things from the ground up.",
    status: "Open to internships",
  },

  about: [
    "I started building neural networks from scratch with just NumPy because I wanted to understand what PyTorch was actually doing under the hood. That approach — preferring first-principles understanding over convenience — has shaped how I work on everything since.",
    "Most of my projects live at the intersection of ML and software engineering. I find the engineering side of ML equally interesting: deployment, optimization, making models work in production rather than just in notebooks.",
    "Right now I'm focused on getting deeper into distributed systems, reinforcement learning, and building more interactive tools for understanding ML concepts. I also spend time on competitive programming — it keeps the fundamentals sharp.",
  ],

  education: {
    degree: "B.Tech in Computer Science",
    field: "Specialization in AI/ML",
    institution: "VIT-AP University, Amaravati",
    year: "2024 – 2028",
  },

  projects: [
    {
      id: "neural-networks",
      title: "Neural Networks from Scratch",
      summary:
        "Built a modular neural network library using only Python and NumPy — no ML frameworks. Implements dense layers, activation functions, backpropagation, and optimizers from first principles.",
      repo: "https://github.com/VasuML07/NeuralNetworkfromscratch",
      live: null,
      stack: ["Python", "NumPy", "Matplotlib"],
      writeup: {
        why:
          "ML frameworks hide too much. I wanted to see the actual matrix math — how gradients flow, how parameters update, where numerical instability creeps in. The only way to truly get that is to write it yourself.",
        architecture:
          "Each component is a standalone class: Dense layer, activation functions (ReLU, Sigmoid, Softmax), loss functions (MSE, CrossEntropy), and optimizers (SGD, Adam). The Network class orchestrates forward pass, loss computation, and backpropagation through the computational graph.",
        challenges:
          "The hardest part was getting backpropagation right for arbitrary network topologies. Shape mismatches between layers, numerical underflow in softmax, and getting Adam's bias correction to actually converge — each required careful debugging.",
        tradeoffs:
          "Pure NumPy is orders of magnitude slower than PyTorch, but every operation is visible and debuggable. For learning purposes, that transparency is worth more than speed.",
      },
    },
    {
      id: "fake-job-prediction",
      title: "Fake Job Prediction System",
      summary:
        "NLP pipeline for classifying fraudulent job postings. Uses TF-IDF vectorization with scikit-learn classifiers, deployed as an interactive Streamlit application.",
      repo: "https://github.com/VasuML07/fakeprediction",
      live: "https://fakeprediction-a8wpvpp3uifhwxeduehaev.streamlit.app/",
      stack: ["Python", "scikit-learn", "Streamlit", "NLTK", "Pandas"],
      writeup: {
        why:
          "Job scams are a real problem, especially on aggregator sites. I wanted to see how far classical NLP methods could go on this task before reaching for transformers.",
        architecture:
          "Text preprocessing pipeline (cleaning, tokenization, stopword removal) feeds into TF-IDF vectorization. The resulting sparse matrix is classified using scikit-learn — compared multiple classifiers and settled on the best performing one via GridSearchCV.",
        challenges:
          "Class imbalance in the training data was the main issue. Fraudulent postings are a minority. I tried SMOTE, class weights, and different threshold strategies before finding a good precision-recall balance.",
        tradeoffs:
          "TF-IDF over transformers because it runs anywhere, needs no GPU, and inference is instant. For structured text like job postings, it performs competitively with much simpler infrastructure.",
      },
    },
    {
      id: "breast-cancer",
      title: "Breast Cancer Classification",
      summary:
        "Neural network classifier for tumor diagnosis using the Wisconsin dataset. Explored feature importance, cross-validation strategies, and model interpretability in a healthcare context.",
      repo: "https://github.com/VasuML07/Breast-Cancer-Classification-using-neural-network",
      live: null,
      stack: ["Python", "scikit-learn", "NumPy", "Pandas"],
      writeup: {
        why:
          "Healthcare applications are where ML can have the most direct impact. I wanted to work with real medical data and understand the additional constraints that come with it — small datasets, high stakes, need for interpretability.",
        architecture:
          "Feedforward network built on scikit-learn's MLPClassifier. Input is the Wisconsin dataset's 30 extracted features (radius, texture, perimeter, etc.). Explored different architectures, learning rates, and regularization strategies.",
        challenges:
          "With only ~570 samples, overfitting is the primary concern. Extensive use of stratified k-fold cross-validation, early stopping, and L2 regularization. Also had to be careful about data leakage during preprocessing.",
        tradeoffs:
          "Kept the architecture simple deliberately. For tabular data with this sample size, a well-tuned shallow network outperforms deeper ones. Interpretability matters more than marginal accuracy gains in medical contexts.",
      },
    },
  ],

  skills: [
    {
      category: "ML / AI",
      items: [
        "Deep Learning",
        "Neural Networks",
        "NLP",
        "scikit-learn",
        "TensorFlow / Keras",
        "Backpropagation",
      ],
    },
    {
      category: "Languages",
      items: ["Python", "C++", "SQL", "TypeScript", "NumPy"],
    },
    {
      category: "Web & Tools",
      items: ["Next.js", "React", "Streamlit", "Git", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Foundations",
      items: [
        "Data Structures",
        "Algorithms",
        "Linear Algebra",
        "Probability & Statistics",
        "System Design",
      ],
    },
  ],

  timeline: [
    {
      year: "2024",
      title: "Started at VIT-AP University",
      description:
        "Began B.Tech in CSE with AI/ML specialization. Focused on building a strong foundation in programming, mathematics, and core CS.",
    },
    {
      year: "2024",
      title: "Built Neural Networks from Scratch",
      description:
        "Wrote a neural network library in pure NumPy to understand backpropagation at the implementation level.",
    },
    {
      year: "2024",
      title: "NLP Fraud Detection System",
      description:
        "Built and deployed a text classification pipeline for detecting fraudulent job postings using scikit-learn and Streamlit.",
    },
    {
      year: "2025",
      title: "Healthcare AI Classification",
      description:
        "Developed a neural network classifier for tumor diagnosis, working with real clinical data and cross-validation strategies.",
    },
    {
      year: "2025",
      title: "Deepened Focus on Systems & CP",
      description:
        "Started solving problems more seriously on LeetCode and Codeforces. Began exploring distributed systems and more advanced ML topics.",
    },
  ],
};
