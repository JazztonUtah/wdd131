const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description: "If you enjoy stories about seventh sons of seventh sons and magyk, this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",
    genre: "Fantasy",
    stars: "****",
    fullDescription: "If you enjoy stories about seventh sons of seventh sons and magyk, this is the book for you. Septimus Heap, the seventh son of the seventh son, is stolen the night he is born by a midwife who pronounces him dead. That same night, the baby's father, Silas Heap, comes across a bundle in the snow containing a newborn girl with violet eyes. The Heaps take her into their home, raising her as their own alongside their six sons. Meanwhile, Septimus is raised in isolation by the ExtraOrdinary Wizard, Marcia Overstrand. But darkness is approaching as the evil wizard DomDaniel returns to reclaim his position. This magical adventure is perfect for fans of fantasy and wizardry!"
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
    imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12-16",
    genre: "Fantasy",
    stars: "****",
    fullDescription: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good. Magnus Chase has always been a troubled kid. Since his mother's mysterious death, he's lived alone on the streets of Boston, surviving by his wits. One day, he's tracked down by an uncle he barely knows who tells him an impossible secret: Magnus is the son of a Norse god. The Viking myths are true. The gods of Asgard are preparing for war. Trolls, giants, and worse monsters are stirring for doomsday. To prevent Ragnarok, Magnus must search the Nine Worlds for a weapon that has been lost for thousands of years. This epic adventure combines humor, heart, and Norse mythology in classic Riordan style!"
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "*****",
    fullDescription: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission. Long ago, the evil God Torak drove men and Gods to war. But Torak was defeated and the Orb reclaimed by the forces of good. Now, thousands of years later, the Orb has been stolen again. Garion, a simple farm boy, finds himself swept up in events beyond his understanding. As he travels with Aunt Pol and the mysterious Wolf, he begins to discover that his world is far more complex than he ever imagined, and his own destiny may be tied to the fate of the world itself. This classic fantasy series is a must-read for fans of epic adventures and magical quests!"
  }
];

// Function to convert date string to ISO format for datetime attribute
function getDateTimeISO(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Function to convert stars to HTML star symbols
function getStarsHTML(stars) {
  // If already using emoji or other star symbols, return as-is
  // Otherwise convert asterisks to filled star symbols
  return stars.replace(/\*/g, '★');
}

// Function to create a single article element
function createArticleHTML(article) {
  const articleElement = document.createElement('article');
  articleElement.classList.add('book-review');
  
  articleElement.innerHTML = `
    <div class="article-meta">
      <time datetime="${getDateTimeISO(article.date)}" class="article-date">${article.date}</time>
      <span class="book-ages">${article.ages}</span>
      <span class="book-genre">${article.genre}</span>
      <div class="book-rating" aria-label="${article.stars.length} out of 5 stars">
        <span class="stars">${getStarsHTML(article.stars)}</span>
      </div>
    </div>
    
    <div class="article-content">
      <header class="article-header">
        <h3>${article.title}</h3>
      </header>
      
      <img src="${article.imgSrc}" 
           alt="${article.imgAlt}" 
           class="book-cover">
      
      <div class="book-details">
        <p class="book-description">
          <span class="short-description">${article.description}</span>
          <span class="full-description" style="display: none;"> ${article.fullDescription}</span>
          <a href="#" class="read-more" aria-label="Read more about ${article.title}">Read More...</a>
        </p>
      </div>
    </div>
  `;
  
  // Add click event listener to the Read More link
  const readMoreLink = articleElement.querySelector('.read-more');
  const shortDesc = articleElement.querySelector('.short-description');
  const fullDesc = articleElement.querySelector('.full-description');
  
  readMoreLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (fullDesc.style.display === 'none') {
      // Show full description
      shortDesc.style.display = 'none';
      fullDesc.style.display = 'inline';
      readMoreLink.textContent = 'Read Less...';
      readMoreLink.setAttribute('aria-label', `Read less about ${article.title}`);
    } else {
      // Show short description
      shortDesc.style.display = 'inline';
      fullDesc.style.display = 'none';
      readMoreLink.textContent = 'Read More...';
      readMoreLink.setAttribute('aria-label', `Read more about ${article.title}`);
    }
  });
  
  return articleElement;
}

// Function to display all articles
function displayArticles(articlesArray) {
  const articlesContainer = document.querySelector('.articles-section');
  
  // Clear any existing articles (if any)
  const existingArticles = articlesContainer.querySelectorAll('.book-review');
  existingArticles.forEach(article => article.remove());
  
  // Create and append each article
  articlesArray.forEach(article => {
    const articleElement = createArticleHTML(article);
    articlesContainer.appendChild(articleElement);
  });
}

// Initialize the page by displaying articles when DOM is loaded
displayArticles(articles);
