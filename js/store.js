const initialData = {
    users: [
        { id: "U1", name: "Yaswanth Kumar", email: "yaswanth@resourcex.com", role: "Requestor", department: "IT Services", status: "Active" },
        { id: "U2", name: "Sarah Jenkins", email: "sarah@resourcex.com", role: "Dept Head", department: "IT Services", status: "Active" },
        { id: "U3", name: "Dr. Eleanor Vance", email: "eleanor@resourcex.com", role: "Registrar", department: "Administration", status: "Active" },
        { id: "U4", name: "Mike Torres", email: "mike@resourcex.com", role: "Staff", department: "Operations", status: "Active" },
        { id: "U5", name: "System Root", email: "admin@resourcex.com", role: "System Admin", department: "Administration", status: "Active" }
    ],
    departments: [
        { id: "D1", name: "IT Services", head: "Sarah Jenkins", memberCount: 15 },
        { id: "D2", name: "HR Dept", head: "John Doe", memberCount: 8 },
        { id: "D3", name: "Operations", head: "Jane Smith", memberCount: 20 },
        { id: "D4", name: "Administration", head: "Dr. Eleanor Vance", memberCount: 5 }
    ],
    requests: [
        { id: "REQ-88219", resourceType: "High-Cap Battery", quantity: 12, requestor: "Yaswanth Kumar", department: "IT Services", status: "Allocated", priority: "Normal", date: "Oct 24, 2023", justification: "Restocking for field ops" },
        { id: "REQ-88220", resourceType: "Server Blades v2", quantity: 4, requestor: "Yaswanth Kumar", department: "IT Services", status: "Pending", priority: "High", date: "Oct 25, 2023", justification: "Server upgrade capacity" },
        { id: "REQ-88215", resourceType: "Laptop Bundles", quantity: 15, requestor: "Alice Worker", department: "HR Dept", status: "Approved", priority: "Normal", date: "Oct 22, 2023", justification: "New hires onboarding" }
    ],
    resources: [
        { id: "RES-1049", name: "Laptop - Dell XPS", type: "Laptop", department: "IT Services", serialNumber: "SN-998822", status: "Allocated", condition: "Good", assignedTo: "Yaswanth Kumar", date: "Jan 12, 2023" },
        { id: "RES-2933", name: "Projector X1", type: "Electronics", department: "HR Dept", serialNumber: "SN-112233", status: "Maintenance", condition: "Fair", assignedTo: "None", date: "Feb 05, 2023" },
        { id: "RES-3344", name: "Wireless Mouse", type: "Accessories", department: "IT Services", serialNumber: "SN-445566", status: "Available", condition: "New", assignedTo: "None", date: "Mar 10, 2023" },
    ],
    procurements: [
        { id: "PROC-819", resourceType: "Server Blades v2", quantity: 10, department: "IT Services", requestedBy: "Sarah Jenkins", status: "Pending", date: "Oct 26, 2023", justification: "Capacity increase required." },
        { id: "PROC-901", resourceType: "Microscope Sets", quantity: 5, department: "Operations", requestedBy: "Jane Smith", status: "Approved", date: "Oct 21, 2023", justification: "Lab equipment upgrade." }
    ],
    notifications: [
        { id: "N1", title: "Welcome to ResourceX", description: "Your account has been created.", time: "1 day ago", read: false, recipientRole: "All" }
    ],
    currentUser: null
};

class DataStore {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (!localStorage.getItem('rx_initialized')) {
            this.resetToDefaults();
            localStorage.setItem('rx_initialized', 'true');
        }
    }

    resetToDefaults() {
        localStorage.setItem('rx_data', JSON.stringify(initialData));
    }

    getData() {
        return JSON.parse(localStorage.getItem('rx_data')) || initialData;
    }

    saveData(data) {
        localStorage.setItem('rx_data', JSON.stringify(data));
    }

    // Auth
    login(email, password) {
        const data = this.getData();
        const user = data.users.find(u => u.email === email);
        if (user) {
            data.currentUser = user;
            this.saveData(data);
            return user;
        }
        return null;
    }

    logout() {
        const data = this.getData();
        data.currentUser = null;
        this.saveData(data);
    }

    getCurrentUser() {
        return this.getData().currentUser;
    }

    // CRUD Helper
    addItem(collection, item) {
        const data = this.getData();
        data[collection].unshift(item); // Add to beginning
        this.saveData(data);
        return item;
    }

    updateItem(collection, id, updates) {
        const data = this.getData();
        const index = data[collection].findIndex(i => i.id === id);
        if (index > -1) {
            data[collection][index] = { ...data[collection][index], ...updates };
            this.saveData(data);
            return data[collection][index];
        }
        return null;
    }

    deleteItem(collection, id) {
        const data = this.getData();
        data[collection] = data[collection].filter(i => i.id !== id);
        this.saveData(data);
    }
}

// Instantiate global store
const Store = new DataStore();
