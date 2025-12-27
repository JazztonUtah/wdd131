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
        youthAdult: '50 Adults',
        primaryKids: 'N/A',
        classes: 'Elders Quorum & Adult SS',
        teachers: 'Chad Staleli & Jared Hawkins, Eric Burton & John Coleman'
    },
    'room-107-108': {
        name: '2nd Nursery',
        image: 'images/2ndNursery.jpeg',
        youthAdult: 'N/A',
        primaryKids: '20 kids',
        classes: 'Nursery',
        teachers: 'Sister Chavez, Davis, Gossett & Manasco',
        note: '107 & 108 are 2 rooms and can be split.'
    },
    'bathroom': {
        name: 'Bathroom',
        image: 'images/bathroom.jpeg',
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
        image: 'images/east foyer.jpeg',
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
        youthAdult: '10 Adults',
        primaryKids: '12 Kids',
        classes: 'Priests',
        teachers: 'Preist Quorum Leaders'
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
        classes: 'CTR 5B & Valiant 9',
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
        classes: 'CTR 6 & Valiant 10',
        teachers: ''
    },
    'bathroom-north': {
        name: 'Bathroom',
        image: 'images/BR.jpeg',
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
        classes: 'YW &11 SS',
        teachers: 'YW Leaders,11 SS Teachers'
    },
    'room-105': {
        name: 'Room 105',
        image: 'images/105.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'YW & 14-15 SS',
        teachers: 'YW Leaders, Brother & Sister Frank'
    },
    'room-106': {
        name: 'Room 106',
        image: 'images/106.jpeg',
        youthAdult: '14 adults',
        primaryKids: '16 kids',
        classes: 'YW & 12-14 SS',
        teachers: 'YW Leaders, Brother & Sister Dean'
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
        classes: 'Deacons Quorum',
        teachers: 'Deacons Quorum Leaders'
    },
    'room-114': {
        name: 'Room 114',
        image: 'images/114.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'Teachers Quorum',
        teachers: 'Teachers Quorum Leaders'
    },
    'room-113': {
        name: 'Room 113',
        image: 'images/113.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'CTR 5A & Valiant 8',
        teachers: ''
    },
    'room-112': {
        name: 'Room 112',
        image: 'images/112.jpeg',
        youthAdult: '10 adults',
        primaryKids: '12 kids',
        classes: 'CTR 4 & 7',
        teachers: ''
    },
    'nursery': {
        name: 'Nursery',
        image: 'images/nursery.jpeg',
        youthAdult: 'N/A',
        primaryKids: '20 kids',
        classes: 'Nursery',
        teachers: 'Sister Chavez, Davis, Gossett & Manasco',
        note: '111 & 110 are the same room and can be split.'
    },
    'room-109': {
        name: 'Room 109',
        image: 'images/109.jpeg',
        youthAdult: '6 adults',
        primaryKids: '8 kids',
        classes: 'Sunbeams',
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
        youthAdult: '18 Adults',
        primaryKids: '20 kids',
        classes: '16-18 SS',
        teachers: '16-18 SS Teachers',
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
    
    // Setup PDF download button
    setupPdfDownload();
});

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Reset zoom on mobile by resetting viewport
function resetMobileZoom() {
    if (isMobile() && window.visualViewport) {
        // Scroll to top-left to reset viewport position
        window.scrollTo(0, 0);
        // Reset any transforms
        document.body.style.transform = '';
        document.body.style.zoom = '';
    }
}

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
    
    // On mobile, reset zoom before opening modal
    if (isMobile()) {
        resetMobileZoom();
    }
    
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
    ymYw: [],
    eqRs: []
};

