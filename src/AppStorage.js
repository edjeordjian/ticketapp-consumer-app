import AsyncStorage from '@react-native-async-storage/async-storage';

class AppStorage {
    async isLoggedIn(){
        return await this.retrieveData('token');
    }

    storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log(error);
        }
    };

    retrieveData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.log(error);
      }
    };

    clear_data = async () => {
        console.log("Clearing Persistent Storage");
        return await AsyncStorage.clear();
    }
}

export default new AppStorage();