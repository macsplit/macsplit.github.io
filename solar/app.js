const siteDescriptions = {
  "Library Annex":
    "Library Annex is running inside its normal modeled band, with no sustained anomaly pattern in the current mock dataset.",
  "Community Hall Roof":
    "Community Hall Roof shows a mild but persistent downward drift, which fits a degradation or fouling scenario rather than a sudden string failure.",
  "Array 4 / String B":
    "Array 4 / String B is the clearest fault candidate in this mockup: multiple consecutive days fall well below the weather-adjusted expectation.",
  "Depot Canopy":
    "Depot Canopy is healthy in the current view, and its daily yield tracks the model closely despite normal weather variation."
};

const siteButtons = document.querySelectorAll(".map-node");
const siteDescription = document.querySelector("#site-description");
const dropzone = document.querySelector("#upload-dropzone");

siteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const site = button.dataset.site;
    siteDescription.textContent = siteDescriptions[site] || "No mock detail available for this site.";

    siteButtons.forEach((node) => node.classList.remove("selected"));
    button.classList.add("selected");
  });
});

["dragenter", "dragover"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.add("active");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.remove("active");
  });
});

dropzone.addEventListener("drop", () => {
  dropzone.innerHTML = "<p>Mock file accepted</p><span>Ready to normalize daily readings and run the model</span>";
});
