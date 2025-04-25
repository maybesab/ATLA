const questions = [
    {
      question: "Which environment feels most like home?",
      answers: [
        { text: "A volcano or desert landscape", element: "fire" },
        { text: "A calm beach or riverbank", element: "water" },
        { text: "A high mountaintop or floating temple", element: "air" },
        { text: "A forest or rocky canyon", element: "earth" },
        { text: "A corporate skyscraper", element: "metal" },
        { text: "A dim, locked room with silence", element: "blood" }
      ]
    },
    {
      question: "Would you exploit others to get ahead?",
      answers: [
        { text: "Yes, productivity comes first", element: "metal" },
        { text: "Only if absolutely necessary", element: "fire" },
        { text: "No, community matters more", element: "water" },
        { text: "I'd rather find a peaceful solution", element: "air" },
        { text: "I move forward alone", element: "blood" }
      ]
    },
    {
      question: "Finish the poem: 'I am the shadow that...'",
      answers: [
        { text: "burns away the dawn", element: "fire" },
        { text: "melts into the tides", element: "water" },
        { text: "floats between breaths", element: "air" },
        { text: "clings to the stone", element: "earth" },
        { text: "cuts through steel", element: "metal" },
        { text: "drips in silence", element: "blood" }
      ]
    },
    {
      question: "You see a child drowning. What do you do?",
      answers: [
        { text: "Immediately jump in to save them", element: "water" },
        { text: "Analyze risk and act efficiently", element: "metal" },
        { text: "Wait and watch their struggle", element: "blood" },
        { text: "Shout for help and seek tools", element: "earth" },
        { text: "Trust your instincts and leap", element: "fire" },
        { text: "Call for help and stay calm", element: "air" }
      ]
    },
    {
      question: "When criticized, how do you respond?",
      answers: [
        { text: "Deflect with a joke", element: "air" },
        { text: "Plan to outperform them", element: "fire" },
        { text: "Let it roll off", element: "water" },
        { text: "Internalize and improve quietly", element: "earth" },
        { text: "Use it to restructure your strategy", element: "metal" },
        { text: "Feel nothing and move on", element: "blood" }
      ]
    },
    {
      question: "What motivates your actions the most?",
      answers: [
        { text: "Power", element: "fire" },
        { text: "Compassion", element: "water" },
        { text: "Clarity", element: "air" },
        { text: "Stability", element: "earth" },
        { text: "Control", element: "metal" },
        { text: "Curiosity about the dark", element: "blood" }
      ]
    },
    {
      question: "Choose a strategy style:",
      answers: [
        { text: "Strike first, strike hard", element: "fire" },
        { text: "Adapt and respond", element: "water" },
        { text: "Avoid conflict entirely", element: "air" },
        { text: "Stand firm, never move", element: "earth" },
        { text: "Outmaneuver and dominate", element: "metal" },
        { text: "Silent psychological pressure", element: "blood" }
      ]
    },
    {
      question: "You feel most alive when:",
      answers: [
        { text: "You're winning", element: "fire" },
        { text: "You're helping others", element: "water" },
        { text: "You're lost in thought", element: "air" },
        { text: "You're working with your hands", element: "earth" },
        { text: "You're outperforming competitors", element: "metal" },
        { text: "You're in total control", element: "blood" }
      ]
    },
    {
      question: "Your ideal companion is:",
      answers: [
        { text: "A fearless warrior", element: "fire" },
        { text: "A gentle soul", element: "water" },
        { text: "An adventurer", element: "air" },
        { text: "A protector", element: "earth" },
        { text: "A strategist", element: "metal" },
        { text: "Someone unpredictable", element: "blood" }
      ]
    },
    {
      question: "What scares you the most?",
      answers: [
        { text: "Failure", element: "fire" },
        { text: "Being alone", element: "water" },
        { text: "Losing freedom", element: "air" },
        { text: "Instability", element: "earth" },
        { text: "Being seen as weak", element: "metal" },
        { text: "Feeling nothing at all", element: "blood" }
      ]
    }
  ];
  
  const elementResults = {
    fire: { name: "Fire", description: "🔥 You're a Firebender! Ambitious, bold, and passionate.", image: "assets/fire.png" },
    water: { name: "Water", description: "💧 You're a Waterbender! Empathetic and adaptive.", image: "assets/water.png" },
    air: { name: "Air", description: "🌬️ You're an Airbender! Curious and spiritually balanced.", image: "assets/air.png" },
    earth: { name: "Earth", description: "🌍 You're an Earthbender! Grounded and resilient.", image: "assets/earth.png" },
    metal: { name: "Metal", description: "🛠️ You're a Metalbender! Strategic and ambitious.", image: "assets/metal.png" },
    blood: { name: "Blood", description: "🩸 You're a Bloodbender. Cold, calm, and eerie in power.", image: "assets/blood.png" }
  };
  
  let currentQuestion = 0;
  let scores = { fire: 0, water: 0, earth: 0, air: 0, metal: 0, blood: 0 };
  let answersHistory = [];
  let selectedElement = null;
  
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const backButton = document.getElementById("back-btn");
  const resultDiv = document.getElementById("result");
  const questionCounter = document.getElementById("question-counter");
  
  function resetState() {
    answerButtons.innerHTML = "";
    selectedElement = null;
  }
  
  function showQuestion() {
    resetState();
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  
    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("answer-btn");
      btn.addEventListener("click", () => {
        selectedElement = answer.element;
        Array.from(answerButtons.children).forEach(b => b.disabled = true);
        btn.classList.add("selected");
        nextButton.disabled = false;
      });
      answerButtons.appendChild(btn);
    });
  
    nextButton.disabled = true;
    backButton.style.display = currentQuestion === 0 ? "inline-block" : "inline-block";
  }
  
  function handleNext() {
    if (selectedElement) {
      scores[selectedElement]++;
      answersHistory.push(selectedElement);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
  }
  
  function handleBack() {
    if (currentQuestion > 0) {
      const lastAnswer = answersHistory.pop();
      if (lastAnswer) scores[lastAnswer]--;
      currentQuestion--;
      showQuestion();
    }
  }
  
  function showResult() {
    questionText.classList.add("hidden");
    answerButtons.classList.add("hidden");
    nextButton.classList.add("hidden");
    backButton.classList.add("hidden");
    questionCounter.classList.add("hidden");
  
    const maxScore = Math.max(...Object.values(scores));
    const topElements = Object.keys(scores).filter(el => scores[el] === maxScore);
    const finalElement = topElements[Math.floor(Math.random() * topElements.length)];
    const result = elementResults[finalElement];
  
    let warning = "";
    if (finalElement === "blood") {
      warning = "<p style='color:red; font-weight:bold;'>⚠️ Warning: You may embody traits of detachment or psychopathy. Seek empathy. 🧠</p>";
    }
  
    resultDiv.innerHTML = `
      <h2>Your Element: ${result.name}</h2>
      <img src="${result.image}" alt="${result.name}" class="result-img">
      <p>${result.description}</p>
      ${warning}
      <a class="btn-link" href="elements.html#${finalElement}">Learn more about ${result.name} bending ➜</a>
      <br/><br/>
      <button onclick="location.reload()" class="retake-btn">Retake Quiz</button>
    `;
    resultDiv.classList.remove("hidden");
    resultDiv.scrollIntoView({ behavior: "smooth" });
    launchCelebrationEmojis(finalElement);
  }
  
  function createFloatingEmoji(emoji) {
    const el = document.createElement("div");
    el.textContent = emoji;
    el.className = "floating-emoji";
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
  
  function launchCelebrationEmojis(finalElement) {
    const emojis = {
      fire: ["🔥", "🎉"],
      water: ["💧", "🎉"],
      air: ["🌬️", "🎉"],
      earth: ["🌍", "🎉"],
      metal: ["🛠️", "🎉"],
      blood: ["🩸", "🎉"]
    };
    const floaters = emojis[finalElement] || ["🎉"];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = floaters[Math.floor(Math.random() * floaters.length)];
        createFloatingEmoji(emoji);
      }, i * 100);
    }
  }
  
  nextButton.addEventListener("click", handleNext);
  backButton.addEventListener("click", handleBack);
  showQuestion();
  