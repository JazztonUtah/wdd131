// Llama data
const llamaData = {
  cinnamon: {
    name: "Cinnamon",
    image: "images/Cinnimon.JPG",
    age: "Baby (Born Spring 2025)",
    origin: "Utah",
    personality: "Sweet, energetic, curious, loves to explore and follow his mama around",
    description: "Meet Cinnamon, one of our adorable baby llamas born this spring! This little bundle of fluff is still discovering the world around him and learning what it means to be a llama. Cinnamon got his name from his beautiful cinnamon-brown coat that seems to glow in the sunlight. He's incredibly curious and loves to explore everything with his big, innocent eyes. Watch him bounce around the pasture with pure joy and energy that only a baby llama can have.",
    funFact: "His favorite activity is following his mama around and trying to imitate everything the older llamas do! Cinnamon is still nursing but is starting to nibble on hay and grass, often making the funniest faces as he tries new foods.",
    videoUrl: "#"
  },
  panda: {
    name: "Panda",
    image: "images/panda.jpeg",
    imageClass: "panda-img",
    age: "Baby (Born Spring 2025)",
    origin: "Idaho",
    personality: "Cautious, thoughtful, sweet, loves sunny naps and treats",
    description: "Panda is another precious baby llama born this spring! Named for her striking black and white patches that make her look like her namesake, Panda is the more cautious of the two babies. While Cinnamon charges ahead, Panda likes to observe first and think things through. Don't let her careful nature fool you though—once she decides something is safe, she's all in! Panda has the softest fleece you've ever felt and the longest eyelashes that would make anyone jealous.",
    funFact: "She's still learning to make proper llama sounds, and her attempts at humming often come out as adorable squeaks. Panda loves snuggling up for naps in sunny spots and has already learned that humans often have treats in their pockets.",
    videoUrl: "#"
  },
  michelle: {
    name: "Michelle Ollama",
    image: "images/michelleollama.jpeg",
    age: "Adult",
    origin: "Wild - Caught in Northern Utah",
    personality: "Independent, intelligent, observant, wary but learning to trust",
    description: "Michelle Ollama has the most dramatic backstory of our herd—she's a wild llama who was caught in northern Utah! Before joining our family, Michelle roamed free, which explains her independent spirit and slightly aloof demeanor. She's still getting used to domestic life, though she's made remarkable progress. Michelle has a striking dark grey coat with a distinctive white face, and moves with the grace of a llama who grew up navigating mountain terrain on her own terms. Michelle is now a proud mama to her baby, Cloud, and motherhood has softened her wild edges just a bit.",
    funFact: "While she's not as cuddly as some llamas, she has her own dignity and charm. She's teaching us that llamas are magnificent animals who deserve respect, and we're honored that she's chosen to stay with us. Slowly but surely, Michelle is learning to trust, and every small step forward feels like a victory.",
    videoUrl: "#"
  },
  shrek: {
    name: "Shrek",
    image: "images/shrek.jpeg",
    age: "Experienced Pack Llama",
    origin: "Idaho",
    personality: "Strong, reliable, professional, surprisingly goofy when off duty",
    description: "Shrek is our experienced pack llama from Idaho, and he's the professional of the group. This working llama has spent years on mountain trails, carrying gear for hikers and explorers across the rugged Idaho wilderness. Shrek is incredibly strong, reliable, and knows his job well. Despite his serious work ethic, he has a surprisingly goofy personality that emerges when he's not on duty. His beautiful whitish coat has seen many adventures, and he carries himself with the confidence of a llama who knows exactly what he's doing.",
    funFact: "He's food-motivated (a crucial trait for pack llama training) and will do almost anything for his favorite treats. When he's not working or training, Shrek enjoys a good roll in the dust and showing off his impressive packing skills. Shrek is patient and gentle, making him perfect for teaching the babies proper llama behavior.",
    videoUrl: "#"
  }
};

// Get modal elements
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalMeta = document.getElementById('modalMeta');
const modalPersonality = document.getElementById('modalPersonality');
const modalDescription = document.getElementById('modalDescription');
const modalFact = document.getElementById('modalFact');
const modalVideoLink = document.getElementById('modalVideoLink');

// Get all llama cards
const llamaCards = document.querySelectorAll('.llama-card');

// Add click event to each card
llamaCards.forEach(card => {
  card.addEventListener('click', function() {
    const llamaId = this.getAttribute('data-llama');
    const llama = llamaData[llamaId];
    
    if (llama) {
      // Populate modal with llama data
      modalImage.src = llama.image;
      modalImage.alt = llama.name;
      modalImage.className = llama.imageClass || '';
      modalName.textContent = `Name: ${llama.name}`;
      modalMeta.textContent = `Age: ${llama.age} | Origin: ${llama.origin}`;
      modalPersonality.innerHTML = `<strong>Personality:</strong> ${llama.personality}`;
      modalDescription.innerHTML = `<strong>Description:</strong> ${llama.description}`;
      modalFact.innerHTML = `<strong>Fun Fact:</strong> ${llama.funFact}`;
      modalVideoLink.href = llama.videoUrl;
      
      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  });
});

// Close modal when clicking close button
modalClose.addEventListener('click', function() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable scrolling
});

// Close modal when clicking outside the card
modalOverlay.addEventListener('click', function(e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
});

