
  document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    // Optional: Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);

    // Show the first slide initially
    showSlide(currentIndex);
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('searchIcon');
  const searchBar = document.getElementById('searchBar');
  const closeSearch = document.getElementById('closeSearch');
  const searchBtn = document.getElementById('searchBtn');
  const advancedSearchLink = document.querySelector('[data-page="advanced-search"]');

  if (searchIcon && searchBar && closeSearch) {
    searchIcon.addEventListener('click', () => {
      searchBar.classList.add('show');
      searchBar.classList.remove('d-none');
    });

    closeSearch.addEventListener('click', () => {
      searchBar.classList.remove('show');
      searchBar.classList.add('d-none');
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        searchBar.classList.remove('show');
        searchBar.classList.add('d-none');
        // Optional: trigger search action here
      });
    }

    if (advancedSearchLink) {
      advancedSearchLink.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default anchor behavior
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

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    loadPage(event.state.page, false); // don't push history again
  }
});



    // Load Home on first load
    // window.onload = () => loadPage('home');

// $(function () {
//   $('#content-area').html('<div class="skeleton"></div>'); // optional skeleton
//   loadPage('home'); // load main content
   
// });

    document.addEventListener('click', function (e) {
  const target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    loadPage(target.getAttribute('data-page'));
  }
});


 $(document).ready(function () {
    // Highlight active nav item
    $('.nav-link').on('click', function () {
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
    });

    // Toggle search bar visibility
    $('#searchIcon').on('click', function (e) {
      e.preventDefault();
      $('#searchBar').removeClass('d-none').hide().fadeIn();
    });

    $('#closeSearch').on('click', function () {
      $('#searchBar').fadeOut(function () {
        $(this).addClass('d-none');
      });
    });

    // Optional: Close search bar on outside click
    $(document).on('click', function (e) {
      if (!$(e.target).closest('#searchBar, #searchIcon').length) {
        $('#searchBar').fadeOut(function () {
          $(this).addClass('d-none');
        });
      }
    });
  });
