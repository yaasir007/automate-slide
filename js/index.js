// Global variables
let html2canvasLoaded = false;
let slidesData = [];
let overlayImageUrl = null;

// Check if html2canvas is available
function checkLibraries() {
  if (typeof html2canvas !== "undefined") {
    html2canvasLoaded = true;
    console.log("html2canvas loaded successfully");
  }
}

// Check periodically until loaded
const checkInterval = setInterval(() => {
  checkLibraries();
  if (html2canvasLoaded) clearInterval(checkInterval);
}, 100);

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("dragover");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("dragover");
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    document.getElementById("jsonFile").files = files;
    loadJsonFile({ target: { files: files } });
  }
}

// Load overlay image
function loadOverlayImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    overlayImageUrl = e.target.result;
    const preview = document.getElementById("overlayPreview");
    preview.style.backgroundImage = `url(${overlayImageUrl})`;
    preview.textContent = "";
    console.log("Overlay image loaded");
  };
  reader.readAsDataURL(file);
}

// Load JSON file with enhanced UI feedback
function loadJsonFile(event) {
  const file = event.target.files[0];
  const fileStatus = document.getElementById("fileStatus");
  const generateBtn = document.getElementById("generateBtn");

  if (!file) return;

  if (file.type !== "application/json" && !file.name.endsWith(".json")) {
    fileStatus.innerHTML = "❌ Please select a valid JSON file";
    fileStatus.className = "status-area status-error";
    generateBtn.disabled = true;
    return;
  }

  fileStatus.innerHTML =
    '<div class="loading-spinner"></div>Loading and validating file...';
  fileStatus.className = "status-area status-loading";

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const jsonData = JSON.parse(e.target.result);

      if (!Array.isArray(jsonData)) {
        throw new Error("JSON must be an array of slide objects");
      }

      for (let i = 0; i < jsonData.length; i++) {
        const slide = jsonData[i];
        if (!slide.title) {
          throw new Error(`Slide ${i + 1} is missing a title`);
        }
      }

      slidesData = jsonData;

      fileStatus.innerHTML = `✅ Successfully loaded ${jsonData.length} slides from "${file.name}"`;
      fileStatus.className = "status-area status-success";
      generateBtn.disabled = false;

      updateStats();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      fileStatus.innerHTML = `❌ Error: ${error.message}`;
      fileStatus.className = "status-area status-error";
      generateBtn.disabled = true;
    }
  };

  reader.onerror = function () {
    fileStatus.innerHTML = "❌ Error reading file";
    fileStatus.className = "status-area status-error";
    generateBtn.disabled = true;
  };

  reader.readAsText(file);
}

// Create enhanced slide with overlay support
function createSlide(slideData, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.setAttribute("data-slide", index);

  // Add overlay image as background if available
  if (overlayImageUrl) {
    slide.style.backgroundImage = `url(${overlayImageUrl})`;
  }

  let contentHTML = "";

  if (slideData.content && slideData.content.length > 0) {
    contentHTML = `
                    <ul>
                        ${slideData.content
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                `;
  }

  if (slideData.codeBlock) {
    contentHTML += `<div class="code-block">${slideData.codeBlock}</div>`;
  }

  slide.innerHTML = `
                <div class="slide-content-wrapper">
                    <div class="slide-header">
                        <h1 class="slide-title">${slideData.title}</h1>
                        ${
                          slideData.subtitle
                            ? `<h2 class="slide-subtitle">${slideData.subtitle}</h2>`
                            : ""
                        }
                    </div>
                    <div class="slide-content">
                        ${contentHTML}
                    </div>
                    <div class="slide-footer">
                        By <span style="color: gold;">@yaasir.codes</span>. Follow me for more!
                    </div>
                </div>
            `;

  return slide;
}

// Enhanced download with progress
async function downloadSlides() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length === 0) {
    alert("Please generate slides first!");
    return;
  }

  if (!html2canvasLoaded) {
    alert("Please wait for the page to fully load, then try again.");
    return;
  }

  const button = event.target;
  const originalText = button.innerHTML;
  button.disabled = true;

  try {
    for (let i = 0; i < slides.length; i++) {
      button.innerHTML = `<div class="loading-spinner"></div>Downloading ${
        i + 1
      }/${slides.length}...`;

      const slide = slides[i];
      const canvas = await html2canvas(slide, {
        width: slide.offsetWidth,
        height: slide.offsetHeight,
        scale: 2,
        backgroundColor: "#1a1a2e",
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `slide-${String(i + 1).padStart(2, "0")}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    alert(`🎉 Successfully downloaded ${slides.length} slides!`);
  } catch (error) {
    console.error("Error generating slides:", error);
    alert("Error generating slides. Please try again.");
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
}

// Enhanced print function
function printSlides() {
  if (document.querySelectorAll(".slide").length === 0) {
    alert("Please generate slides first!");
    return;
  }

  window.print();
}

// Clear slides with confirmation
function clearSlides() {
  if (document.querySelectorAll(".slide").length === 0) return;

  if (confirm("Are you sure you want to clear all slides?")) {
    document.getElementById("slides-container").innerHTML = "";
    updateStats();
  }
}

// Generate slides with animation
function generateSlides() {
  if (slidesData.length === 0) {
    alert("Please upload slide data first!");
    return;
  }

  const container = document.getElementById("slides-container");
  container.innerHTML = "";

  slidesData.forEach((slideData, index) => {
    setTimeout(() => {
      const slide = createSlide(slideData, index);
      slide.style.opacity = "0";
      slide.style.transform = "translateY(20px)";
      container.appendChild(slide);

      setTimeout(() => {
        slide.style.transition = "all 0.5s ease";
        slide.style.opacity = "1";
        slide.style.transform = "translateY(0)";
      }, 50);
    }, index * 100);
  });

  updateStats();
}

// Update statistics
function updateStats() {
  const slideCount = document.querySelectorAll(".slide").length;
  const dataCount = slidesData.length;

  document.getElementById("slideCount").textContent = `Slides: ${dataCount}`;
  document.getElementById(
    "slideCounter"
  ).textContent = `${dataCount} slides generated`;
  document.getElementById("lastUpdated").textContent =
    dataCount > 0 ? "Just updated" : "Ready to create";
}

// Initialize on page load
window.addEventListener("load", function () {
  updateStats();
  setTimeout(checkLibraries, 1000);
});
