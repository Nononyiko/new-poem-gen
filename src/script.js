document.getElementById('poemForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const themeInput = document.getElementById('theme');
  const theme = themeInput.value.trim();
  const poemDiv = document.getElementById('poem');
  const poemBox = document.getElementById('poemBox');
  const submitButton = document.querySelector('.button');

  
  if (!theme) {
    poemDiv.innerHTML = `<p>Please enter a theme to generate a poem.</p>`;
    poemBox.classList.add("visible");
    return;
  }

  
  submitButton.disabled = true;
  submitButton.value = "Generating...";
  poemBox.classList.remove("visible");
  poemDiv.innerHTML = `
    <div class="spinner"></div>
    <p>Generating your poem...</p>
  `;

  const apiUrl = "https://api.shecodes.io/ai/v1/generate";
  const apiKey = "6f60fd1ebaeb36d3f6o4ab0088t35e2b";
  const context = "Write a short poem about the following theme.";

  try {
    const response = await fetch(`${apiUrl}?prompt=${encodeURIComponent(theme)}&context=${encodeURIComponent(context)}&key=${apiKey}`);
    const data = await response.json();

    if (data && data.answer) {
      
      setTimeout(() => {
        poemDiv.innerHTML = ""; 
        typeWriter(poemDiv, data.answer.replace(/\n/g, "<br>"));
        poemBox.classList.add("visible");
      }, 300);
    } else {
      poemDiv.innerHTML = `
        <h2>No poem generated</h2>
        <p>Please try another theme.</p>
      `;
      poemBox.classList.add("visible");
    }
  } catch (error) {
    poemDiv.innerHTML = `
      <h2>Error generating poem</h2>
      <p>Please try again later.</p>
    `;
    poemBox.classList.add("visible");
  }

  submitButton.disabled = false;
  submitButton.value = "Generate";
});


function typeWriter(element, html, speed = 30) {
  element.innerHTML = "";
  let i = 0;
  let tag = false;
  let temp = "";

  function type() {
    if (i < html.length) {
      if (html[i] === "<") tag = true;
      if (tag) {
        temp += html[i];
      } else {
        element.innerHTML += html[i];
      }

      if (html[i] === ">") {
        tag = false;
        element.innerHTML += temp;
        temp = "";
      }

      i++;
      setTimeout(type, speed);
    }
  }

  type();
}
