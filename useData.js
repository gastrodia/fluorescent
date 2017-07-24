class RestClient {
    constructor(apiRoot) {
        this.apiRoot = apiRoot;
        this.apiRoot = apiRoot;
    }
    getXHR() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        return xhr;
    }
    get(url, callback) {
        var xhr = this.getXHR();
        xhr.open("GET", this.apiRoot + url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                var data = JSON.parse(xhr.responseText);
                data['test'] = 11111111111111111111111;
                callback(data);
            }
        };
        xhr.send();
    }
    post(url, obj, callback) {
        var xhr = this.getXHR();
        xhr.open("POST", this.apiRoot + url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
        };
        xhr.send(JSON.stringify(obj));
    }
    put(url, obj, callback) {
        var xhr = this.getXHR();
        xhr.open("PUT", this.apiRoot + url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
        };
        xhr.send(JSON.stringify(obj));
    }
    delete(url, callback) {
        var xhr = this.getXHR();
        xhr.open("DELETE", this.apiRoot + url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
        };
        xhr.send();
    }
};

var config = {
    serverApiRoot: 'http://localhost:3010/api/'
}

function fetchCategoryPosts(category, callback) {
    var client = new RestClient(config.serverApiRoot)
    client.get('posts?categories=' + category._id, (res) => {
        callback(res.map((item) => {
            item._id = '55555555555555';
           return {
                _id: item._id,
                title: item.title,
                imgSrc: "/images/index-list-img.png"
            }
        }))
    })
};

var client = new RestClient(config.serverApiRoot)

client.get('categories', function (res) {
    var categories = res;
    categories.map((category) => {
        switch (category.name) {
            case '前期准备':
                fetchCategoryPosts(category, (data) => {
                    console.log(data)
                    if(data[0] && data[0].imgSrc){
                        console.log(data[0].imgSrc)
                        data[0].imgSrc = "老毕二哥"
                    }
                });
                break;
            case '装修要点':
                fetchCategoryPosts(category, (data) => {
                    console.log(data)
                });
                break;
        }
    })
})
