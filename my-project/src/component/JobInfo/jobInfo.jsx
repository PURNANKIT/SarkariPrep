// src/JobInfo/jobInfo.js
const jobInfo = {
  //  exact syllabus keys (with questions)

  ssc_cgl: {
    title: "SSC CGL",
    desc: "Quant, Reasoning, English, General Awareness — CGL pattern",
    short: "SSC CGL",
    practiceTopics: ["Quant", "Reasoning", "English", "GK"],
    questions: [
      {
        id: "ssc_cgl_q1",
        q_en: "If 5x + 7 = 2x + 19, what is x?",
        q_hi: "यदि 5x + 7 = 2x + 19 है, तो x कितने के बराबर है?",
        options_en: ["2", "3", "4", "5"],
        options_hi: ["2", "3", "4", "5"],
        answer: 2,
      },
      {
        id: "ssc_cgl_q2",
        q_en: "Find next number in series: 7, 14, 28, 56, ?",
        q_hi: "श्रृंखला में अगला नंबर क्या होगा: 7, 14, 28, 56, ?",
        options_en: ["70", "84", "112", "128"],
        options_hi: ["70", "84", "112", "128"],
        answer: 2,
      },
      {
        id: "ssc_cgl_q3",
        q_en: "Who is the current Chief Justice of India? (General knowledge — keep updated)",
        q_hi: "वर्तमान भारत के मुख्य न्यायाधीश कौन हैं? (सामान्य ज्ञान — अपडेट रखें)",
        options_en: ["Answer-A", "Answer-B", "Answer-C", "Answer-D"],
        options_hi: ["विकल्प-A", "विकल्प-B", "विकल्प-C", "विकल्प-D"],
        answer: 0,
      },
      {
        id: "ssc_cgl_q4",
        q_en: "Find the error: 'He don't like to play football.'",
        q_hi: "त्रुटि खोजें: 'He don't like to play football.'",
        options_en: ["He", "don't", "to play", "football"],
        options_hi: ["He", "don't", "to play", "football"],
        answer: 1,
      },
      {
        id: "ssc_cgl_q5",
        q_en: "The mean of five numbers is 20. If one number 30 is removed, new mean is 18. Find the sum of remaining numbers.",
        q_hi: "पाँच संख्याओं का माध्य 20 है। यदि एक संख्या 30 निकाल दी जाए और नया माध्य 18 हो, तो शेष संख्याओं का योग क्या है?",
        options_en: ["80", "72", "90", "100"],
        options_hi: ["80", "72", "90", "100"],
        answer: 1,
      },
    ],
  },

  ssc_chsl: {
    title: "SSC CHSL",
    desc: "Quant, Reasoning, English, General Awareness — CHSL pattern",
    short: "SSC CHSL",
    practiceTopics: ["Quant", "Reasoning", "English", "GK"],
    questions: [
      {
        id: "ssc_chsl_q1",
        q_en: "Simplify: 12 ÷ (2/3) = ?",
        q_hi: "संकलन करें: 12 ÷ (2/3) = ?",
        options_en: ["8", "18", "16", "20"],
        options_hi: ["8", "18", "16", "20"],
        answer: 1,
      },
      {
        id: "ssc_chsl_q2",
        q_en: "Choose synonym of 'benevolent'.",
        q_hi: "'benevolent' का समानार्थी शब्द चुनिए।",
        options_en: ["Kind", "Cruel", "Lazy", "Rude"],
        options_hi: ["दयालु", "क्रूर", "आलसी", "असभ्य"],
        answer: 0,
      },
      {
        id: "ssc_chsl_q3",
        q_en: "Which planet is known as the Red Planet?",
        q_hi: "किस ग्रह को लाल ग्रह कहा जाता है?",
        options_en: ["Venus", "Mars", "Jupiter", "Saturn"],
        options_hi: ["शुक्र", "मंगल", "बृहस्पति", "शनि"],
        answer: 1,
      },
      {
        id: "ssc_chsl_q4",
        q_en: "Find the odd one out: Dog, Cat, Cow, Car",
        q_hi: "असामान्य शब्द चुनें: Dog, Cat, Cow, Car",
        options_en: ["Dog", "Cat", "Cow", "Car"],
        options_hi: ["Dog", "Cat", "Cow", "Car"],
        answer: 3,
      },
      {
        id: "ssc_chsl_q5",
        q_en: "Fill in the blank: He is _____ than his brother.",
        q_hi: "रिक्त भरिए: He is _____ than his brother.",
        options_en: ["tall", "taller", "tallest", "more tall"],
        options_hi: ["लंबा", "ज़्यादा लंबा", "सबसे लंबा", "ज़्यादा लंबा"],
        answer: 1,
      },
    ],
  },

  ssc_gd: {
    title: "SSC GD",
    desc: "General Intelligence, General Knowledge, Elementary Maths, English/Hindi",
    short: "SSC GD",
    practiceTopics: ["Reasoning", "GK", "Maths", "English/Hindi"],
    questions: [
      {
        id: "ssc_gd_q1",
        q_en: "Which article of the Indian Constitution deals with fundamental duties?",
        q_hi: "भारतीय संविधान का कौन सा अनुच्छेद मौलिक कर्तव्यों से संबंधित है?",
        options_en: ["Article 32", "Article 51A", "Article 19", "Article 370"],
        options_hi: [
          "अनुच्छेद 32",
          "अनुच्छेद 51A",
          "अनुच्छेद 19",
          "अनुच्छेद 370",
        ],
        answer: 1,
      },
      {
        id: "ssc_gd_q2",
        q_en: "Solve: 25% of 240 = ?",
        q_hi: "हल करें: 25% of 240 = ?",
        options_en: ["60", "50", "70", "80"],
        options_hi: ["60", "50", "70", "80"],
        answer: 0,
      },
      {
        id: "ssc_gd_q3",
        q_en: "Which is the largest continent by area?",
        q_hi: "क्षेत्रफल के हिसाब से सबसे बड़ा महाद्वीप कौन सा है?",
        options_en: ["Africa", "Asia", "Europe", "Antarctica"],
        options_hi: ["अफ्रीका", "एशिया", "यूरोप", "अंटार्कटिका"],
        answer: 1,
      },
      {
        id: "ssc_gd_q4",
        q_en: "Find the analogy: Cup : Tea :: Bowl : ?",
        q_hi: "अनुपात खोजिए: Cup : Tea :: Bowl : ?",
        options_en: ["Rice", "Spoon", "Plate", "Water"],
        options_hi: ["चावल", "चम्मच", "प्लेट", "पानी"],
        answer: 0,
      },
      {
        id: "ssc_gd_q5",
        q_en: "Choose the correctly spelled word.",
        q_hi: "सही वर्तनी चुनें।",
        options_en: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
        options_hi: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
        answer: 2,
      },
    ],
  },

  rrb_ntpc: {
    title: "RRB NTPC",
    desc: "Mathematics, General Intelligence, General Awareness — Railway NTPC",
    short: "RRB NTPC",
    practiceTopics: ["Mathematics", "Reasoning", "GK"],
    questions: [
      {
        id: "rrb_ntpc_q1",
        q_en: "If train A covers 150 km in 2 hours, its speed is ?",
        q_hi: "यदि ट्रेन A 150 km 2 घंटे में तय करे, तो उसकी गति क्या होगी?",
        options_en: ["75 km/h", "72 km/h", "70 km/h", "80 km/h"],
        options_hi: ["75 km/h", "72 km/h", "70 km/h", "80 km/h"],
        answer: 0,
      },
      {
        id: "rrb_ntpc_q2",
        q_en: "The Indian Railways was nationalized in which year? (approx popular question)",
        q_hi: "भारतीय रेलवे किस वर्ष राष्ट्रीयकृत हुआ? (लोकप्रिय प्रश्न)",
        options_en: ["1947", "1951", "1955", "1960"],
        options_hi: ["1947", "1951", "1955", "1960"],
        answer: 1,
      },
      {
        id: "rrb_ntpc_q3",
        q_en: "Simplify: LCM of 6 and 15 = ?",
        q_hi: "सरलीकरण: 6 और 15 का LCM = ?",
        options_en: ["30", "60", "15", "90"],
        options_hi: ["30", "60", "15", "90"],
        answer: 0,
      },
      {
        id: "rrb_ntpc_q4",
        q_en: "Which instrument is used to measure atmospheric pressure?",
        q_hi: "वायुमंडलीय दबाव मापने के लिए कौन सा यंत्र प्रयोग होता है?",
        options_en: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
        options_hi: ["थर्मामीटर", "बैरामीटर", "हाइज्रोमीटर", "ऐनमोमीटर"],
        answer: 1,
      },
      {
        id: "rrb_ntpc_q5",
        q_en: "Find next number: 5, 10, 20, 40, ?",
        q_hi: "अगला नंबर क्या है: 5,10,20,40, ?",
        options_en: ["60", "80", "100", "120"],
        options_hi: ["60", "80", "100", "120"],
        answer: 1,
      },
    ],
  },

  rrb_group_d: {
    title: "RRB Group D",
    desc: "Basic Maths, General Awareness, Reasoning — Group D pattern",
    short: "RRB Group D",
    practiceTopics: ["Arithmetic", "Reasoning", "GK"],
    questions: [
      {
        id: "rrb_gd_q1",
        q_en: "What is 15% of 200?",
        q_hi: "200 का 15% क्या है?",
        options_en: ["25", "30", "35", "40"],
        options_hi: ["25", "30", "35", "40"],
        answer: 1,
      },
      {
        id: "rrb_gd_q2",
        q_en: "Which is the capital of India?",
        q_hi: "भारत की राजधानी कौन सी है?",
        options_en: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        options_hi: ["मुंबई", "नई दिल्ली", "कोलकाता", "चेन्नई"],
        answer: 1,
      },
      {
        id: "rrb_gd_q3",
        q_en: "If A is the brother of B and B is sister of C, what is relation of A to C?",
        q_hi: "यदि A, B का भाई है और B, C की बहन है, तो A का C से क्या रिश्ता है?",
        options_en: ["Brother", "Sister", "Cannot determine", "Father"],
        options_hi: ["भाई", "बहन", "निर्धारित नहीं कर सकते", "पिता"],
        answer: 0,
      },
      {
        id: "rrb_gd_q4",
        q_en: "A train travels at 60 km/h. How far will it go in 30 minutes?",
        q_hi: "एक ट्रेन 60 km/h की गति से चलती है। 30 मिनट में यह कितनी दूरी तय करेगी?",
        options_en: ["15 km", "20 km", "25 km", "30 km"],
        options_hi: ["15 km", "20 km", "25 km", "30 km"],
        answer: 0,
      },
      {
        id: "rrb_gd_q5",
        q_en: "Which of these is a non-renewable energy source?",
        q_hi: "इनमें से कौन सा एक गैर-नवीकरणीय ऊर्जा स्रोत है?",
        options_en: ["Solar", "Wind", "Coal", "Hydro"],
        options_hi: ["सोलर", "विंड", "कोयला", "हाइड्रो"],
        answer: 2,
      },
    ],
  },

  upsc_cse: {
    title: "UPSC CSE",
    desc: "History, Geography, Polity, Economy, Environment",
    short: "UPSC CSE",
    practiceTopics: [
      "History",
      "Geography",
      "Polity",
      "Economy",
      "Environment",
    ],
    questions: [
      {
        id: "upsc_q1",
        q_en: "In which year was the Constitution of India adopted?",
        q_hi: "भारतीय संविधान किस वर्ष अपनाया गया था?",
        options_en: ["1947", "1948", "1949", "1950"],
        options_hi: ["1947", "1948", "1949", "1950"],
        answer: 2,
      },
      {
        id: "upsc_q2",
        q_en: "Which part of India has the largest concentration of coral reefs?",
        q_hi: "भारत के किस हिस्से में मूंगा भित्तियों का सबसे बड़ा संघनन है?",
        options_en: [
          "Andaman & Nicobar",
          "Lakshadweep",
          "Gulf of Kutch",
          "Pondicherry",
        ],
        options_hi: [
          "अंडमान निकोबार",
          "लक्षद्वीप",
          "कच्छ की खाड़ी",
          "पुडुचेरी",
        ],
        answer: 1,
      },
      {
        id: "upsc_q3",
        q_en: "Which article guarantees equality before law in India?",
        q_hi: "कौन सा अनुच्छेद भारत में कानून के समक्ष समानता की गारंटी देता है?",
        options_en: ["Article 14", "Article 16", "Article 21", "Article 19"],
        options_hi: [
          "अनुच्छेद 14",
          "अनुच्छेद 16",
          "अनुच्छेद 21",
          "अनुच्छेद 19",
        ],
        answer: 0,
      },
      {
        id: "upsc_q4",
        q_en: "The term 'Greenhouse Effect' is related to which concept?",
        q_hi: "'ग्रीनहाउस इफेक्ट' किस अवधारणा से संबंधित है?",
        options_en: [
          "Climate Change",
          "Population Growth",
          "Industrialization",
          "Urbanization",
        ],
        options_hi: [
          "जलवायु परिवर्तन",
          "जनसंख्या वृद्धि",
          "औद्योगीकरण",
          "शहरीकरण",
        ],
        answer: 0,
      },
      {
        id: "upsc_q5",
        q_en: "Who wrote the 'Discovery of India'?",
        q_hi: "'द डिस्कवरी ऑफ़ इंडिया' किसने लिखी?",
        options_en: [
          "Jawaharlal Nehru",
          "Mahatma Gandhi",
          "B.R. Ambedkar",
          "S. Radhakrishnan",
        ],
        options_hi: [
          "जवाहरलाल नेहरू",
          "महात्मा गांधी",
          "बी.आर. अम्बेडकर",
          "एस. राधाकृष्णन",
        ],
        answer: 0,
      },
    ],
  },

  banking: {
    title: "Bank PO",
    desc: "Quant, Reasoning, English, Computer, Banking Awareness",
    short: "Bank PO",
    practiceTopics: ["Quant", "Reasoning", "English", "Banking"],
    questions: [
      {
        id: "bank_po_q1",
        q_en: "What does RBI stand for?",
        q_hi: "RBI का पूरा नाम क्या है?",
        options_en: [
          "Reserve Bank of India",
          "Regional Bank of India",
          "Rural Bank of India",
          "None",
        ],
        options_hi: [
          "रिज़र्व बैंक ऑफ़ इंडिया",
          "रीजनल बैंक ऑफ़ इंडिया",
          "रूरल बैंक ऑफ़ इंडिया",
          "कोई नहीं",
        ],
        answer: 0,
      },
      {
        id: "bank_po_q2",
        q_en: "If a sum becomes double in 10 years at simple interest, rate of interest is?",
        q_hi: "यदि कोई धनराशि साधारण ब्याज पर 10 वर्षों में दोगुनी हो जाती है, ब्याज दर क्या है?",
        options_en: ["10%", "12%", "8%", "5%"],
        options_hi: ["10%", "12%", "8%", "5%"],
        answer: 0,
      },
      {
        id: "bank_po_q3",
        q_en: "Which bank launched the UPI service in India? (origin)",
        q_hi: "भारत में UPI सेवा किस बैंक ने शुरू की थी? (मूल)",
        options_en: ["SBI", "ICICI", "NPCI", "HDFC"],
        options_hi: ["एसबीआई", "आईसीआईसीआई", "एनपीसीआई", "एचडीएफसी"],
        answer: 2,
      },
      {
        id: "bank_po_q4",
        q_en: "Find the odd one out: Debit Card, Credit Card, Check, Loan",
        q_hi: "असामान्य शब्द चुनें: Debit Card, Credit Card, Check, Loan",
        options_en: ["Debit Card", "Credit Card", "Check", "Loan"],
        options_hi: ["डेबिट कार्ड", "क्रेडिट कार्ड", "चेक", "लोन"],
        answer: 3,
      },
      {
        id: "bank_po_q5",
        q_en: "Minimum age to open a savings account independently in India is usually?",
        q_hi: "भारत में स्वतंत्र रूप से बचत खाता खोलने की न्यूनतम आयु सामान्यतः?",
        options_en: ["10 years", "15 years", "18 years", "21 years"],
        options_hi: ["10 वर्ष", "15 वर्ष", "18 वर्ष", "21 वर्ष"],
        answer: 2,
      },
        {
    id: "bank_po_q6",
    q_en: "What is the full form of RBI?",
    q_hi: "RBI का पूर्ण रूप क्या है?",
    options_en: ["Reserve Bank of India", "Royal Bank of India", "Regional Bank of India", "Reserve Board of India"],
    options_hi: ["रिज़र्व बैंक ऑफ इंडिया", "रॉयल बैंक ऑफ इंडिया", "क्षेत्रीय बैंक ऑफ इंडिया", "रिज़र्व बोर्ड ऑफ इंडिया"],
    answer: 0
  },
  {
    id: "bank_po_q7",
    q_en: "If the simple interest on ₹5000 for 2 years at 10% p.a. is?",
    q_hi: "₹5000 पर 10% वार्षिक दर से 2 वर्ष का साधारण ब्याज क्या होगा?",
    options_en: ["₹900", "₹1000", "₹1100", "₹1200"],
    options_hi: ["₹900", "₹1000", "₹1100", "₹1200"],
    answer: 1
  },
  {
    id: "bank_po_q8",
    q_en: "Which number should come next in the series: 2, 6, 12, 20, ?",
    q_hi: "श्रृंखला में अगली संख्या क्या होगी: 2, 6, 12, 20, ?",
    options_en: ["28", "30", "32", "36"],
    options_hi: ["28", "30", "32", "36"],
    answer: 0
  },
  {
    id: "bank_po_q9",
    q_en: "Synonym of 'Brief' is:",
    q_hi: "'Brief' का पर्यायवाची क्या है?",
    options_en: ["Short", "Large", "Slow", "Weak"],
    options_hi: ["छोटा", "बड़ा", "धीमा", "कमज़ोर"],
    answer: 0
  },
  {
    id: "bank_po_q10",
    q_en: "Which key is used to refresh a webpage?",
    q_hi: "वेबपेज को रिफ्रेश करने के लिए कौन-सी कुंजी प्रयोग होती है?",
    options_en: ["F2", "F5", "F7", "F10"],
    options_hi: ["F2", "F5", "F7", "F10"],
    answer: 1
  },
  {
    id: "bank_po_q11",
    q_en: "CRR is maintained by banks with?",
    q_hi: "CRR बैंकों द्वारा किसके पास रखा जाता है?",
    options_en: ["Government", "RBI", "SEBI", "NABARD"],
    options_hi: ["सरकार", "RBI", "SEBI", "NABARD"],
    answer: 1
  },
  {
    id: "bank_po_q12",
    q_en: "What percentage is 25 of 200?",
    q_hi: "200 का 25 कितने प्रतिशत है?",
    options_en: ["10%", "12.5%", "15%", "20%"],
    options_hi: ["10%", "12.5%", "15%", "20%"],
    answer: 1
  },
  {
    id: "bank_po_q13",
    q_en: "A man walks 10m north, then 10m east. How far is he from start?",
    q_hi: "एक व्यक्ति 10 मीटर उत्तर और फिर 10 मीटर पूर्व जाता है। प्रारंभ बिंदु से दूरी कितनी है?",
    options_en: ["10m", "14.14m", "15m", "20m"],
    options_hi: ["10 मी", "14.14 मी", "15 मी", "20 मी"],
    answer: 1
  },
  {
    id: "bank_po_q14",
    q_en: "Antonym of 'Increase' is:",
    q_hi: "'Increase' का विलोम क्या है?",
    options_en: ["Expand", "Grow", "Reduce", "Improve"],
    options_hi: ["विस्तार", "बढ़ाना", "घटाना", "सुधार"],
    answer: 2
  },
  {
    id: "bank_po_q15",
    q_en: "What does CPU stand for?",
    q_hi: "CPU का पूर्ण रूप क्या है?",
    options_en: ["Central Processing Unit", "Control Processing Unit", "Central Power Unit", "Computer Processing Unit"],
    options_hi: ["सेंट्रल प्रोसेसिंग यूनिट", "कंट्रोल प्रोसेसिंग यूनिट", "सेंट्रल पावर यूनिट", "कंप्यूटर प्रोसेसिंग यूनिट"],
    answer: 0
  },
  {
    id: "bank_po_q16",
    q_en: "Repo rate is related to?",
    q_hi: "रेपो दर किससे संबंधित है?",
    options_en: ["Loans by RBI", "Deposits", "Tax", "Inflation only"],
    options_hi: ["RBI द्वारा ऋण", "जमा", "कर", "केवल महंगाई"],
    answer: 0
  },
  {
    id: "bank_po_q17",
    q_en: "Find the odd one out: Dog, Cat, Cow, Car",
    q_hi: "असंगत शब्द चुनें: Dog, Cat, Cow, Car",
    options_en: ["Dog", "Cat", "Cow", "Car"],
    options_hi: ["Dog", "Cat", "Cow", "Car"],
    answer: 3
  },
  {
    id: "bank_po_q18",
    q_en: "Meaning of 'Transparent' is:",
    q_hi: "'Transparent' का अर्थ क्या है?",
    options_en: ["Clear", "Hidden", "Dark", "Heavy"],
    options_hi: ["स्पष्ट", "छिपा हुआ", "अंधेरा", "भारी"],
    answer: 0
  },
  {
    id: "bank_po_q19",
    q_en: "Shortcut key for copy is?",
    q_hi: "कॉपी करने की शॉर्टकट कुंजी क्या है?",
    options_en: ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Ctrl+Z"],
    options_hi: ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Ctrl+Z"],
    answer: 2
  },
  {
    id: "bank_po_q20",
    q_en: "Which bank is known as bankers’ bank?",
    q_hi: "कौन-सा बैंक बैंकों का बैंक कहलाता है?",
    options_en: ["SBI", "RBI", "PNB", "NABARD"],
    options_hi: ["SBI", "RBI", "PNB", "NABARD"],
    answer: 1
  },
  {
    id: "bank_po_q21",
    q_en: "What is the average of 10 and 20?",
    q_hi: "10 और 20 का औसत क्या है?",
    options_en: ["10", "15", "20", "25"],
    options_hi: ["10", "15", "20", "25"],
    answer: 1
  },
  {
    id: "bank_po_q22",
    q_en: "If A is taller than B and B taller than C, who is tallest?",
    q_hi: "यदि A, B से लंबा है और B, C से लंबा है, तो सबसे लंबा कौन है?",
    options_en: ["A", "B", "C", "Cannot say"],
    options_hi: ["A", "B", "C", "निश्चित नहीं"],
    answer: 0
  },
  {
    id: "bank_po_q23",
    q_en: "Choose correct spelling:",
    q_hi: "सही वर्तनी चुनें:",
    options_en: ["Enviroment", "Environment", "Environmant", "Enviornment"],
    options_hi: ["Enviroment", "Environment", "Environmant", "Enviornment"],
    answer: 1
  },
  {
    id: "bank_po_q24",
    q_en: "Which device is used to store data permanently?",
    q_hi: "डेटा को स्थायी रूप से संग्रहीत करने के लिए कौन-सा उपकरण उपयोग होता है?",
    options_en: ["RAM", "ROM", "Cache", "Register"],
    options_hi: ["RAM", "ROM", "Cache", "Register"],
    answer: 1
  },
  {
    id: "bank_po_q25",
    q_en: "ATM stands for?",
    q_hi: "ATM का पूर्ण रूप क्या है?",
    options_en: ["Any Time Money", "Automated Teller Machine", "Auto Transfer Money", "Advanced Teller Machine"],
    options_hi: ["Any Time Money", "ऑटोमेटेड टेलर मशीन", "ऑटो ट्रांसफर मनी", "एडवांस टेलर मशीन"],
    answer: 1
  },
    ],
  },

  railway: {
    title: "Railway",
    desc: "Quant, Reasoning, English, Computer",
    short: "Railway",
    practiceTopics: ["Quant", "Reasoning", "English", "Computer"],
    questions: [
  {
    id: "railway_q1",
    q_en: "Full form of ATM?",
    q_hi: "ATM का पूरा नाम क्या है?",
    options_en: ["Automated Teller Machine", "Automatic Teller Machine", "Automated Transfer Machine", "None"],
    options_hi: ["ऑटोमेटेड टेलर मशीन", "ऑटोमैटिक टेलर मशीन", "ऑटोमेटेड ट्रांसफर मशीन", "कोई नहीं"],
    answer: 0
  },
  {
    id: "railway_q2",
    q_en: "Who is the largest employer in India?",
    q_hi: "भारत का सबसे बड़ा नियोक्ता कौन है?",
    options_en: ["Indian Railways", "Indian Army", "Post Office", "BHEL"],
    options_hi: ["भारतीय रेलवे", "भारतीय सेना", "डाक विभाग", "BHEL"],
    answer: 0
  },
  {
    id: "railway_q3",
    q_en: "What is the capital of India?",
    q_hi: "भारत की राजधानी क्या है?",
    options_en: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    options_hi: ["मुंबई", "नई दिल्ली", "कोलकाता", "चेन्नई"],
    answer: 1
  },
  {
    id: "railway_q4",
    q_en: "Which gas is essential for respiration?",
    q_hi: "श्वसन के लिए कौन-सी गैस आवश्यक है?",
    options_en: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"],
    options_hi: ["नाइट्रोजन", "कार्बन डाइऑक्साइड", "ऑक्सीजन", "हाइड्रोजन"],
    answer: 2
  },
  {
    id: "railway_q5",
    q_en: "What is 25% of 200?",
    q_hi: "200 का 25% कितना है?",
    options_en: ["25", "40", "50", "60"],
    options_hi: ["25", "40", "50", "60"],
    answer: 2
  },
  {
    id: "railway_q6",
    q_en: "Which direction does the sun rise?",
    q_hi: "सूर्य किस दिशा से उगता है?",
    options_en: ["North", "South", "East", "West"],
    options_hi: ["उत्तर", "दक्षिण", "पूर्व", "पश्चिम"],
    answer: 2
  },
  {
    id: "railway_q7",
    q_en: "Antonym of 'Big' is?",
    q_hi: "'Big' का विलोम क्या है?",
    options_en: ["Large", "Huge", "Small", "Tall"],
    options_hi: ["बड़ा", "विशाल", "छोटा", "लंबा"],
    answer: 2
  },
  {
    id: "railway_q8",
    q_en: "Which number comes next: 2, 4, 8, 16, ?",
    q_hi: "श्रृंखला में अगली संख्या क्या है: 2, 4, 8, 16, ?",
    options_en: ["18", "24", "32", "36"],
    options_hi: ["18", "24", "32", "36"],
    answer: 2
  },
  {
    id: "railway_q9",
    q_en: "Ctrl + C is used for?",
    q_hi: "Ctrl + C का उपयोग किसके लिए किया जाता है?",
    options_en: ["Paste", "Cut", "Copy", "Save"],
    options_hi: ["पेस्ट", "कट", "कॉपी", "सेव"],
    answer: 2
  },
  {
    id: "railway_q10",
    q_en: "Who was the first President of India?",
    q_hi: "भारत के प्रथम राष्ट्रपति कौन थे?",
    options_en: ["Dr. Rajendra Prasad", "Dr. A.P.J. Abdul Kalam", "Jawaharlal Nehru", "S. Radhakrishnan"],
    options_hi: ["डॉ. राजेंद्र प्रसाद", "डॉ. ए.पी.जे. अब्दुल कलाम", "जवाहरलाल नेहरू", "एस. राधाकृष्णन"],
    answer: 0
  },
  {
    id: "railway_q11",
    q_en: "Which device is used to measure temperature?",
    q_hi: "तापमान मापने का यंत्र कौन-सा है?",
    options_en: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
    options_hi: ["बैरोमीटर", "थर्मामीटर", "हाइग्रोमीटर", "अल्टीमीटर"],
    answer: 1
  },
  {
    id: "railway_q12",
    q_en: "Which animal is known as the Ship of the Desert?",
    q_hi: "रेगिस्तान का जहाज किसे कहा जाता है?",
    options_en: ["Horse", "Camel", "Elephant", "Donkey"],
    options_hi: ["घोड़ा", "ऊँट", "हाथी", "गधा"],
    answer: 1
  },
  {
    id: "railway_q13",
    q_en: "What is the SI unit of length?",
    q_hi: "लंबाई की SI इकाई क्या है?",
    options_en: ["Centimeter", "Meter", "Kilometer", "Inch"],
    options_hi: ["सेंटीमीटर", "मीटर", "किलोमीटर", "इंच"],
    answer: 1
  },
  {
    id: "railway_q14",
    q_en: "Synonym of 'Fast' is?",
    q_hi: "'Fast' का पर्यायवाची क्या है?",
    options_en: ["Quick", "Slow", "Weak", "Late"],
    options_hi: ["तेज़", "धीमा", "कमज़ोर", "देर"],
    answer: 0
  },
  {
    id: "railway_q15",
    q_en: "Which metal is liquid at room temperature?",
    q_hi: "कौन-सा धातु कमरे के तापमान पर द्रव होता है?",
    options_en: ["Iron", "Mercury", "Copper", "Silver"],
    options_hi: ["लोहा", "पारा", "तांबा", "चांदी"],
    answer: 1
  },
  {
    id: "railway_q16",
    q_en: "How many days are there in a leap year?",
    q_hi: "लीप वर्ष में कितने दिन होते हैं?",
    options_en: ["365", "366", "364", "360"],
    options_hi: ["365", "366", "364", "360"],
    answer: 1
  },
  {
    id: "railway_q17",
    q_en: "Which part of the plant makes food?",
    q_hi: "पौधे का कौन-सा भाग भोजन बनाता है?",
    options_en: ["Root", "Stem", "Leaf", "Flower"],
    options_hi: ["जड़", "तना", "पत्ता", "फूल"],
    answer: 2
  },
  {
    id: "railway_q18",
    q_en: "What is the full form of CPU?",
    q_hi: "CPU का पूरा नाम क्या है?",
    options_en: ["Central Processing Unit", "Control Processing Unit", "Central Power Unit", "Computer Processing Unit"],
    options_hi: ["सेंट्रल प्रोसेसिंग यूनिट", "कंट्रोल प्रोसेसिंग यूनिट", "सेंट्रल पावर यूनिट", "कंप्यूटर प्रोसेसिंग यूनिट"],
    answer: 0
  },
  {
    id: "railway_q19",
    q_en: "Which river is the longest in India?",
    q_hi: "भारत की सबसे लंबी नदी कौन-सी है?",
    options_en: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
    options_hi: ["यमुना", "गोदावरी", "गंगा", "ब्रह्मपुत्र"],
    answer: 2
  },
  {
    id: "railway_q20",
    q_en: "What comes next: A, C, E, G, ?",
    q_hi: "श्रृंखला पूरी करें: A, C, E, G, ?",
    options_en: ["H", "I", "J", "K"],
    options_hi: ["H", "I", "J", "K"],
    answer: 1
  }
],

  },

  airforce_xy: {
    title: "Airforce X/Y",
    desc: "Physics, Maths, English — Airforce exam pattern",
    short: "Airforce",
    practiceTopics: ["Physics", "Maths", "English"],
    questions: [
      {
        id: "airforce_q1",
        q_en: "What is the SI unit of force?",
        q_hi: "बल की SI इकाई क्या है?",
        options_en: ["Newton", "Joule", "Watt", "Pascal"],
        options_hi: ["न्यूटन", "जूल", "वाट", "पास्कल"],
        answer: 0,
      },
      {
        id: "airforce_q2",
        q_en: "Speed of sound is highest in which medium?",
        q_hi: "ध्वनि की गति किस माध्यम में सबसे अधिक होती है?",
        options_en: ["Air", "Water", "Steel", "Vacuum"],
        options_hi: ["हवा", "पानी", "स्टील", "शून्य स्थान"],
        answer: 2,
      },
      {
        id: "airforce_q3",
        q_en: "Solve: 9 + 16 = ? (square roots based reasoning)",
        q_hi: "हल करें: 9 + 16 = ?",
        options_en: ["5", "25", "13", "15"],
        options_hi: ["5", "25", "13", "15"],
        answer: 2,
      },
      {
        id: "airforce_q4",
        q_en: "Which gas is used in aircraft tires more commonly?",
        q_hi: "विमान के टायरों में आमतौर पर किस गैस का उपयोग किया जाता है?",
        options_en: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Helium"],
        options_hi: ["नाइट्रोजन", "ऑक्सीजन", "कार्बन डाइऑक्साइड", "हीलियम"],
        answer: 0,
      },
      {
        id: "airforce_q5",
        q_en: "What is projectile motion?",
        q_hi: "प्रोजेक्टाइल मोशन क्या है?",
        options_en: [
          "Motion in a straight line",
          "Motion under gravity in two dimensions",
          "Circular motion",
          "Oscillatory motion",
        ],
        options_hi: [
          "सीधी रेखा में गति",
          "दो विमाओं में गुरुत्वाकर्षण के तहत गति",
          "वृत्तीय गति",
          "दोलनात्मक गति",
        ],
        answer: 1,
      },
    ],
  },

  navy_agniveer: {
    title: "Navy Agniveer",
    desc: "Science, Maths, English — Navy Agniveer",
    short: "Navy",
    practiceTopics: ["Science", "Maths", "English"],
    questions: [
      {
        id: "navy_q1",
        q_en: "Which instrument measures humidity?",
        q_hi: "आर्द्रता मापने का यंत्र कौन सा है?",
        options_en: ["Barometer", "Hygrometer", "Thermometer", "Anemometer"],
        options_hi: ["बैरामीटर", "हाइज्रोमीटर", "थर्मामीटर", "ऐनमोमीटर"],
        answer: 1,
      },
      {
        id: "navy_q2",
        q_en: "Water boils at 100°C at which pressure?",
        q_hi: "किस दबाव पर पानी 100°C पर उबलता है?",
        options_en: ["1 atm", "2 atm", "0.5 atm", "Depends on container"],
        options_hi: ["1 atm", "2 atm", "0.5 atm", "पात्र पर निर्भर करता है"],
        answer: 0,
      },
      {
        id: "navy_q3",
        q_en: "Find next in series: 2, 3, 5, 8, 13, ?",
        q_hi: "श्रृंखला में अगला क्या होगा: 2,3,5,8,13, ?",
        options_en: ["18", "20", "21", "22"],
        options_hi: ["18", "20", "21", "22"],
        answer: 2,
      },
      {
        id: "navy_q4",
        q_en: "Which part of the ship helps it float?",
        q_hi: "जहाज़ का कौन सा हिस्सा उसे तैरने में मदद करता है?",
        options_en: ["Hull", "Mast", "Anchor", "Rudder"],
        options_hi: ["हुल", "मास्ट", "एंकर", "रडर"],
        answer: 0,
      },
      {
        id: "navy_q5",
        q_en: "Choose the odd one: Oxygen, Nitrogen, Helium, Carbon",
        q_hi: "असामान्य चुनें: Oxygen, Nitrogen, Helium, Carbon",
        options_en: ["Oxygen", "Nitrogen", "Helium", "Carbon"],
        options_hi: ["ऑक्सीजन", "नाइट्रोजन", "हीलियम", "कार्बन"],
        answer: 3,
      },
    ],
  },

  up_police: {
    title: "UP Police",
    desc: "Reasoning, GK, Maths — Police exams",
    short: "Police",
    practiceTopics: ["Reasoning", "GK", "Maths"],
    questions: [
      {
        id: "up_police_q1",
        q_en: "Which Act deals with criminal procedure in India?",
        q_hi: "भारत में आपराधिक प्रक्रिया से संबंधित अधिनियम कौन सा है?",
        options_en: ["IPC", "CrPC", "Evidence Act", "None"],
        options_hi: ["IPC", "CrPC", "साक्ष्य अधिनियम", "कोई नहीं"],
        answer: 1,
      },
      {
        id: "up_police_q2",
        q_en: "Emergency number for police in India (commonly asked)?",
        q_hi: "भारत में पुलिस का आपातकालीन नंबर क्या है?",
        options_en: ["100", "101", "102", "112"],
        options_hi: ["100", "101", "102", "112"],
        answer: 0,
      },
      {
        id: "up_police_q3",
        q_en: "What is the full form of FIR?",
        q_hi: "FIR का पूरा नाम क्या है?",
        options_en: [
          "First Information Report",
          "Final Information Report",
          "First Immediate Report",
          "First In Report",
        ],
        options_hi: [
          "फर्स्ट इन्फॉर्मेशन रिपोर्ट",
          "फाइनल इन्फॉर्मेशन रिपोर्ट",
          "फर्स्ट इमीडिएट रिपोर्ट",
          "फर्स्ट इन रिपोर्ट",
        ],
        answer: 0,
      },
      {
        id: "up_police_q4",
        q_en: "If A is father of B and B is mother of C, A is ______ of C?",
        q_hi: "यदि A, B का पिता है और B, C की माता है, तो A, C के ____ हैं?",
        options_en: ["Grandfather", "Uncle", "Brother", "Cannot determine"],
        options_hi: ["दादा", "चाचा", "भाई", "निर्धारित नहीं"],
        answer: 0,
      },
      {
        id: "up_police_q5",
        q_en: "Which article deals with fundamental rights in India?",
        q_hi: "भारत में मौलिक अधिकार किस अनुच्छेद से संबंधित हैं?",
        options_en: [
          "Article 12-35",
          "Article 14-18",
          "Article 19 only",
          "Article 21 only",
        ],
        options_hi: [
          "अनुच्छेद 12-35",
          "अनुच्छेद 14-18",
          "अनुच्छेद 19 केवल",
          "अनुच्छेद 21 केवल",
        ],
        answer: 0,
      },
    ],
  },

  state_police: {
    title: "State Police",
    desc: "State-specific GK, Reasoning, English/Regional language",
    short: "State Police",
    practiceTopics: ["State GK", "Reasoning"],
    questions: [
      {
        id: "state_police_q1",
        q_en: "Capital of Maharashtra?",
        q_hi: "महाराष्ट्र की राजधानी क्या है?",
        options_en: ["Pune", "Mumbai", "Nagpur", "Nashik"],
        options_hi: ["पुणे", "मुंबई", "नागपुर", "नाशिक"],
        answer: 1,
      },
      {
        id: "state_police_q2",
        q_en: "Which river flows through the state? (example Q)",
        q_hi: "राज्य से कौन सी नदी बहती है? (उदाहरण प्रश्न)",
        options_en: ["River A", "River B", "River C", "River D"],
        options_hi: ["नदी A", "नदी B", "नदी C", "नदी D"],
        answer: 0,
      },
      {
        id: "state_police_q3",
        q_en: "Which festival is commonly celebrated in the state? (example)",
        q_hi: "राज्य में कौन सा त्योहार आमतौर पर मनाया जाता है? (उदाहरण)",
        options_en: ["Festival A", "Festival B", "Festival C", "Festival D"],
        options_hi: ["त्योहार A", "त्योहार B", "त्योहार C", "त्योहार D"],
        answer: 1,
      },
      {
        id: "state_police_q4",
        q_en: "Choose the odd one: Apple, Banana, Mango, Carrot",
        q_hi: "असामान्य चुनें: Apple, Banana, Mango, Carrot",
        options_en: ["Apple", "Banana", "Mango", "Carrot"],
        options_hi: ["सेब", "केला", "आम", "गाजर"],
        answer: 3,
      },
      {
        id: "state_police_q5",
        q_en: "Which is a primary occupation in many states?",
        q_hi: "कई राज्यों में प्राथमिक पेशा क्या है?",
        options_en: ["Agriculture", "IT", "Banking", "Manufacturing"],
        options_hi: ["कृषि", "आईटी", "बैंकिंग", "निर्माण"],
        answer: 0,
      },
    ],
  },

  "State Exam": {
    title: "State Exam",
    desc: "State-specific syllabus",
    short: "State Exam",
    practiceTopics: ["State GK", "History", "Polity"],
    questions: [
      {
        id: "stateexam_q1",
        q_en: "Which city is the capital of the state? (example)",
        q_hi: "कौन सा शहर राज्य की राजधानी है? (उदाहरण)",
        options_en: ["City A", "City B", "City C", "City D"],
        options_hi: ["शहर A", "शहर B", "शहर C", "शहर D"],
        answer: 0,
      },
      {
        id: "stateexam_q2",
        q_en: "Which monument is located in the state? (example)",
        q_hi: "कौन सा स्मारक राज्य में स्थित है? (उदाहरण)",
        options_en: ["Monument A", "Monument B", "Monument C", "Monument D"],
        options_hi: ["स्मारक A", "स्मारक B", "स्मारक C", "स्मारक D"],
        answer: 1,
      },
      {
        id: "stateexam_q3",
        q_en: "State language is?",
        q_hi: "राज्य की भाषा क्या है?",
        options_en: ["Language A", "Language B", "Language C", "Language D"],
        options_hi: ["भाषा A", "भाषा B", "भाषा C", "भाषा D"],
        answer: 2,
      },
      {
        id: "stateexam_q4",
        q_en: "Important rivers in the state include?",
        q_hi: "राज्य में महत्वपूर्ण नदियाँ कौन-सी हैं?",
        options_en: ["River A", "River B", "River C", "River D"],
        options_hi: ["नदी A", "नदी B", "नदी C", "नदी D"],
        answer: 0,
      },
      {
        id: "stateexam_q5",
        q_en: "Primary economic activity in the region?",
        q_hi: "क्षेत्र में प्राथमिक आर्थिक गतिविधि?",
        options_en: ["Agriculture", "Tourism", "Industry", "Services"],
        options_hi: ["कृषि", "पर्यटन", "उद्योग", "सेवाएँ"],
        answer: 0,
      },
    ],
  },

  Other: {
    title: "Other Practice",
    desc: "Miscellaneous topics",
    short: "Other",
    practiceTopics: ["General"],
    questions: [
      {
        id: "other_q1",
        q_en: "General knowledge: Which is the smallest continent?",
        q_hi: "सामान्य ज्ञान: सबसे छोटा महाद्वीप कौन सा है?",
        options_en: ["Australia", "Europe", "Antarctica", "South America"],
        options_hi: ["ऑस्ट्रेलिया", "यूरोप", "अंटार्कटिका", "दक्षिण अमेरिका"],
        answer: 0,
      },
      {
        id: "other_q2",
        q_en: "Which planet is nearest to the Sun?",
        q_hi: "सूर्य के सबसे निकट ग्रह कौन सा है?",
        options_en: ["Mercury", "Venus", "Earth", "Mars"],
        options_hi: ["बुध", "शुक्र", "पृथ्वी", "मंगल"],
        answer: 0,
      },
    ],
  },
};

export default jobInfo;
