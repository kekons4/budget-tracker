let db;
let budgetVersion;

const request = indexedDB.open('BudgetDB', budgetVersion || 21);

request.onupgradeneeded = e => {
    console.log('Upgrade neede in IndexDB.');

    const { oldVersion } = e;
    const newVersion = e.newVersion || db.version;

    console.log(`DB has been updated from version ${oldVersion} to ${newVersion}`);

    db = e.target.result;

    if(db.objectStoresNames.length === 0) {
        db.createObjectStore('BudgetStore', { autoIncrement: true });
    }
};

request.onerror = e => {
    console.log(`ERROR ${e.target.errorCode}`);
};

const checkDatabase = () => {
    
    let transaction = db.transaction(['BudgetStore'], 'readwrite');

    const store = transaction.objectStore('BudgetStore');

    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if(getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                response.json();
            })
            .then(res => {
                if(res.length !== 0) {
                    transaction = db.transaction(['BudgetStore'], 'readwrite');
                }
            })
        }
    };
};