// Calculate and display room totals
function calculateRoomTotals() {
    let primaryCount = 0;
    let ssCount = 0;
    let ymYwCount = 0;
    let eqRsCount = 0;

    // Reset categories
    roomCategories.primary = [];
    roomCategories.ss = [];
    roomCategories.ymYw = [];
    roomCategories.eqRs = [];

    // Count rooms by their classes and store room IDs
    Object.entries(roomData).forEach(([roomId, room]) => {
        const classes = room.classes || '';
        const classesLower = classes.toLowerCase();

        // Count Primary rooms (including Nursery, CTR, Valiant, and Sunbeams)
        if (classesLower.includes('primary') || classesLower.includes('priamry') || 
            classesLower.includes('nursery') || classesLower.includes('ctr') || 
            classesLower.includes('valiant') || classesLower.includes('sunbeams')) {
            primaryCount++;
            roomCategories.primary.push(roomId);
        }

        // Count SS (Sunday School) rooms - match "SS" as standalone word, not part of "classes"
        if (/\bss\b/i.test(classes)) {
            ssCount++;
            roomCategories.ss.push(roomId);
        }

        // Count EQ & RS rooms (Elders Quorum and Relief Society)
        // Note: "Elders Quroum" is misspelled in the data, so we check for "elders" and "quroum"
        if (classesLower.includes('elders') || classesLower.includes('quroum') || 
            classesLower.includes('relief society') || roomId === 'rs-room') {
            eqRsCount++;
            roomCategories.eqRs.push(roomId);
        }

        // Count YM & YW rooms (excluding Elders Quorum)
        if (classesLower.includes('yw') || 
            (classesLower.includes('quorum') && !classesLower.includes('elders')) || 
            classesLower.includes('teachers') || classesLower.includes('deacons') || 
            classesLower.includes('priests')) {
            ymYwCount++;
            roomCategories.ymYw.push(roomId);
        }
    });

    // Update the display
    document.getElementById('totalPrimary').textContent = primaryCount;
    document.getElementById('totalSS').textContent = ssCount;
    document.getElementById('totalYMYW').textContent = ymYwCount;
    document.getElementById('totalEQRS').textContent = eqRsCount;
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
    
    const eqRsItem = document.getElementById('totalEQRS').closest('.total-item');
    if (eqRsItem) {
        eqRsItem.style.cursor = 'pointer';
        eqRsItem.setAttribute('data-category', 'eqRs');
        eqRsItem.addEventListener('click', handleClick('eqRs', eqRsItem));
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
    
    // Sort rooms by name, but put "N/A" classes at the bottom
    let sortedRooms = Object.entries(roomData).sort((a, b) => {
        const aClasses = (a[1].classes || '').trim().toUpperCase();
        const bClasses = (b[1].classes || '').trim().toUpperCase();
        const aIsNA = aClasses === 'N/A' || aClasses === '';
        const bIsNA = bClasses === 'N/A' || bClasses === '';
        
        // If one is N/A and the other isn't, N/A goes to bottom
        if (aIsNA && !bIsNA) return 1;
        if (!aIsNA && bIsNA) return -1;
        
        // Otherwise sort alphabetically by name
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
        nameCell.setAttribute('data-label', 'Room Name');
        if (room.note) {
            nameCell.innerHTML = `${room.name} <span class="table-note">- ${room.note}</span>`;
        } else {
            nameCell.textContent = room.name;
        }
        row.appendChild(nameCell);
        
        // Classes
        const classesCell = document.createElement('td');
        classesCell.setAttribute('data-label', 'Classes');
        classesCell.textContent = room.classes || 'N/A';
        row.appendChild(classesCell);
        
        // Teachers
        const teachersCell = document.createElement('td');
        teachersCell.setAttribute('data-label', 'Teachers');
        teachersCell.textContent = room.teachers || 'N/A';
        row.appendChild(teachersCell);
        
        // Youth/Adults
        const youthAdultCell = document.createElement('td');
        youthAdultCell.setAttribute('data-label', 'Youth/Adults');
        youthAdultCell.textContent = room.youthAdult || 'N/A';
        row.appendChild(youthAdultCell);
        
        // Primary Kids
        const primaryKidsCell = document.createElement('td');
        primaryKidsCell.setAttribute('data-label', 'Primary Kids');
        primaryKidsCell.textContent = room.primaryKids || 'N/A';
        row.appendChild(primaryKidsCell);
        
        // View Picture button
        const pictureCell = document.createElement('td');
        pictureCell.setAttribute('data-label', 'Picture');
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
    
    // On mobile, reset zoom before opening modal
    if (isMobile()) {
        resetMobileZoom();
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

// Setup PDF Download functionality
function setupPdfDownload() {
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', async () => {
            try {
                // Show loading state
                downloadPdfBtn.textContent = 'Generating PDF...';
                downloadPdfBtn.disabled = true;
                
                // Get the table element
                const table = document.querySelector('.rooms-table');
                const tableContainer = document.querySelector('.table-view-container');
                
                if (!table) {
                    alert('Table not found');
                    return;
                }
                
                // Get the active filter to include in filename
                const activeFilter = document.querySelector('.filter-btn.active');
                const filterName = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
                const filterLabel = activeFilter ? activeFilter.textContent.trim() : 'All Rooms';
                
                // Temporarily modify table styling for PDF (remove shadows/borders)
                const originalBoxShadow = table.style.boxShadow;
                const originalBorderRadius = table.style.borderRadius;
                const originalBorder = table.style.border;
                table.style.boxShadow = 'none';
                table.style.borderRadius = '0';
                table.style.border = 'none';
                
                // Use html2canvas to capture the table
                const canvas = await html2canvas(table, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true,
                    removeContainer: false,
                    windowWidth: table.scrollWidth,
                    windowHeight: table.scrollHeight,
                    x: 0,
                    y: 0
                });
                
                // Restore original styling
                table.style.boxShadow = originalBoxShadow;
                table.style.borderRadius = originalBorderRadius;
                table.style.border = originalBorder;
                
                // Use the canvas directly
                const croppedCanvas = canvas;
                
                // Create PDF using jsPDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4'
                });
                
                // Calculate dimensions
                const imgWidth = 297; // A4 width in mm (landscape)
                const imgHeight = (croppedCanvas.height * imgWidth) / croppedCanvas.width;
                
                // Add image to PDF - start at top with no margin
                const imgData = croppedCanvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                
                // Generate filename
                const filename = `East_Bench_Chapel_${filterLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
                
                // Save PDF
                pdf.save(filename);
                
                // Reset button
                downloadPdfBtn.textContent = 'Download PDF';
                downloadPdfBtn.disabled = false;
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again.');
                downloadPdfBtn.textContent = 'Download PDF';
                downloadPdfBtn.disabled = false;
            }
        });
    }
}

