// Function to save game data to the cloud
export async function saveGameToCloud(userId, saveData) {
    try {
        const db = firebase.firestore(); 
        if (!userId) {
            console.error("No user ID provided for saving.");
            return;
        }
        const userDocRef = db.collection('users').doc(userId);
        await userDocRef.set({ gameData: saveData });
        console.log("Game saved to cloud successfully!");
    } catch (error) {
        console.error("Error saving game to cloud:", error);
    }
}

// Function to load game data from the cloud
export async function loadGameFromCloud(userId) {
    try {
        const db = firebase.firestore();
        if (!userId) {
            console.error("No user ID provided for loading.");
            return null;
        }
        const userDocRef = db.collection('users').doc(userId);
        const docSnap = await userDocRef.get();

        if (docSnap.exists()) { 
            console.log("Save data found in cloud!");
            return docSnap.data().gameData;
        } else {
            console.log("No save data found for this user. A new game will be created.");
            return null;
        }
    } catch (error) {
        console.error("Error loading game from cloud:", error);
        return null;
    }
}
