const allSideMenu: NodeListOf<HTMLLinkElement> = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach((item: HTMLLinkElement) => {
    const li: HTMLElement | null = item.parentElement;

    if (li) {
        item.addEventListener('click', function (): void {
            allSideMenu.forEach((i: HTMLLinkElement) => {
                const parentLi: HTMLElement | null = i.parentElement;
                if (parentLi) {
                    parentLi.classList.remove('active');
                }
            });
            li.classList.add('active');
        });
    }
});

// TOGGLE SIDEBAR
const menuBar: HTMLElement | null = document.querySelector('#content nav .bx.bx-menu');
const sidebar: HTMLElement | null = document.getElementById('sidebar');

if (menuBar && sidebar) {
    // Sidebar toggle işlemi
    menuBar.addEventListener('click', function (): void {
        sidebar.classList.toggle('hide');
    });

    // Sayfa yüklendiğinde ve boyut değişimlerinde sidebar durumunu ayarlama
    function adjustSidebar(): void {
        if (window.innerWidth <= 576) {
            sidebar.classList.add('hide');  // 576px ve altı için sidebar gizli
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.remove('hide');  // 576px'den büyükse sidebar görünür
            sidebar.classList.add('show');
        }
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde sidebar durumunu ayarlama
    window.addEventListener('load', adjustSidebar);
    window.addEventListener('resize', adjustSidebar);
}


// Arama butonunu toggle etme
const searchButton: HTMLButtonElement | null = document.querySelector('#content nav form .form-input button');
const searchButtonIcon: HTMLElement | null = document.querySelector('#content nav form .form-input button .bx');
const searchForm: HTMLFormElement | null = document.querySelector('#content nav form');

if (searchButton && searchButtonIcon && searchForm) {
    searchButton.addEventListener('click', function (e: MouseEvent): void {
        if (window.innerWidth < 768) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });
}

// Dark Mode Switch
const switchMode: HTMLInputElement | null = document.getElementById('switch-mode') as HTMLInputElement;

if (switchMode) {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark');
        switchMode.checked = true;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        const switchModeElement = document.getElementById('switch-mode') as HTMLInputElement;
        if (switchModeElement) {
            switchModeElement.checked = true;
        }
    }

    switchMode.addEventListener('change', function (): void {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
}

const categoriesLink: HTMLElement | null = document.getElementById('categoriesLink');
const categoriesMenu: HTMLElement | null = document.getElementById('categoriesMenu');

if (categoriesLink && categoriesMenu) {
    categoriesLink.addEventListener('click', function (e: MouseEvent): void {
        e.preventDefault(); // Linkin varsayılan davranışını engelle
        categoriesMenu.classList.toggle('show');

        // Diğer menüleri kapat
        const notificationMenu: HTMLElement | null = document.querySelector('.notification-menu');
        const profileMenu: HTMLElement | null = document.querySelector('.profile-menu');

        if (notificationMenu) {
            notificationMenu.classList.remove('show');
        }
        if (profileMenu) {
            profileMenu.classList.remove('show');
        }
    });

    // Menü dışına tıklandığında menüyü kapat
    window.addEventListener('click', function (e: MouseEvent): void {
        const target = e.target as HTMLElement;
        if (!target.closest('#categoriesLink') && !target.closest('.categories-menu')) {
            categoriesMenu.classList.remove('show');
        }
    });
}


// Notification Menu Toggle
const notificationElement: HTMLElement | null = document.querySelector('.notification');
const notificationMenuElement: HTMLElement | null = document.querySelector('.notification-menu');
const profileMenuElement: HTMLElement | null = document.querySelector('.profile-menu');

if (notificationElement && notificationMenuElement && profileMenuElement) {
    notificationElement.addEventListener('click', function (): void {
        notificationMenuElement.classList.toggle('show');
        profileMenuElement.classList.remove('show'); // Close profile menu if open
    });
}

// Profile Menu Toggle
const profileElement: HTMLElement | null = document.querySelector('.profile');
if (profileElement && profileMenuElement && notificationMenuElement) {
    profileElement.addEventListener('click', function (): void {
        profileMenuElement.classList.toggle('show');
        notificationMenuElement.classList.remove('show'); // Close notification menu if open
    });
}

// Close menus if clicked outside
window.addEventListener('click', function (e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const notificationMenuElement: HTMLElement | null = document.querySelector('.notification-menu');
    const profileMenuElement: HTMLElement | null = document.querySelector('.profile-menu');

    if (notificationMenuElement && profileMenuElement) {
         if (!target.closest('.notification') && !target.closest('.profile')) {
            notificationMenuElement.classList.remove('show');
            profileMenuElement.classList.remove('show');
        }
    }
});

// Menülerin açılıp kapanması için fonksiyon
function toggleMenu(menuId: string): void {
    const contentMenu: HTMLElement | null = document.getElementById(menuId);
    const allMenus: NodeListOf<HTMLElement> = document.querySelectorAll('.content-menu');

    if (contentMenu) {
        // Diğer tüm menüleri kapat
        allMenus.forEach(function (m: HTMLElement): void {
            if (m !== contentMenu) {
                m.style.display = 'none';
            }
        });

        // Tıklanan menü varsa aç, yoksa kapat
        if (contentMenu.style.display === 'none' || contentMenu.style.display === '') {
            contentMenu.style.display = 'block';
        } else {
            contentMenu.style.display = 'none';
        }
    }
}

// Başlangıçta tüm menüleri kapalı tut
document.addEventListener("DOMContentLoaded", function (): void {
    const allMenus: NodeListOf<HTMLElement> = document.querySelectorAll('.content-menu');
    allMenus.forEach(function (contentMenu: HTMLElement): void {
        contentMenu.style.display = 'none';
    });
});

document.querySelectorAll('.todo-list li').forEach(function (item: HTMLElement): void {
    const progress: string | null = item.getAttribute('data-progress'); // 'data-progress' attribute'u alınıyor
    if (progress !== null) {
        item.style.setProperty('--progress-width', progress + '%'); // Dinamik olarak CSS değişkeni ayarlanıyor
    }
});

document.querySelectorAll('.menu-icon').forEach(function (icon: HTMLElement): void {
    icon.addEventListener('click', function (e: MouseEvent): void {
        // Menü öğesinin görünürlük durumunu değiştir
        const menu: HTMLElement | null = icon.querySelector('.content-menu');
        
        if (menu) {
            const isVisible: boolean = menu.style.display === 'block';

            // Diğer menüler kapalıysa sadece tıklanan menüyü aç
            document.querySelectorAll('.content-menu').forEach(function (otherMenu: HTMLElement): void {
                if (otherMenu !== menu) {
                    otherMenu.style.display = 'none';
                }
            });

            // Menü görünürse gizle, değilse göster
            menu.style.display = isVisible ? 'none' : 'block';

            // Tıklama olayının başka yerlere yayılmasını engelle
            e.stopPropagation();
        }
    });
});

// Menü dışında bir yere tıklanınca menüyü kapatma
document.addEventListener('click', function (): void {
    document.querySelectorAll('.content-menu').forEach(function (menu: HTMLElement): void {
        menu.style.display = 'none';
    });
});

function filterTodos(status: string): void {
    const todos: NodeListOf<HTMLElement> = document.querySelectorAll('.todo-list li');
    todos.forEach((todo: HTMLElement) => {
        if (status === 'all' || (status === 'completed' && todo.classList.contains('completed')) || (status === 'pending' && todo.classList.contains('not-completed'))) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
}

document.querySelectorAll('.notification-menu li').forEach((notification: HTMLLIElement) => {
    notification.addEventListener('click', function (): void {
        this.classList.add('read');
        updateNotificationCount();
    });
});

function updateNotificationCount(): void {
    const unreadNotifications: number = document.querySelectorAll('.notification-menu li:not(.read)').length;
    const notificationNumElement: HTMLElement | null = document.querySelector('.notification .num');
    if (notificationNumElement) {
        notificationNumElement.textContent = unreadNotifications.toString();
    }
}

const searchUserInput: HTMLInputElement | null = document.getElementById('searchUser') as HTMLInputElement;
const filterStatusSelect: HTMLSelectElement | null = document.getElementById('filterStatus') as HTMLSelectElement;

if (searchUserInput) {
    searchUserInput.addEventListener('input', filterOrders);
}
if (filterStatusSelect) {
    filterStatusSelect.addEventListener('change', filterOrders);
}


function filterOrders(): void {
    const searchText: string = (document.getElementById('searchUser') as HTMLInputElement)?.value.toLowerCase() || '';
    const statusFilter: string = (document.getElementById('filterStatus') as HTMLSelectElement)?.value || 'all';

    document.querySelectorAll('.order table tbody tr').forEach((row: HTMLTableRowElement) => {
        const userElement: HTMLSpanElement | null = row.querySelector('td:nth-child(2) span');
        const statusElement: HTMLSpanElement | null = row.querySelector('td:nth-child(4) .status');

        if (userElement && statusElement) {
            const user: string = userElement.textContent?.toLowerCase() || '';
            const status: string = statusElement.textContent?.toLowerCase() || '';

            const matchesSearch: boolean = user.includes(searchText);
            const matchesStatus: boolean = statusFilter === 'all' || status === statusFilter;

            if (matchesSearch && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}