/*

    options:
        items : [
            {
                selector: '.container',
                images: ['image1', 'image2']
            },
            ...
        ]
*/

if(window.Promise && !window.Promise.defer) {
    (() => {
        var defer = () => {
            var resolve,
                reject,
                promise = new Promise((res, rej) => {
                   resolve = res;
                   reject = rej; 
                });
            return {
                resolve: resolve,
                reject: reject,
                promise: promise
            }
        }

        Promise.defer = defer;
    })();
};

(() => {
    var ImagePreloader = {};

    var items = [];

    ImagePreloader.init = (options) => {
        options.items.forEach((entry) => {
            ImagePreloader.addBlock(entry)
            .then(() => {
                console.log('Block loaded');
            });
        });
    };

    ImagePreloader.addBlock = (entry) => {
        let d = Promise.defer();

        items.push({
            collection: entry.images.slice(),
            deferred: d
        });
        return d.promise;
    };

    ImagePreloader.loadImage = (path) => {
        return new Promise((resolve, reject) => {
            var image = new Image();

            image.onload = resolve;
            //Don't brake the load chain
            image.onerror = resolve;
            image.src = path;
        });
    };

    ImagePreloader.start = () => {
        var image,
            images = [];
        items.forEach((item)=>{
            item.collection.forEach((img) => {
                //Replace image path to a Promise
                img = ImagePreloader.loadImage(img);
            });
        });

        items.forEach((item) => {
            image = Promise.all(item.collection)
            .then(() => {
                if(item.deferred.resolve)
                    item.deferred.resolve();
                else
                    console.log('Error: ', item);
            })
            .catch(console.log.bind(item, console));
            
            images.push(image);
        });

        return Promise.all(images);
    };

    if (typeof window === "object" && typeof window.document === "object") {
        window.ImagePreloader = ImagePreloader;
    }    
})();