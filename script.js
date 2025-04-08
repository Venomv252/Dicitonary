let form = document.querySelector("#Form");
let button = document.querySelector("button");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let word = document.querySelector("#search").value.trim();
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Word not found");
      return res.json();
    })
    .then((data) => {
      const entry = data[0];
      const resultDiv = document.getElementById("result");
      console.log(data);

      const html = `
        <h2>${entry.word.charAt(0).toUpperCase() + entry.word.slice(1)}</h2>
        ${entry.meanings.map(meaning =>`
          <h3>Part of Speech :${meaning.partOfSpeech}</h3>
          <ul>
          ${meaning.definitions.map((def,index) =>`
          <li>
          <strong> Definition ${index + 1}:</strong> ${def.definition}
          ${def.example ? `<br><em>Example:</em> "${def.example}"`:""}
          </li>
          ` ).join("")}
          </ul>
           `).join("")}
           `;
        

      
          

      resultDiv.innerHTML = html;
    })
    .catch((err) => {
      document.getElementById("result").innerHTML = `<p style="color:black;">${err.message}</p>`;
    });
});
