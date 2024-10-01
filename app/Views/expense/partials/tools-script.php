<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('toolExport', () => ({

        accounts: '',
        categories: '',
        transactions: '',

        exportData() {
            this.accounts = localStorage.getItem('gpc-expense-accounts');
            this.categories = localStorage.getItem('gpc-expense-categories');
            this.transactions = localStorage.getItem('gpc-expense-transactions');
        }
    })); // Alpine.data
}); // alpine:init

document.addEventListener('alpine:init', () => {
    Alpine.data('toolImport', () => ({

        accounts: '',
        categories: '',
        transactions: '',
        isDone: false,

        tryParseJSONObject (jsonString){
            try {
                var o = JSON.parse(jsonString);

                // Handle non-exception-throwing cases:
                // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                // but... JSON.parse(null) returns null, and typeof null === "object",
                // so we must check for that, too. Thankfully, null is falsey, so this suffices:
                if (o && typeof o === "object") {
                    return o;
                }
            }
            catch (e) { }

            return false;
        },

        importData() {
            let accounts = this.tryParseJSONObject(this.accounts);
            if (accounts) {
                localStorage.setItem('gpc-expense-accounts', this.accounts);
            }

            let categories = this.tryParseJSONObject(this.categories);
            if (categories) {
                localStorage.setItem('gpc-expense-categories', this.categories);
            }

            let transactions = this.tryParseJSONObject(this.transactions);
            if ( transactions ) {
                localStorage.setItem('gpc-expense-transactions', this.transactions);
            }

            this.isDone = true;
        }
    })); // Alpine.data
}); // alpine:init

</script>