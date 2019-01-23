let STORAGE_KEY = 'results_key';
let resultStorage = {
    fetch: function () {
        let results = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        results.forEach((result, index) => {
            result.id = index;
        });
        resultStorage.uid = results.length;
        return results;
    },
    save: function (results) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }
};

function isNotNumericValue(value) {
    return isNaN(value) || !isFinite(value);
}

const calc = new Vue({
    el: '#app',
    data: { x: '', y: '', result: '', results: resultStorage.fetch(), },
    watch: { // !WATCH RIGHT AFTER DATA
        results: {
            handler(results) {
                resultStorage.save(results);
            },
            deep: true
        }
    },
    methods: {
        multiply: function () {
            let x = parseFloat(this.x);
            if (isNotNumericValue(x)) return this.result;
            let y = parseFloat(this.y);
            if (isNotNumericValue(y)) return this.result;
            
            res = x * y;
            this.result = res;
            this.results.push(res);
        },
        divide: function () {
            let x = parseFloat(this.x);
            if (isNotNumericValue(x)) return this.result;
            let y = parseFloat(this.y);
            if (isNotNumericValue(y)) return this.result;
            
            if (this.y != 0) res = x / y;
            else res = "Division by zero.";
            
            this.result = res;
            this.results.push(res);
        },
    }
});