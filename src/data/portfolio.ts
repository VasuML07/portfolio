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
    headline: ["I build machine learning systems", "and interactive web experiences."],
    sub: "Undergraduate at VIT-AP University, specializing in AI/ML. I work across deep learning, NLP, and full-stack development — with a preference for understanding things from the ground up.",
    status: "Open to internships and AI engineering opportunities",
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
        "A modular neural network library built with only Python and NumPy — zero ML frameworks. Implements dense layers, activation functions, backpropagation, and optimizers from first principles.",
      repo: "https://github.com/VasuML07/NeuralNetworkfromscratch",
      live: null,
      stack: ["Python", "NumPy", "Matplotlib"],
      writeup: {
        problem:
          "ML frameworks abstract away too much of what's actually happening during training. Without understanding the underlying mechanics — gradient flow, parameter updates, numerical stability — you can't debug models effectively when things go wrong.",
        architecture:
          "Each component is a standalone class: Dense layers, activation functions (ReLU, Sigmoid, Softmax), loss functions (MSE, CrossEntropy), and optimizers (SGD, Adam). The Network class orchestrates forward pass, loss computation, and backpropagation through the computational graph.",
        challenges:
          "Getting backpropagation right for arbitrary topologies was the hardest part. Shape mismatches between layers, numerical underflow in softmax with large inputs, and getting Adam's bias correction to converge — each required careful debugging with intermediate value checks.",
        tradeoffs:
          "Pure NumPy is orders of magnitude slower than PyTorch, but every operation is visible and debuggable. For understanding the mechanics, that transparency is worth more than speed. This wasn't built for production — it was built for comprehension.",
        deployment: null,
      },
    },
    {
      id: "fake-job-prediction",
      title: "Fake Job Prediction System",
      summary:
        "NLP pipeline for classifying fraudulent job postings using TF-IDF vectorization with scikit-learn classifiers. Deployed as an interactive Streamlit application with real-time prediction.",
      repo: "https://github.com/VasuML07/fakeprediction",
      live: "https://fakeprediction-a8wpvpp3uifhwxeduehaev.streamlit.app/",
      stack: ["Python", "scikit-learn", "Streamlit", "NLTK", "Pandas"],
      writeup: {
        problem:
          "Job scams are a real problem on aggregator sites, and I wanted to see how far classical NLP methods could go on this classification task before reaching for transformer-based approaches.",
        architecture:
          "A text preprocessing pipeline (cleaning, tokenization, stopword removal) feeds into TF-IDF vectorization. The resulting sparse matrix is classified using scikit-learn — I compared multiple classifiers (Logistic Regression, SVM, Random Forest, Naive Bayes) and selected the best performer via GridSearchCV with stratified cross-validation.",
        challenges:
          "Class imbalance was the main issue. Fraudulent postings are a minority in the dataset. I experimented with SMOTE oversampling, class weights, and different classification thresholds before finding a good precision-recall balance that minimized false negatives.",
        tradeoffs:
          "TF-IDF over transformers because it runs anywhere, needs no GPU, and inference is instant. For structured text like job postings — which follow fairly predictable patterns — classical methods perform competitively with significantly simpler infrastructure.",
        deployment:
          "Deployed on Streamlit Community Cloud as an interactive web application where users can paste job descriptions and get real-time fraud predictions with confidence scores.",
      },
    },
    {
      id: "breast-cancer",
      title: "Breast Cancer Classification",
      summary:
        "Neural network classifier for tumor diagnosis using the Wisconsin Diagnostic Dataset. Explored feature importance, cross-validation strategies, and model interpretability.",
      repo: "https://github.com/VasuML07/Breast-Cancer-Classification-using-neural-network",
      live: null,
      stack: ["Python", "scikit-learn", "NumPy", "Pandas"],
      writeup: {
        problem:
          "Healthcare is where ML can have the most direct, measurable impact. I wanted to work with real clinical data and understand the additional constraints: small datasets, high stakes, and the critical need for interpretability over marginal accuracy gains.",
        architecture:
          "Feedforward network built on scikit-learn's MLPClassifier. Input is the Wisconsin dataset's 30 extracted features (radius, texture, perimeter, smoothness, etc.). I explored different architectures, learning rates, hidden layer sizes, and regularization strategies systematically.",
        challenges:
          "With only ~570 samples, overfitting is the primary concern. I used stratified k-fold cross-validation throughout, along with early stopping and L2 regularization. Data leakage during preprocessing was another concern — all scaling and feature selection was done within cross-validation folds only.",
        tradeoffs:
          "I kept the architecture deliberately simple. For tabular data with this sample size, a well-tuned shallow network consistently outperformed deeper configurations. In medical contexts, interpretability and reliability matter far more than squeezing out an extra percentage point of accuracy.",
        deployment: null,
      },
    },
  ],

  skills: [
    {
      category: "AI / Machine Learning",
      items: ["Deep Learning", "Neural Networks", "NLP", "scikit-learn", "TensorFlow / Keras", "Backpropagation"],
    },
    {
      category: "Languages",
      items: ["Python", "TypeScript", "C++", "SQL"],
    },
    {
      category: "Web Development",
      items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Streamlit", "REST APIs"],
    },
    {
      category: "Data & Tools",
      items: ["NumPy", "Pandas", "Matplotlib", "Git", "Jupyter", "Linux"],
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
      title: "Neural Networks from Scratch",
      description:
        "Wrote a neural network library in pure NumPy to understand backpropagation at the implementation level — no ML frameworks.",
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
      title: "Deeper into Systems & Competitive Programming",
      description:
        "LeetCode and Codeforces more seriously. Started exploring distributed systems and advanced ML topics.",
    },
  ],
};
