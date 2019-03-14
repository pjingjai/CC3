function clone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Array) {
        let newArr = [];
        for (i in obj) {
            newArr[i] = clone(obj[i]);
        }
        return newArr;
    }
     else {
        let newObj = {};
        for (i in obj) {
            newObj[i] = clone(obj[i]);
        }
        return newObj;
    }
}