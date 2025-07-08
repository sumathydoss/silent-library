// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Carousel Functionality
  // =========================
  const slides = document.querySelectorAll('.carousel-inner');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  // Show the slide at the given index and hide others
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    // Show previous slide on prev button click
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    // Show next slide on next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);

    // Show the first slide initially
    showSlide(currentIndex);
  }

  // =========================
  // Search Bar Functionality
  // =========================
  const searchIcon = document.getElementById('searchIcon');
  const searchBar = document.getElementById('searchBar');
  const closeSearch = document.getElementById('closeSearch');
  const searchBtn = document.getElementById('searchBtn');
  const advancedSearchLink = document.querySelector('[data-page="advanced-search"]');

  if (searchIcon && searchBar && closeSearch) {
    // Show search bar on search icon click
    searchIcon.addEventListener('click', () => {
      searchBar.classList.add('show');
      searchBar.classList.remove('d-none');
    });

    // Hide search bar on close button click
    closeSearch.addEventListener('click', () => {
      searchBar.classList.remove('show');
      searchBar.classList.add('d-none');
    });

    // Hide search bar on search button click (can trigger search here)
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        searchBar.classList.remove('show');
        searchBar.classList.add('d-none');
        // Optional: trigger search action here
      });
    }

    // Advanced search link click handler
    if (advancedSearchLink) {
      advancedSearchLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        searchBar.classList.remove('show');
        searchBar.classList.add('d-none');
        if (typeof loadPage === 'function') {
          loadPage('advanced-search');
        } else {
          window.location.href = 'pages/advanced-search.html';
        }
      });
    }
  }
});

// =========================
// Page Loader Functionality
// =========================

// Loads a page into the content area via AJAX and updates browser history
function loadPage(page, addToHistory = true) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById('content-area').innerHTML = data;

      // Update URL without reloading the page
      if (addToHistory) {
        history.pushState({ page: page }, '', `#${page}`);
      }

      // Scroll to top when loading new page
      window.scrollTo(0, 0);
    });
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    loadPage(event.state.page, false); // Don't push history again
  }
});

// Handle clicks on elements with [data-page] attribute to load pages dynamically
document.addEventListener('click', function (e) {
  const target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    loadPage(target.getAttribute('data-page'));
  }
});

// =========================
// jQuery Enhancements
// =========================
$(document).ready(function () {
  // Highlight active nav item on click
  $('.nav-link').on('click', function () {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });

  // Show search bar with fade-in effect
  $('#searchIcon').on('click', function (e) {
    e.preventDefault();
    $('#searchBar').removeClass('d-none').hide().fadeIn();
  });

  // Hide search bar with fade-out effect on close button click
  $('#closeSearch').on('click', function () {
    $('#searchBar').fadeOut(function () {
      $(this).addClass('d-none');
    });
  });

  // Optional: Hide search bar when clicking outside of it or the search icon
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#searchBar, #searchIcon').length) {
      $('#searchBar').fadeOut(function () {
        $(this).addClass('d-none');
      });
    }
  });
});