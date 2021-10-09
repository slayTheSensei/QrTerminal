import firebase from 'firebase'
import db from '../Firebase/firebase';
import { Maybe } from 'monet';
import { Order } from '../Components/Order/Helper/Order';
import { Category, CategoryType, Item, ItemType, Mixer, SubCategory } from '../Components/Order/Item';
import { Venue } from './Venue';
import { v4 } from 'uuid';

const { Just, Nothing } = Maybe

interface CategoryDoc {
    name: string;
    type: CategoryType
}
interface SubCategoryDoc {
    name: string;
    categoryId: string
}

interface ItemDoc {
    name: string;
    subCategoryId: string;
    price: number;
    type: ItemType
}

interface MixerDoc {
    name: string;
    price: number;
}

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    publicKey: string
}


export type FirebaseDataType = 'venue' | 'items' | 'categories' | 'subCategories' | 'mixers' | 'orders'

export type FirestoreData<T> = firebase.firestore.DocumentSnapshot<T>
export type VenueData = FirestoreData<Venue>

export type FirestoreCollectionData<T> = firebase.firestore.QuerySnapshot<T>
export type ItemCollectionData = FirestoreCollectionData<Item>

export const fetchVenue = (venueId: string) => {
    var docRef = db.collection("venues").doc(venueId);
    return docRef.get() as Promise<VenueData> // can we make this implicit?
}

export const fetchUser = async (publicKey: string): Promise<User> => {
    const user = await db.collection("users").where('publicKey', '==', publicKey).get().then(snapshot => snapshot.docs[0])
    return user.data() as User
}

export const fetchItems = (venueId: string) => {
    return db.collection("venues").doc(venueId).collection('items').get() as Promise<FirestoreCollectionData<Item>>
}

export const fetchCategories = (venueId: string) => {
    return db.collection("venues").doc(venueId).collection('categories').get() as Promise<FirestoreCollectionData<Category>>
}

export const fetchSubCategories = (venueId: string) => {
    return db.collection("venues").doc(venueId).collection('subCategories').get() as Promise<FirestoreCollectionData<SubCategory>>
}

export const fetchMixers = (venueId: string) => {
    return db.collection("venues").doc(venueId).collection('mixers').get() as Promise<FirestoreCollectionData<Mixer>>
}

export const fetchOrders = (venueId: string) => {
    return db.collection("venues").doc(venueId).collection('orders').get() as Promise<FirestoreCollectionData<Order>>
}

export const setCategory = (category: Category, venueId: string = 'CHckEyzlb47VvyzpnCCw',) => {
    const doc: CategoryDoc = { name: category.name, type: category.type }

    db.collection("venues").doc(venueId).collection('categories').doc(category.id).set(doc)
        .then(() => {
            console.log("Document successfully written!");
            refreshData(venueId)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export const setSubCategory = (category: SubCategory, venueId: string = 'CHckEyzlb47VvyzpnCCw') => {
    const doc: SubCategoryDoc = { name: category.name, categoryId: category.categoryId }

    db.collection("venues").doc(venueId).collection('subCategories').doc(category.id).set(doc)
        .then(() => {
            console.log("Document successfully written!");
            refreshData(venueId)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export const setItem = (item: Item, venueId: string = 'CHckEyzlb47VvyzpnCCw') => {
    const doc: ItemDoc = { name: item.name, subCategoryId: item.subCategoryId, price: item.price.toObject().amount, type: item.type }

    db.collection("venues").doc(venueId).collection('items').doc(item.id).set(doc)
        .then(() => {
            console.log("Document successfully written!");
            refreshData(venueId)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export const setMixer = (mixer: Mixer, venueId: string = 'CHckEyzlb47VvyzpnCCw') => {
    const doc: MixerDoc = { name: mixer.name, price: mixer.price.toObject().amount }

    db.collection("venues").doc(venueId).collection('mixers').doc(mixer.id).set(doc)
        .then(() => {
            console.log("Document successfully written!");
            refreshData(venueId)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export const refreshData = (venueId: string) => {

    db.collection("venues").doc(venueId).update({ change: v4() })
        .then(() => {
            console.log("Data Refreshed");
        })
        .catch((error) => {
            console.error("Error Refreshing Data", error);
        });
}


export function extractDocumentData<T>(type: FirebaseDataType, doc: FirestoreData<T>): [Maybe<T>, string] {
    if (!doc.exists) {
        console.log(`${type} does not exist`);
        return [Nothing(), '']
    }
    const data = doc.data()

    if (!data) {
        console.log(`Could not find ${type}: ${doc.id}'s data`);
        return [Nothing(), doc.id]
    }

    return [Just(data as T), doc.id]
}

export function extractCollectionData<T>(snapshot: FirestoreCollectionData<T>): Maybe<T[]> {
    const result = snapshot.docs.reduce((arr, doc) => {
        const data = doc.data() as any
        data.id = doc.id
        arr.push(data)
        return arr
    }, [] as T[]);

    return Just(result)
}
