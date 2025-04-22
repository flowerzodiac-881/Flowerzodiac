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
});