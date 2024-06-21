import * as storage from "expo-secure-store"

export const storeValue = async(key: string, value: string) =>{
    storage.setItemAsync(key, value)
}


export const getValue = async(key: string) => {
    let result = await storage.getItemAsync(key);
    if (result) {
       return result
    } else {
        return "/onboardOne"
    }
}

export const getValueAuth = async(key: string) => {
    let result = await storage.getItemAsync(key);
    if (result) {
       return result
    } else {
        return ""
    }
}