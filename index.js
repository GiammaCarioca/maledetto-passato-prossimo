const endpoint =
  "https://gist.githubusercontent.com/GiammaCarioca/511013c4b8da69aad8dc94a759e7c4a2/raw/1c13c93773dcf032d3a91fbce7fafa73ab762185/verbi-sorted-complete-duplicates.json";

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function findMatches(wordToMatch, verbs) {
  return verbs.filter((verb) => {
    // here we need to figure out if the verb or participle matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return verb.infinitive.match(regex) || verb.participle[0].match(regex);
  });
}

async function displayMatches() {
  const verbi = await fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data);

  const matchArray = findMatches(this.value, verbi);
  const html = matchArray
    .map((verb) => {
      const regex = new RegExp(this.value, "gi");
      const verbName = verb.infinitive.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const participleName = verb.participle[0].replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <ul>
        <li>
          <span>infinito: ${verbName}</span>
        </li>
        <li>
          <span>participio: ${participleName}</span>
        </li>
        <li>
          <span>ausiliare: ${verb.aux}</span>
        </li>
      </ul>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
