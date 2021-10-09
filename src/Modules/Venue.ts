import { Maybe } from "monet";
import { Order } from "../Components/Order/Helper/Order";
import { Category, Item, Mixer, SubCategory } from "../Components/Order/Item";
import db from "../Firebase/firebase";
import { Dinero } from "./Dinero";
import { fetchVenue, fetchItems, fetchCategories, fetchSubCategories, fetchMixers, fetchOrders, extractDocumentData, extractCollectionData } from "./Firebase";


const { Just, Nothing } = Maybe;

export interface Venue {
    id: string,
    name: string,
    users: string[],
    items: Item[],
    orders: Order[],
    categories: Category[],
    subCategories: SubCategory[],
    mixers: Mixer[],
}

export async function VenueListener(onChange: (venue: Venue) => void, venueId: string = 'CHckEyzlb47VvyzpnCCw') {
    db.collection("venues").doc(venueId)
        .onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
        }, async () => {
            await buildVenue(venueId).then((v) => {
                if (v) onChange(v)
            })
        });
}

async function buildVenue(venueId: string = 'CHckEyzlb47VvyzpnCCw') {
    const venuePromise = fetchVenue(venueId)
    const itemsPromise = fetchItems(venueId)
    const categoriesPromise = fetchCategories(venueId)
    const subCategoriesPromise = fetchSubCategories(venueId)
    const mixersPromise = fetchMixers(venueId)
    const ordersPromise = fetchOrders(venueId)

    const result = await Promise.all([
        venuePromise,
        itemsPromise,
        categoriesPromise,
        subCategoriesPromise,
        mixersPromise,
        ordersPromise
    ]).then((data => {

        const [
            venueDoc,
            itemsCollection,
            categoriesCollection,
            subCategoriesCollection,
            mixersCollection,
            ordersCollection
        ] = data;

        const [venueData, venueId] = extractDocumentData('venue', venueDoc)
        return venueData.map(venue => {
            const items = formatItems(extractCollectionData(itemsCollection).getOrElse([]))
            const categories = extractCollectionData(categoriesCollection).getOrElse([])
            const subCategories = extractCollectionData(subCategoriesCollection).getOrElse([])
            const mixers = formatMixers(extractCollectionData(mixersCollection).getOrElse([]))
            const orders = extractCollectionData(ordersCollection).getOrElse([])

            const venueObj: Venue = {
                id: venueId,
                name: venue.name,
                users: [],
                items,
                categories,
                subCategories,
                mixers,
                orders,
            }
            return venueObj
        }).orNull()

        // set state and storage
    })).catch(err => {
        console.log('Error:', err);
        return null
    })

    return result;
}

function formatItems(items: Item[]) {
    const result = items.reduce((arr, item) => {
        const amount = item.price as any as number
        const newItem = {
            ...item, price: Dinero({ amount })
        }
        arr.push(newItem)
        return arr
    }, [] as Item[]);

    return result
}

function formatMixers(mixers: Mixer[]) {
    const result = mixers.reduce((arr, mixer) => {
        const amount = mixer.price as any as number
        const newMixer = {
            ...mixer, price: Dinero({ amount })
        }
        arr.push(newMixer)
        return arr
    }, [] as Mixer[]);

    return result
}

export { buildVenue }