function clone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }

    let newObj = {};
    if (obj instanceof Array) {
        for (i in obj) {
            newObj[i] = clone(obj[i]);
        }
    }
     else {
        for (i in obj) {
            newObj[i] = clone(obj[i]);
        }
    }
    return newObj;
}