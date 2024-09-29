function getParams() {
    const search = window.location.search.slice(1);

    const searchList = search.split("&");

    const params = {};

    for (let i = 0; i < searchList.length; i++) {
        const name = searchList[i].split("=")[0];
        const value = searchList[i].split("=")[1];
        params[name] = value
    };

    return params
};