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
        classes: 'N/A',
        teachers: ''
    },
    'overflow-2': {
        name: 'Overflow 2',
        image: 'images/overflow2.jpeg',
        youthAdult: 'Recommended: 50',
        primaryKids: 'N/A',
        classes: 'Teachers and Deacons Quorum',
        teachers: 'Teachers and Deacons Leaders'
    },
    'room-107': {
        name: 'Room 107',
        image: 'images/107.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'Older YW & 14-15 SS',
        teachers: '15-18 YW Leaders, Brother & Sister Frank'
    },
    'room-108': {
        name: 'Room 108',
        image: 'images/108.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'Younger YW & 12-14 SS',
        teachers: '12-14 YW Leaders, Brother & Sister Dean'
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
        classes: 'N/A',
        teachers: 'N/A'
    },
    'south-foyer': {
        name: 'South Foyer',
        image: 'images/southfoyer.jpeg',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'east-foyer': {
        name: 'East Foyer',
        image: '',
        youthAdult: 'N/A',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'rs-room': {
        name: 'RS Room',
        image: 'images/RS.jpeg',
        youthAdult: '50 adults',
        primaryKids: '60 kids',
        classes: 'Relief Society & Adult SS',
        teachers: 'Aubrey Haws & Michelle Ybarra, Eric Burton & John Coleman'
    },
    'primary-room': {
        name: 'Primary Room',
        image: 'images/primary.jpeg',
        youthAdult: '50 adults',
        primaryKids: '60 kids',
        classes: 'Primary',
        teachers: 'Primary Presidency & Music Leaders'
    },
    'bishop-nw': {
        name: 'Bishop Office (Our Ward)',
        image: 'images/ourbishop.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'Priests & 16-18 SS',
        teachers: 'Preist Quorum Leaders & Brother & Sister Facer'
    },
    'clerk-nw': {
        name: 'Clerk Office (Our Ward)',
        image: 'images/ourclerk.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'bishop-nw-2': {
        name: 'Bishop Office',
        image: 'images/bishopnorth.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'clerk-nw-2': {
        name: 'Clerk Office',
        image: 'images/clerknorth.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'room-101': {
        name: 'Room 101',
        image: 'images/101.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Priamry Class',
        teachers: ''
    },
    'room-102': {
        name: 'Room 102',
        image: 'images/102.jpeg',
        youthAdult: '6 adults',
        primaryKids: '8 kids',
        classes: 'Smaller Priamry Class',
        teachers: ''
    },
    'room-103': {
        name: 'Room 103',
        image: 'images/103.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Priamry Class',
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
        teachers: 'N/A'
    },
    'room-104': {
        name: 'Room 104',
        image: 'images/104.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'room-105': {
        name: 'Room 105',
        image: 'images/105.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'room-106': {
        name: 'Room 106',
        image: 'images/106.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'Primary Class',
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
        classes: 'Primary Class',
        teachers: ''
    },
    'room-114': {
        name: 'Room 114',
        image: 'images/114.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'room-113': {
        name: 'Room 113',
        image: 'images/113.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'room-112': {
        name: 'Room 112',
        image: 'images/112.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'nursery': {
        name: 'Nursery',
        image: 'images/nursery.jpeg',
        youthAdult: 'N/A',
        primaryKids: '14 kids',
        classes: 'Nursery',
        teachers: 'Sister Chavez, Davis, Gossett & Manasco'
    },
    'room-109': {
        name: 'Room 109',
        image: 'images/109.jpeg',
        youthAdult: '6 adults',
        primaryKids: '8 kids',
        classes: 'Primary Class',
        teachers: ''
    },
    'bishop-sw': {
        name: 'Bishop Office',
        image: 'images/bishopsouth.jpeg',
        youthAdult: '2-5',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'clerk-sw': {
        name: 'Clerk Office',
        image: 'images/clerksouth.jpeg',
        youthAdult: '2-4',
        primaryKids: 'N/A',
        classes: 'N/A',
        teachers: 'N/A'
    },
    'old-hp-room': {
        name: 'Room 116 & 117',
        image: 'images/116.jpeg',
        youthAdult: '16 adults',
        primaryKids: '20 kids',
        classes: 'Elders Quroum',
        teachers: 'Chad Staleli & Jared Hawkins',
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
const viewToggleBtn = document.getElementById('viewToggleBtn');
const floorPlanContainer = document.getElementById('floorPlanContainer');
const tableViewContainer = document.getElementById('tableViewContainer');
const roomsTableBody = document.getElementById('roomsTableBody');
const imageModal = document.getElementById('imageModal');
const imageModalImage = document.getElementById('imageModalImage');
const imageModalNoImage = document.getElementById('imageModalNoImage');

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
    
    // Calculate and display room totals
    calculateRoomTotals();
    
    // Setup category click handlers
    setupCategoryClicks();
    
    // Setup view toggle
    setupViewToggle();
    
    // Generate table view
    generateTableView();
    
    // Setup table filters
    setupTableFilters();
    
    // Setup image modal
    setupImageModal();
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
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            closeModal();
        }
        if (imageModal && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    }
});

// Store room categories for highlighting
let roomCategories = {
    primary: [],
    ss: [],
    ymYw: []
};

// Calculate and display room totals
function calculateRoomTotals() {
    let primaryCount = 0;
    let ssCount = 0;
    let ymYwCount = 0;

    // Reset categories
    roomCategories.primary = [];
    roomCategories.ss = [];
    roomCategories.ymYw = [];

    // Count rooms by their classes and store room IDs
    Object.entries(roomData).forEach(([roomId, room]) => {
        const classes = room.classes || '';
        const classesLower = classes.toLowerCase();

        // Count Primary rooms (including Nursery)
        if (classesLower.includes('primary') || classesLower.includes('priamry') || classesLower.includes('nursery')) {
            primaryCount++;
            roomCategories.primary.push(roomId);
        }

        // Count SS (Sunday School) rooms - match "SS" as standalone word, not part of "classes"
        if (/\bss\b/i.test(classes)) {
            ssCount++;
            roomCategories.ss.push(roomId);
        }

        // Count YM & YW rooms
        if (classesLower.includes('yw') || classesLower.includes('quorum') || 
            classesLower.includes('teachers') || classesLower.includes('deacons') || 
            classesLower.includes('priests') || classesLower.includes('elders')) {
            ymYwCount++;
            roomCategories.ymYw.push(roomId);
        }
    });

    // Update the display
    document.getElementById('totalPrimary').textContent = primaryCount;
    document.getElementById('totalSS').textContent = ssCount;
    document.getElementById('totalYMYW').textContent = ymYwCount;
}

// Highlight rooms by category
function highlightRooms(category, isActive) {
    const roomIds = roomCategories[category] || [];
    
    roomIds.forEach(roomId => {
        const roomElement = document.querySelector(`[data-room="${roomId}"]`);
        if (roomElement) {
            // Highlight the room rectangle
            if (isActive) {
                roomElement.classList.add('room-highlighted');
            } else {
                roomElement.classList.remove('room-highlighted');
            }
            
            // Find and highlight all associated text labels
            try {
                const svg = roomElement.closest('svg');
                if (svg) {
                    const roomRect = roomElement.getBBox();
                    const allTexts = svg.querySelectorAll('text');
                    
                    allTexts.forEach(text => {
                        try {
                            const textRect = text.getBBox();
                            // Check if text center is within or near the room bounds
                            const textCenterX = textRect.x + textRect.width / 2;
                            const textCenterY = textRect.y + textRect.height / 2;
                            
                            // Check if text is within room bounds (with small margin for nearby text)
                            const margin = 5;
                            if (textCenterX >= roomRect.x - margin && 
                                textCenterX <= roomRect.x + roomRect.width + margin &&
                                textCenterY >= roomRect.y - margin && 
                                textCenterY <= roomRect.y + roomRect.height + margin) {
                                
                                if (isActive) {
                                    text.classList.add('room-label-highlighted');
                                } else {
                                    text.classList.remove('room-label-highlighted');
                                }
                            }
                        } catch (e) {
                            // Skip if getBBox fails for this text element
                        }
                    });
                }
            } catch (e) {
                // Skip if getBBox fails for room element
            }
        }
    });
}

// Handle category clicks
function setupCategoryClicks() {
    let activeCategory = null;
    
    const primaryItem = document.getElementById('totalPrimary').closest('.total-item');
    const ssItem = document.getElementById('totalSS').closest('.total-item');
    const ymYwItem = document.getElementById('totalYMYW').closest('.total-item');
    
    function handleClick(category, item) {
        return () => {
            // If clicking the same category, toggle it off
            if (activeCategory === category) {
                highlightRooms(category, false);
                activeCategory = null;
                item.classList.remove('total-item-active');
            } else {
                // Remove previous highlight
                if (activeCategory) {
                    highlightRooms(activeCategory, false);
                    const prevItem = document.querySelector(`[data-category="${activeCategory}"]`);
                    if (prevItem) prevItem.classList.remove('total-item-active');
                }
                
                // Add new highlight
                highlightRooms(category, true);
                activeCategory = category;
                item.classList.add('total-item-active');
            }
        };
    }
    
    if (primaryItem) {
        primaryItem.style.cursor = 'pointer';
        primaryItem.setAttribute('data-category', 'primary');
        primaryItem.addEventListener('click', handleClick('primary', primaryItem));
    }
    
    if (ssItem) {
        ssItem.style.cursor = 'pointer';
        ssItem.setAttribute('data-category', 'ss');
        ssItem.addEventListener('click', handleClick('ss', ssItem));
    }
    
    if (ymYwItem) {
        ymYwItem.style.cursor = 'pointer';
        ymYwItem.setAttribute('data-category', 'ymYw');
        ymYwItem.addEventListener('click', handleClick('ymYw', ymYwItem));
    }
}

// View Toggle Functionality
function setupViewToggle() {
    let isTableView = false;
    const instructionText = document.querySelector('.instruction');
    
    viewToggleBtn.addEventListener('click', () => {
        isTableView = !isTableView;
        
        if (isTableView) {
            // Switch to table view
            floorPlanContainer.style.display = 'none';
            tableViewContainer.style.display = 'block';
            viewToggleBtn.textContent = 'Floor Plan View';
            if (instructionText) {
                instructionText.style.display = 'none';
            }
        } else {
            // Switch to floor plan view
            floorPlanContainer.style.display = 'block';
            tableViewContainer.style.display = 'none';
            viewToggleBtn.textContent = 'Table View';
            if (instructionText) {
                instructionText.style.display = 'block';
            }
        }
    });
}

// Generate Table View from roomData
function generateTableView(filter = 'all') {
    // Clear existing rows
    roomsTableBody.innerHTML = '';
    
    // Sort rooms by name for better organization
    let sortedRooms = Object.entries(roomData).sort((a, b) => {
        return a[1].name.localeCompare(b[1].name);
    });
    
    // Apply filter
    if (filter !== 'all') {
        const filteredRoomIds = roomCategories[filter] || [];
        sortedRooms = sortedRooms.filter(([roomId]) => filteredRoomIds.includes(roomId));
    }
    
    // Generate table rows
    sortedRooms.forEach(([roomId, room]) => {
        const row = document.createElement('tr');
        row.setAttribute('data-room-id', roomId);
        
        // Room Name (with note if available)
        const nameCell = document.createElement('td');
        if (room.note) {
            nameCell.innerHTML = `${room.name} <span class="table-note">- ${room.note}</span>`;
        } else {
            nameCell.textContent = room.name;
        }
        row.appendChild(nameCell);
        
        // Youth/Adults
        const youthAdultCell = document.createElement('td');
        youthAdultCell.textContent = room.youthAdult || 'N/A';
        row.appendChild(youthAdultCell);
        
        // Primary Kids
        const primaryKidsCell = document.createElement('td');
        primaryKidsCell.textContent = room.primaryKids || 'N/A';
        row.appendChild(primaryKidsCell);
        
        // Classes
        const classesCell = document.createElement('td');
        classesCell.textContent = room.classes || 'N/A';
        row.appendChild(classesCell);
        
        // Teachers
        const teachersCell = document.createElement('td');
        teachersCell.textContent = room.teachers || 'N/A';
        row.appendChild(teachersCell);
        
        // View Picture button
        const pictureCell = document.createElement('td');
        if (room.image) {
            const viewBtn = document.createElement('button');
            viewBtn.className = 'view-picture-btn';
            viewBtn.textContent = 'View Picture';
            viewBtn.addEventListener('click', () => {
                openImageModal(room);
            });
            pictureCell.appendChild(viewBtn);
        } else {
            pictureCell.textContent = 'No image';
            pictureCell.style.color = 'var(--text-light)';
            pictureCell.style.fontStyle = 'italic';
        }
        row.appendChild(pictureCell);
        
        roomsTableBody.appendChild(row);
    });
}

// Open image-only modal
function openImageModal(room) {
    if (room.image) {
        imageModalImage.src = room.image;
        imageModalImage.alt = room.name;
        imageModalImage.style.display = 'block';
        imageModalNoImage.style.display = 'none';
    } else {
        imageModalImage.style.display = 'none';
        imageModalNoImage.style.display = 'block';
    }
    
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close image modal
function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup image modal
function setupImageModal() {
    if (imageModal) {
        const imageModalCloseBtn = imageModal.querySelector('.close-btn');
        if (imageModalCloseBtn) {
            imageModalCloseBtn.addEventListener('click', closeImageModal);
        }
        
        // Close modal when clicking outside content
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key (shared handler with main modal)
    // The existing Escape handler will work for both modals
}

// Setup table filters
function setupTableFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Regenerate table with filter
            generateTableView(filter);
        });
    });
}

