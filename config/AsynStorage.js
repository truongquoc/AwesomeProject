import AsyncStorage from '@react-native-async-storage/async-storage';


export class BlockingQueueWithAsyncStorage {
    constructor(storageKey) {
        console.log("storageKey", storageKey);
        this.storageKey = storageKey;
        this.isProcessing = false;
    }


    saveItemToStorage(data) {
        AsyncStorage.setItem(`${this.storageKey}${new Date().getTime()}`, JSON.stringify(data))
        .catch(err => {
            console.error(`error saving data to ${this.storageKey} due to ${err}`);
        })
    }

    async processingItem() {
        AsyncStorage.getAllKeys().then(async keys => {
        console.log(`there are remaining of ${keys.length} in storage key`);
        if (keys.length == 0) {
            this.isProcessing = false;
            return;
        }

        keys.filter(x => x.startsWith(`${this.storageKey}`)).forEach(key => {
            AsyncStorage.getItem(key).then(data => {
                // do something with data
                // then remove item from storage
                // console.log("data", data);
               this.isProcessing = true;
                setTimeout(() => {
                    AsyncStorage.removeItem(key);
                }, 2000);
            }).catch(err => {
                console.error(`error getting data from ${key} due to ${err}`);
            })
        });
    });
}

}