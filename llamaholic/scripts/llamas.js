// Llama data - Array of objects for better array method usage
const llamasArray = [
  {
    id: "cinnamon",
    name: "Cinnamon",
    image: "images/Cinnimon.JPG",
    age: "Baby (Born Spring 2025)",
    origin: "Utah",
    type: "baby",
    personality: "Sweet, energetic, curious, loves to explore and follow his mama around",
    description: "Meet Cinnamon, one of our adorable baby llamas born this spring! This little bundle of fluff is still discovering the world around him and learning what it means to be a llama. Cinnamon got his name from his beautiful cinnamon-brown coat that seems to glow in the sunlight. He's incredibly curious and loves to explore everything with his big, innocent eyes. Watch him bounce around the pasture with pure joy and energy that only a baby llama can have.",
    funFact: "His favorite activity is following his mama around and trying to imitate everything the older llamas do! Cinnamon is still nursing but is starting to nibble on hay and grass, often making the funniest faces as he tries new foods.",
    videoUrl: "#"
  },
  {
    id: "panda",
    name: "Panda",
    image: "images/panda.jpeg",
    imageClass: "panda-img",
    age: "Baby (Born Spring 2025)",
    origin: "Idaho",
    type: "baby",
    personality: "Cautious, thoughtful, sweet, loves sunny naps and treats",
    description: "Panda is another precious baby llama born this spring! Named for her striking black and white patches that make her look like her namesake, Panda is the more cautious of the two babies. While Cinnamon charges ahead, Panda likes to observe first and think things through. Don't let her careful nature fool you though—once she decides something is safe, she's all in! Panda has the softest fleece you've ever felt and the longest eyelashes that would make anyone jealous.",
    funFact: "She's still learning to make proper llama sounds, and her attempts at humming often come out as adorable squeaks. Panda loves snuggling up for naps in sunny spots and has already learned that humans often have treats in their pockets.",
    videoUrl: "#"
  },
  {
    id: "michelle",
    name: "Michelle Ollama",
    image: "images/michelleollama.jpeg",
    age: "Adult",
    origin: "Wild - Caught in Northern Utah",
    type: "wild",
    personality: "Independent, intelligent, observant, wary but learning to trust",
    description: "Michelle Ollama has the most dramatic backstory of our herd—she's a wild llama who was caught in northern Utah! Before joining our family, Michelle roamed free, which explains her independent spirit and slightly aloof demeanor. She's still getting used to domestic life, though she's made remarkable progress. Michelle has a striking dark grey coat with a distinctive white face, and moves with the grace of a llama who grew up navigating mountain terrain on her own terms. Michelle is now a proud mama to her baby, Cloud, and motherhood has softened her wild edges just a bit.",
    funFact: "While she's not as cuddly as some llamas, she has her own dignity and charm. She's teaching us that llamas are magnificent animals who deserve respect, and we're honored that she's chosen to stay with us. Slowly but surely, Michelle is learning to trust, and every small step forward feels like a victory.",
    videoUrl: "#"
  },
  {
    id: "shrek",
    name: "Shrek",
    image: "images/shrek.jpeg",
    age: "Experienced Pack Llama",
    origin: "Idaho",
    type: "pack",
    personality: "Strong, reliable, professional, surprisingly goofy when off duty",
    description: "Shrek is our experienced pack llama from Idaho, and he's the professional of the group. This working llama has spent years on mountain trails, carrying gear for hikers and explorers across the rugged Idaho wilderness. Shrek is incredibly strong, reliable, and knows his job well. Despite his serious work ethic, he has a surprisingly goofy personality that emerges when he's not on duty. His beautiful whitish coat has seen many adventures, and he carries himself with the confidence of a llama who knows exactly what he's doing.",
    funFact: "He's food-motivated (a crucial trait for pack llama training) and will do almost anything for his favorite treats. When he's not working or training, Shrek enjoys a good roll in the dust and showing off his impressive packing skills. Shrek is patient and gentle, making him perfect for teaching the babies proper llama behavior.",
    videoUrl: "#"
  }
];

// Convert array to object for easy lookup
const llamaData = llamasArray.reduce((acc, llama) => {
  acc[llama.id] = llama;
  return acc;
}, {});

// Filter functions using array methods
function getBabyLlamas() {
  return llamasArray.filter(llama => llama.type === 'baby');
}

function getLlamasByOrigin(origin) {
  return llamasArray.filter(llama => 
    llama.origin.toLowerCase().includes(origin.toLowerCase())
  );
}

function getLlamaNames() {
  return llamasArray.map(llama => llama.name);
}

// Get statistics using reduce
function getLlamaStats() {
  return llamasArray.reduce((stats, llama) => {
    stats.total++;
    stats.types[llama.type] = (stats.types[llama.type] || 0) + 1;
    return stats;
  }, { total: 0, types: {} });
}

// Modal functions
function populateModal(llama) {
  const modalImage = document.getElementById('modalImage');
  const modalName = document.getElementById('modalName');
  const modalMeta = document.getElementById('modalMeta');
  const modalPersonality = document.getElementById('modalPersonality');
  const modalDescription = document.getElementById('modalDescription');
  const modalFact = document.getElementById('modalFact');
  const modalVideoLink = document.getElementById('modalVideoLink');
  
  modalImage.src = llama.image;
  modalImage.alt = llama.name;
  modalImage.className = llama.imageClass || '';
  modalName.textContent = `Name: ${llama.name}`;
  modalMeta.textContent = `Age: ${llama.age} | Origin: ${llama.origin}`;
  modalPersonality.innerHTML = `<strong>Personality:</strong> ${llama.personality}`;
  modalDescription.innerHTML = `<strong>Description:</strong> ${llama.description}`;
  modalFact.innerHTML = `<strong>Fun Fact:</strong> ${llama.funFact}`;
  modalVideoLink.href = llama.videoUrl;
}

function showModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCardClick(event) {
  const card = event.currentTarget;
  const llamaId = card.getAttribute('data-llama');
  const llama = llamaData[llamaId];
  
  if (llama) {
    populateModal(llama);
    showModal();
  }
}

// Initialize modal functionality
function initializeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const llamaCards = document.querySelectorAll('.llama-card');
  
  // Add click event to each card using forEach
  llamaCards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
  
  // Close button
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  // Click outside to close
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        hideModal();
      }
    });
  }
  
  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      hideModal();
    }
  });
}

// Log statistics on page load (demonstrates array methods)
console.log('Llama Statistics:', getLlamaStats());
console.log('Baby Llamas:', getBabyLlamas().map(l => l.name));
console.log('Utah Llamas:', getLlamasByOrigin('Utah').map(l => l.name));
console.log('All Llama Names:', getLlamaNames());

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeModal);
} else {
  initializeModal();
}

