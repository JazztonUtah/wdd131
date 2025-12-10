// Room data - Add your images and info here
const roomData = {
    'chapel': {
        name: 'Chapel',
        image: 'images/chapel.jpeg',
        youthAdult: 'Recommended: 200',
        primaryKids: 'N/A',
        classes: 'Sacrament Meeting',
        teachers: 'N/A'
    },
    'overflow-1': {
        name: 'Overflow 1',
        image: 'images/overflow1.jpeg',
        youthAdult: 'Recommended: 100',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'overflow-2': {
        name: 'Overflow 2',
        image: 'images/overflow2.jpeg',
        youthAdult: 'Recommended: 50',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'room-107': {
        name: 'Room 107',
        image: 'images/107.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: '',
        teachers: ''
    },
    'room-108': {
        name: 'Room 108',
        image: 'images/108.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: '',
        teachers: ''
    },
    'bathroom': {
        name: 'Bathroom',
        image: 'images/washroom.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'north-foyer': {
        name: 'North Foyer',
        image: 'images/northfoyer.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: '',
        teachers: ''
    },
    'south-foyer': {
        name: 'South Foyer',
        image: 'images/southfoyer.jpeg',
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
        image: 'images/RS.jpeg',
        youthAdult: '50 adults',
        primaryKids: '60 kids',
        classes: 'Relief Society',
        teachers: ''
    },
    'primary-room': {
        name: 'Primary Room',
        image: 'images/primary.jpeg',
        youthAdult: '50 adults',
        primaryKids: '60 kids',
        classes: 'Primary',
        teachers: ''
    },
    'bishop-nw': {
        name: 'Bishop Office (Our Ward)',
        image: 'images/ourbishop.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-nw': {
        name: 'Clerk Office (Our Ward)',
        image: 'images/ourclerk.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'bishop-nw-2': {
        name: 'Bishop Office',
        image: 'images/bishopnorth.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-nw-2': {
        name: 'Clerk Office',
        image: 'images/clerknorth.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'room-101': {
        name: 'Room 101',
        image: 'images/101.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'room-102': {
        name: 'Room 102',
        image: 'images/102.jpeg',
        youthAdult: '6 adults',
        primaryKids: '8 kids',
        classes: '',
        teachers: ''
    },
    'room-103': {
        name: 'Room 103',
        image: 'images/103.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'bathroom-north': {
        name: 'Bathroom',
        image: 'images/washroom.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'custodial': {
        name: 'Custodial Closet',
        image: 'images/custodial.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'storage': {
        name: 'Table Storage',
        image: 'images/storage.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'kitchen': {
        name: 'Kitchen',
        image: 'images/kitchen.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: ''
    },
    'room-104': {
        name: 'Room 104',
        image: 'images/104.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: '',
        teachers: ''
    },
    'room-105': {
        name: 'Room 105',
        image: 'images/105.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: '',
        teachers: ''
    },
    'room-106': {
        name: 'Room 106',
        image: 'images/106.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: '',
        teachers: ''
    },
    'mothers': {
        name: "Mother's Room",
        image: 'images/mothers.jpeg',
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
        image: 'images/115.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'room-114': {
        name: 'Room 114',
        image: 'images/114.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'room-113': {
        name: 'Room 113',
        image: 'images/113.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'room-112': {
        name: 'Room 112',
        image: 'images/112.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: '',
        teachers: ''
    },
    'nursery': {
        name: 'Nursery',
        image: 'images/nursery.jpeg',
        youthAdult: 'N/A',
        primaryKids: '14 kids',
        classes: 'Nursery',
        teachers: ''
    },
    'room-109': {
        name: 'Room 109',
        image: 'images/109.jpeg',
        youthAdult: '6 adults',
        primaryKids: '8 kids',
        classes: '',
        teachers: ''
    },
    'bishop-sw': {
        name: 'Bishop Office',
        image: 'images/bishopsouth.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Bishop Meetings',
        teachers: ''
    },
    'clerk-sw': {
        name: 'Clerk Office',
        image: 'images/clerksouth.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'Clerk Duties',
        teachers: ''
    },
    'old-hp-room': {
        name: 'Room 116 & 117',
        image: 'images/116.jpeg',
        youthAdult: '16 adults',
        primaryKids: '20 kids',
        classes: '',
        teachers: '',
        note: 'are the same room and cannot be split.'
    },
    'room-116': {
        name: 'Room 116',
        image: 'images/clk.jpeg',
        youthAdult: '',
        primaryKids: '',
        classes: '',
        teachers: ''
    },
    'room-117': {
        name: 'Room 117',
        image: 'images/ysa.jpeg',
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
    if (data.note) {
        modalTitle.innerHTML = data.name + ' <span class="modal-note-inline">- ' + data.note + '</span>';
    } else {
        modalTitle.textContent = data.name;
    }
    
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
