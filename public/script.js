var allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
allSideMenu.forEach(function (item) {
    var li = item.parentElement;
    if (li) {
        item.addEventListener('click', function () {
            allSideMenu.forEach(function (i) {
                var parentLi = i.parentElement;
                if (parentLi) {
                    parentLi.classList.remove('active');
                }
            });
            li.classList.add('active');
        });
    }
});
// TOGGLE SIDEBAR
var menuBar = document.querySelector('#content nav .bx.bx-menu');
var sidebar = document.getElementById('sidebar');
if (menuBar && sidebar) {
    // Sidebar toggle işlemi
    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });
    // Sayfa yüklendiğinde ve boyut değişimlerinde sidebar durumunu ayarlama
    function adjustSidebar() {
        if (window.innerWidth <= 576) {
            sidebar.classList.add('hide'); // 576px ve altı için sidebar gizli
            sidebar.classList.remove('show');
        }
        else {
            sidebar.classList.remove('hide'); // 576px'den büyükse sidebar görünür
            sidebar.classList.add('show');
        }
    }
    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde sidebar durumunu ayarlama
    window.addEventListener('load', adjustSidebar);
    window.addEventListener('resize', adjustSidebar);
}
// Arama butonunu toggle etme
var searchButton = document.querySelector('#content nav form .form-input button');
var searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
var searchForm = document.querySelector('#content nav form');
if (searchButton && searchButtonIcon && searchForm) {
    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            }
            else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });
}
// Dark Mode Switch
var switchMode = document.getElementById('switch-mode');
if (switchMode) {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark');
        switchMode.checked = true;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        var switchModeElement = document.getElementById('switch-mode');
        if (switchModeElement) {
            switchModeElement.checked = true;
        }
    }
    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');
        }
        else {
            document.body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
}
var categoriesLink = document.getElementById('categoriesLink');
var categoriesMenu = document.getElementById('categoriesMenu');
if (categoriesLink && categoriesMenu) {
    categoriesLink.addEventListener('click', function (e) {
        e.preventDefault(); // Linkin varsayılan davranışını engelle
        categoriesMenu.classList.toggle('show');
        // Diğer menüleri kapat
        var notificationMenu = document.querySelector('.notification-menu');
        var profileMenu = document.querySelector('.profile-menu');
        if (notificationMenu) {
            notificationMenu.classList.remove('show');
        }
        if (profileMenu) {
            profileMenu.classList.remove('show');
        }
    });
    // Menü dışına tıklandığında menüyü kapat
    window.addEventListener('click', function (e) {
        var target = e.target;
        if (!target.closest('#categoriesLink') && !target.closest('.categories-menu')) {
            categoriesMenu.classList.remove('show');
        }
    });
}
// Notification Menu Toggle
var notificationElement = document.querySelector('.notification');
var notificationMenuElement = document.querySelector('.notification-menu');
var profileMenuElement = document.querySelector('.profile-menu');
if (notificationElement && notificationMenuElement && profileMenuElement) {
    notificationElement.addEventListener('click', function () {
        notificationMenuElement.classList.toggle('show');
        profileMenuElement.classList.remove('show'); // Close profile menu if open
    });
}
// Profile Menu Toggle
var profileElement = document.querySelector('.profile');
if (profileElement && profileMenuElement && notificationMenuElement) {
    profileElement.addEventListener('click', function () {
        profileMenuElement.classList.toggle('show');
        notificationMenuElement.classList.remove('show'); // Close notification menu if open
    });
}
// Close menus if clicked outside
window.addEventListener('click', function (e) {
    var target = e.target;
    var notificationMenuElement = document.querySelector('.notification-menu');
    var profileMenuElement = document.querySelector('.profile-menu');
    if (notificationMenuElement && profileMenuElement) {
        if (!target.closest('.notification') && !target.closest('.profile')) {
            notificationMenuElement.classList.remove('show');
            profileMenuElement.classList.remove('show');
        }
    }
});
// Menülerin açılıp kapanması için fonksiyon
function toggleMenu(menuId) {
    var contentMenu = document.getElementById(menuId);
    var allMenus = document.querySelectorAll('.content-menu');
    if (contentMenu) {
        // Diğer tüm menüleri kapat
        allMenus.forEach(function (m) {
            if (m !== contentMenu) {
                m.style.display = 'none';
            }
        });
        // Tıklanan menü varsa aç, yoksa kapat
        if (contentMenu.style.display === 'none' || contentMenu.style.display === '') {
            contentMenu.style.display = 'block';
        }
        else {
            contentMenu.style.display = 'none';
        }
    }
}
// Başlangıçta tüm menüleri kapalı tut
document.addEventListener("DOMContentLoaded", function () {
    var allMenus = document.querySelectorAll('.content-menu');
    allMenus.forEach(function (contentMenu) {
        contentMenu.style.display = 'none';
    });
});
document.querySelectorAll('.todo-list li').forEach(function (item) {
    var progress = item.getAttribute('data-progress'); // 'data-progress' attribute'u alınıyor
    if (progress !== null) {
        item.style.setProperty('--progress-width', progress + '%'); // Dinamik olarak CSS değişkeni ayarlanıyor
    }
});
document.querySelectorAll('.menu-icon').forEach(function (icon) {
    icon.addEventListener('click', function (e) {
        // Menü öğesinin görünürlük durumunu değiştir
        var menu = icon.querySelector('.content-menu');
        if (menu) {
            var isVisible = menu.style.display === 'block';
            // Diğer menüler kapalıysa sadece tıklanan menüyü aç
            document.querySelectorAll('.content-menu').forEach(function (otherMenu) {
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
document.addEventListener('click', function () {
    document.querySelectorAll('.content-menu').forEach(function (menu) {
        menu.style.display = 'none';
    });
});
function filterTodos(status) {
    var todos = document.querySelectorAll('.todo-list li');
    todos.forEach(function (todo) {
        if (status === 'all' || (status === 'completed' && todo.classList.contains('completed')) || (status === 'pending' && todo.classList.contains('not-completed'))) {
            todo.style.display = 'flex';
        }
        else {
            todo.style.display = 'none';
        }
    });
}
document.querySelectorAll('.notification-menu li').forEach(function (notification) {
    notification.addEventListener('click', function () {
        this.classList.add('read');
        updateNotificationCount();
    });
});
function updateNotificationCount() {
    var unreadNotifications = document.querySelectorAll('.notification-menu li:not(.read)').length;
    var notificationNumElement = document.querySelector('.notification .num');
    if (notificationNumElement) {
        notificationNumElement.textContent = unreadNotifications.toString();
    }
}
var searchUserInput = document.getElementById('searchUser');
var filterStatusSelect = document.getElementById('filterStatus');
if (searchUserInput) {
    searchUserInput.addEventListener('input', filterOrders);
}
if (filterStatusSelect) {
    filterStatusSelect.addEventListener('change', filterOrders);
}
function filterOrders() {
    var _a, _b;
    var searchText = ((_a = document.getElementById('searchUser')) === null || _a === void 0 ? void 0 : _a.value.toLowerCase()) || '';
    var statusFilter = ((_b = document.getElementById('filterStatus')) === null || _b === void 0 ? void 0 : _b.value) || 'all';
    document.querySelectorAll('.order table tbody tr').forEach(function (row) {
        var _a, _b;
        var userElement = row.querySelector('td:nth-child(2) span');
        var statusElement = row.querySelector('td:nth-child(4) .status');
        if (userElement && statusElement) {
            var user = ((_a = userElement.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            var status_1 = ((_b = statusElement.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
            var matchesSearch = user.includes(searchText);
            var matchesStatus = statusFilter === 'all' || status_1 === statusFilter;
            if (matchesSearch && matchesStatus) {
                row.style.display = '';
            }
            else {
                row.style.display = 'none';
            }
        }
    });
}
