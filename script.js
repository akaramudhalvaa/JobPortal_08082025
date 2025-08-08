function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('show');
  }
  
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Auto-play every 7 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 7000);

// Initialize
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    keyword: params.get("keyword")?.toLowerCase() || "",
    category: params.get("category") || "",
    location: params.get("location") || ""
  };
}

function filterJobsByQuery() {
  const { keyword, category, location } = getQueryParams();

  const filteredJobs = jobList.filter(job => {
    return (
      (keyword === "" || job.title.toLowerCase().includes(keyword)) &&
      (category === "" || job.category === category) &&
      (location === "" || job.location === location)
    );
  });

  displayJobs(filteredJobs);
}

// save button//

  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("saved");
      btn.textContent = btn.classList.contains("saved") ? "Saved" : "Save Job";
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll(".save-btn");
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  // Initialize saved state
  saveButtons.forEach(button => {
    const jobCard = button.closest(".job-card");
    const jobId = jobCard.dataset.id;

    if (savedJobs.includes(jobId)) {
      button.classList.add("saved");
      button.textContent = "Saved";
    }

    button.addEventListener("click", () => {
      const isSaved = savedJobs.includes(jobId);

      if (!isSaved) {
        savedJobs.push(jobId);
        button.classList.add("saved");
        button.textContent = "Saved";
      } else {
        const index = savedJobs.indexOf(jobId);
        savedJobs.splice(index, 1);
        button.classList.remove("saved");
        button.textContent = "Save Job";
      }

      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    });
  });
});



//fillterjob//
document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category-filter');
    const locationSelect = document.getElementById('location-filter');
    const categoryBoxes = document.querySelectorAll('.category-box');

    function filterCategories() {
        const selectedCategory = categorySelect.value.toLowerCase();
        const selectedLocation = locationSelect.value.toLowerCase();

        categoryBoxes.forEach(box => {
            const boxCategory = box.getAttribute('data-category').toLowerCase();
            const boxLocation = box.getAttribute('data-location').toLowerCase();

            const matchesCategory = !selectedCategory || boxCategory === selectedCategory;
            const matchesLocation = !selectedLocation || boxLocation === selectedLocation;

            if (matchesCategory && matchesLocation) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }

    categorySelect.addEventListener('change', filterCategories);
    locationSelect.addEventListener('change', filterCategories);
});


//JOB CATEGORY
  const tabButtons = document.querySelectorAll('.tab-btn');
  const jobCards = document.querySelectorAll('.job-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      jobCards.forEach(card => {
        if (filter === 'featured') {
          // Show all cards for 'Featured'
          card.style.display = 'block';
        } else {
          // Show only matching cards
          card.style.display = card.dataset.type === filter ? 'block' : 'none';
        }
      });
    });
  });

  // Set default filter to show all jobs
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.tab-btn[data-filter="featured"]').click();
  });

// JOB APPLY//
document.querySelectorAll('.apply-btn').forEach(button => {
  button.addEventListener('click', () => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // hide after 3 seconds
  });
});
  //job description//
function closeModal() {
    document.getElementById("jobModal").style.display = "none";
  }

  function showSuccess() {
    // Close the modal
    closeModal();

    // Show the success message
    const message = document.getElementById("successMessage");
    message.style.display = "block";

    // Hide it after 2.5 seconds
    setTimeout(() => {
      message.style.display = "none";
    }, 2500);
  }

  // Optional: Close modal when clicking outside of it
  window.onclick = function(event) {
    const modal = document.getElementById("jobModal");
    if (event.target == modal) {
      closeModal();
    }
  }











