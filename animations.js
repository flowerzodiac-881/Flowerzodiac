// Resume Website Animations
document.addEventListener('DOMContentLoaded', function() {
  // 1. Section animations on scroll
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // 2. Updating header content with class for animations
  const headerContent = document.querySelector('header .container');
  if (headerContent) {
    headerContent.classList.add('header-content');
  }
  
  // 3. Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 4. Add active class to current navigation item
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // 5. Add typing animation to profile pic (optional)
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.addEventListener('mouseenter', function() {
      this.classList.add('animated');
      setTimeout(() => {
        this.classList.remove('animated');
      }, 1000);
    });
  }

  // 6. Extract likely book titles from pasted transcript text
  const analyzeButton = document.getElementById('analyzeBooksButton');
  const transcriptInput = document.getElementById('transcriptInput');
  const summary = document.getElementById('analysisSummary');
  const results = document.getElementById('bookResults');

  if (analyzeButton && transcriptInput && summary && results) {
    const stopWords = new Set([
      'The', 'A', 'An', 'And', 'Or', 'But', 'So', 'Because', 'If', 'Then', 'That', 'This',
      'These', 'Those', 'I', 'You', 'He', 'She', 'We', 'They', 'It', 'My', 'Your', 'Our',
      'Their', 'His', 'Her', 'In', 'On', 'At', 'By', 'From', 'To', 'For', 'Of', 'With',
      'As', 'Is', 'Are', 'Was', 'Were', 'Be', 'Been', 'Being', 'Not', 'No', 'Yes', 'Video',
      'Channel', 'Candace', 'Owens'
    ]);

    function normalizeTitle(rawTitle) {
      return rawTitle.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();
    }

    function addCandidate(candidates, value) {
      const normalized = normalizeTitle(value);
      if (!normalized) {
        return;
      }

      const words = normalized.split(/\s+/);
      if (words.length === 1 && stopWords.has(words[0])) {
        return;
      }

      if (normalized.length < 2 || normalized.length > 120) {
        return;
      }

      const key = normalized.toLowerCase();
      if (!candidates.has(key)) {
        candidates.set(key, normalized);
      }
    }

    function extractBooks(text) {
      const candidates = new Map();
      const quotedMatches = text.matchAll(/["']([^"']{2,120})["']/g);
      for (const match of quotedMatches) {
        addCandidate(candidates, match[1]);
      }

      const triggerPattern = /\b(?:book|books|read|reading|author|novel|title)\b[:\s-]*([A-Z][A-Za-z0-9'’\-:&]+(?:\s+[A-Z][A-Za-z0-9'’\-:&]+){0,8})/g;
      const triggerMatches = text.matchAll(triggerPattern);
      for (const match of triggerMatches) {
        addCandidate(candidates, match[1]);
      }

      return Array.from(candidates.values()).sort((a, b) => a.localeCompare(b));
    }

    analyzeButton.addEventListener('click', function() {
      const text = transcriptInput.value.trim();
      results.innerHTML = '';

      if (!text) {
        summary.textContent = 'Paste transcript text first.';
        return;
      }

      const books = extractBooks(text);
      if (books.length === 0) {
        summary.textContent = 'No likely book titles found. Add more transcript text and try again.';
        return;
      }

      books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        results.appendChild(li);
      });

      summary.textContent = `Found ${books.length} unique likely book title${books.length > 1 ? 's' : ''}.`;
    });
  }
});
