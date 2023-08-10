// Função para buscar significado da palavra
async function searchWord(word) {
  const apiUrl = `https://api.dicionario-aberto.net/word/${word}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Exibir significado no elemento 'search-result'
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    data.forEach(entry => {
      const word = entry.word;
      const definition = entry.xml;

      const wordElement = document.createElement('h3');
      wordElement.textContent = word;

      const definitionElement = document.createElement('p');
      definitionElement.innerHTML = definition;

      searchResult.appendChild(wordElement);
      searchResult.appendChild(definitionElement);
    });
  } catch (error) {
    console.error('Erro ao buscar palavra:', error);
  }
}

// Event listener para o formulário de busca
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('search-input').value.toLowerCase();
  searchWord(input);
});

// Event listener para o botão "Aleatório"
const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', async () => {
  try {
    const response = await fetch("https://api.dicionario-aberto.net/random");
    const data = await response.json();
    const randomWord = data.word;

    // Preencher o campo de busca com a palavra aleatória
    document.getElementById('search-input').value = randomWord;
    searchWord(randomWord); // Chamar a função para buscar a palavra aleatória
  } catch (error) {
    console.error('Erro ao buscar palavra aleatória:', error);
  }
});
