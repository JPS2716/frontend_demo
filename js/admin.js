const adminApp = {
    init: function() {
        const user = Store.getCurrentUser();
        if(!user || user.role !== 'System Admin') {
            window.location.href = 'login.html';
            return;
        }
        
        // Update UI
        document.querySelector('.user-name').textContent = user.name;
        document.querySelector('.user-role').textContent = 'Administrator';
        
        this.bindNav();
        this.renderUsers();
        this.renderDepartments();
    },

    bindNav: function() {
        const items = document.querySelectorAll('.nav-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('data-target');
                if (targetId) {
                    this.switchView(targetId);
                    items.forEach(i => i.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                }
            });
        });
    },

    switchView: function(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(viewId);
        if(targetSection) {
            targetSection.classList.add('active');
        }
    },

    // 1. User Management
    renderUsers: function() {
        const tbody = document.querySelector('#dash-users-tbody');
        if(!tbody) return;
        tbody.innerHTML = '';

        const db = Store.getData();
        const users = db.users;
        const depts = db.departments;

        // Calculate Stats
        const roles = new Set(users.map(u => u.role));
        
        const elUsers = document.getElementById('dash-admin-users');
        const elDepts = document.getElementById('dash-admin-depts');
        const elRoles = document.getElementById('dash-admin-roles');

        if(elUsers) elUsers.textContent = users.length;
        if(elDepts) elDepts.textContent = depts.length;
        if(elRoles) elRoles.textContent = roles.size;

        users.slice(0, 5).forEach(u => {
            let roleBadge = `<span class="badge" style="background:#cbd5e1; color:#0f172a">${u.role}</span>`;
            if (u.role === 'Dept Head') roleBadge = `<span class="badge pending" style="background:#dbeafe; color:#1d4ed8">${u.role}</span>`;
            else if (u.role === 'Staff') roleBadge = `<span class="badge pending">${u.role}</span>`;
            else if (u.role === 'System Admin') roleBadge = `<span class="badge" style="background:#fecaca; color:#b91c1c">${u.role}</span>`;
            else if (u.role === 'Registrar') roleBadge = `<span class="badge allocated" style="background:#fef08a; color:#854d0e">${u.role}</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600">${u.name} <div style="font-size:0.75rem; color:#64748b; font-weight:normal">${u.email}</div></td>
                <td>${roleBadge}</td>
                <td>${u.department}</td>
                <td><span class="badge allocated">${u.status}</span></td>
                <td style="text-align:right">
                    <button class="btn-secondary" style="font-size:0.75rem" onclick="adminApp.editUser('${u.id}')">Edit Access</button>
                    ${u.role !== 'System Admin' ? `<button class="btn-danger" style="font-size:0.75rem" onclick="adminApp.deleteUser('${u.id}')">Delete</button>` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    editUser: function(id) {
        const newRole = prompt("Enter new role (Requestor, Dept Head, Registrar, Staff, System Admin):");
        if (newRole && ['Requestor', 'Dept Head', 'Registrar', 'Staff', 'System Admin'].includes(newRole)) {
            Store.updateItem('users', id, { role: newRole });
            this.renderUsers();
            alert("Role updated temporarily.");
        }
    },

    deleteUser: function(id) {
        if(confirm("Are you sure you want to deactivate this user?")) {
            Store.updateItem('users', id, { status: "Inactive" });
            this.renderUsers();
        }
    },

    // 2. Department Config
    renderDepartments: function() {
        const container = document.querySelector('#dept-manage-view > div');
        if(!container) return;

        // Keep the "+ Add New Department" button
        container.innerHTML = '';
        
        const depts = Store.getData().departments;
        
        depts.forEach(d => {
            const div = document.createElement('div');
            div.style.cssText = "display:flex; justify-content:space-between; padding-bottom:1rem; border-bottom:1px solid #e2e8f0; margin-bottom:1rem;";
            div.innerHTML = `
                <div><strong style="font-size:1.1rem; color:var(--primary-color)">${d.name}</strong><div style="color:#64748b; font-size:0.875rem">Head: ${d.head} | Members: ${d.memberCount}</div></div>
                <button class="btn-danger" style="font-size:0.75rem" onclick="adminApp.deleteDept('${d.id}')">Delete</button>
            `;
            container.appendChild(div);
        });

        const btnDiv = document.createElement('div');
        btnDiv.style.marginTop = '1rem';
        btnDiv.innerHTML = `<button class="btn-primary" onclick="adminApp.addDept()">+ Add New Department</button>`;
        container.appendChild(btnDiv);
    },

    addDept: function() {
        const name = prompt("Department Name:");
        const head = prompt("Head Name:");
        if (name && head) {
            Store.addItem('departments', {
                id: `D${Math.floor(100 + Math.random() * 900)}`,
                name: name,
                head: head,
                memberCount: 0
            });
            this.renderDepartments();
        }
    },
    
    deleteDept: function(id) {
        if(confirm("Delete this department? Warning: affects users and resources.")) {
            Store.deleteItem('departments', id);
            this.renderDepartments();
        }
    },

    logout: function() {
        Store.logout();
        window.location.href = 'login.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    adminApp.init();
});
