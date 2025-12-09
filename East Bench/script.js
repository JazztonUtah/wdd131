// Room data - Add your images and info here
const roomData = {
    'chapel': {
        name: 'Chapel',
        image: 'images/chapel.png',
        youthAdult: 'Recommended: 200-300',
        primaryKids: 'N/A',
        classes: 'Sacrament Meeting',
        teachers: ''
    },
    'overflow-1': {
        name: 'Overflow 1',
        image: '',
        youthAdult: 'Recommended: 50-75',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'overflow-2': {
        name: 'Overflow 2',
        image: '',
        youthAdult: 'Recommended: 25-40',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'room-107': {
        name: 'Room 107',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-108': {
        name: 'Room 108',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'bathroom': {
        name: 'Bathroom',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'north-foyer': {
        name: 'North Foyer',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'south-foyer': {
        name: 'South Foyer',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'east-foyer': {
        name: 'East Foyer',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'rs-room': {
        name: 'RS Room',
        image: '',
        youthAdult: '',
        primaryKids: 'N/A',
        classes: 'Relief Society',
        teachers: ''
    },
    'primary-room': {
        name: 'Primary Room',
        image: '',
        youthAdult: 'N/A',
        primaryKids: '',
        classes: 'Primary',
        teachers: ''
    },
    'bishop-nw': {
        name: 'Bishop Office (Our Ward)',
        image: '',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-nw': {
        name: 'Clerk Office (Our Ward)',
        image: '',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'bishop-nw-2': {
        name: 'Bishop Office',
        image: '',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-nw-2': {
        name: 'Clerk Office',
        image: '',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'room-101': {
        name: 'Room 101',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-102': {
        name: 'Room 102',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-103': {
        name: 'Room 103',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'bathroom-north': {
        name: 'Bathroom',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'custodial': {
        name: 'Custodial Closet',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'storage': {
        name: 'Table Storage',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'kitchen': {
        name: 'Kitchen',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: ''
    },
    'room-104': {
        name: 'Room 104',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-105': {
        name: 'Room 105',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-106': {
        name: 'Room 106',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'mothers': {
        name: "Mother's Room",
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'library': {
        name: 'Library',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-115': {
        name: 'Room 115',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-114': {
        name: 'Room 114',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-113': {
        name: 'Room 113',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-112': {
        name: 'Room 112',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'nursery': {
        name: 'Nursery',
        image: '',
        youthAdult: 'N/A',
        primaryKids: '',
        classes: 'Nursery',
        teachers: ''
    },
    'room-110': {
        name: 'Room 110',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'bishop-sw': {
        name: 'Bishop Office',
        image: '',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-sw': {
        name: 'Clerk Office',
        image: '',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'old-hp-room': {
        name: 'Old HP Room',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-116': {
        name: 'Room 116',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-117': {
        name: 'Room 117',
        image: '',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    }
};

// DOM Elements
const modal = document.getElementById('roomModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalYouthAdult = document.getElementById('modalYouthAdult');
const modalPrimaryKids = document.getElementById('modalPrimaryKids');
const modalClasses = document.getElementById('modalClasses');
const modalTeachers = document.getElementById('modalTeachers');
const closeBtn = document.querySelector('.close-btn');

// Add click handlers to all SVG room elements
document.addEventListener('DOMContentLoaded', () => {
    const rooms = document.querySelectorAll('.room-outline');
    rooms.forEach(room => {
        room.style.cursor = 'pointer';
        room.addEventListener('click', (e) => {
            const roomId = e.target.dataset.room;
            if (roomId && roomData[roomId]) {
                openModal(roomData[roomId]);
            }
        });
    });
});

// Open modal function
function openModal(data) {
    modalTitle.textContent = data.name;
    
    // Set image
    if (data.image) {
        modalImage.src = data.image;
        modalImage.alt = data.name;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }
    
    // Set room info
    modalYouthAdult.textContent = data.youthAdult || 'Not specified';
    modalPrimaryKids.textContent = data.primaryKids || 'Not specified';
    modalClasses.textContent = data.classes || 'Not specified';
    modalTeachers.textContent = data.teachers || 'Not specified';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
