import FirebaseKeys from "./config";
import firebase from 'firebase';


class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }

    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}.jpg`)

        return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error);
                })
        })
    }

    uploadPhotoAsync = async (uri,filename) => {
        //const path = `photos/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(filename).put(file);

            upload.on("state_changed", snapshot => { }, err => {
                rej(err);
            },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            )
        })
    }



    createUser = async user =>{
        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email,user.name);

            let db   = this.firestore.collection("users").doc(this.uid)

            db.set({
                user

            })


        }catch(error){
            alert("Please Fill Details",error);
        }
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
    get signout(){
        return firebase.auth().signOut();
    }
}

Fire.shared = new Fire();
export default Fire;