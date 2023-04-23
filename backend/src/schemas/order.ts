import mongoose from "mongoose";

const Order = new mongoose.Schema({
    cart: {
        user: {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        phone: { type: String },
        rank: { type: Number },
        avatar: { type: String },
        roles: [{ type: String,
                  enum: ['Kupujący', 'Sprzedający', 'ADMIN', 'SYSTEM', 'Kurier']
        }],
        deliveryAddress: {
            street: { type: String },
            city: { type: String },
            zipCode: { type: String },
            state: { type: String },
            countryCode: { type: String },
            coordinates: {
                "lat": { type: Number },
                "lon": { type: Number }
            }
        },
        paymentAddress: {
            street: { type: String },
            city: { type: String },
            zipCode: { type: String },
            state: { type: String },
            countryCode: { type: String },
            coordinates: {
                "lat": { type: Number },
                "lon": { type: Number }
            }
        },
        companies: [{
            name: { type: String },
            NIP: { type: String },
            address: {
                street: { type: String },
                city: { type: String },
                zipCode: { type: String },
                state: { type: String },
                countryCode: { type: String },
                coordinates: {
                    "lat": { type: Number },
                    "lon": { type: Number }
                }
            },
            IBAN: { type: String },
            paymentDate: { type: Number },
            VAT: { type: String },
            email: { type: String },
            phone: { type: String },
            workingHourMin: { type: Number },
            workingHourMax: { type: Number }
        }]
    },
        offers: [{
            offer: {
                product: {
                    name: { type: String },
                    material: { type: String,
                                enum:  [ 'Metal', 'Plastik', 'Drewno', 'Tektura' ]
                    },
                    condition: { type: String,
                                 enum:  [ 'Nowe', 'Używane 1 gatunku', 'Używane 2 gatunku', 'Używane 3 gatunku', 'Uszkodzone']
                    },
                    description: { type: String },
                    image1: { type: String },
                    image2: { type: String },
                    shortName: { type: String },
                    length: { type: String },
                    width: { type: String },
                    height: { type: String },
                    maxLoad: { type: String },
                    category: {
                        name: { type: String },
                        description: { type: String },
                        image: { type: String },
                        shortName: { type: String }
                    }
                },
                seller: {
                    name: { type: String },
                    email: { type: String },
                    password: { type: String },
                    phone: { type: String },
                    rank: { type: Number },
                    avatar: { type: String },
                    roles: [{ type: String,
                              enum: ['Kupujący', 'Sprzedający', 'ADMIN', 'SYSTEM', 'Kurier']
                    }],
                    deliveryAddress: {
                        street: { type: String },
                        city: { type: String },
                        zipCode: { type: String },
                        state: { type: String },
                        countryCode: { type: String },
                        coordinates: {
                            "lat": { type: Number },
                            "lon": { type: Number }
                        }
                    },
                    paymentAddress: {
                        street: { type: String },
                        city: { type: String },
                        zipCode: { type: String },
                        state: { type: String },
                        countryCode: { type: String },
                        coordinates: {
                            "lat": { type: Number },
                            "lon": { type: Number }
                        }
                    },
                    companies: [{
                        name: { type: String },
                        NIP: { type: String },
                        address: {
                            street: { type: String },
                            city: { type: String },
                            zipCode: { type: String },
                            state: { type: String },
                            countryCode: { type: String },
                            coordinates: {
                                "lat": { type: Number },
                                "lon": { type: Number }
                            }
                        },
                        IBAN: { type: String },
                        paymentDate: { type: Number },
                        VAT: { type: String },
                        email: { type: String },
                        phone: { type: String },
                        workingHourMin: { type: Number },
                        workingHourMax: { type: Number }
                    }]
                },
                company: {
                    name: { type: String },
                    NIP: { type: String },
                    address: {
                        street: { type: String },
                        city: { type: String },
                        zipCode: { type: String },
                        state: { type: String },
                        countryCode: { type: String },
                        coordinates: {
                            "lat": { type: Number },
                            "lon": { type: Number }
                        }
                    },
                    IBAN: { type: String },
                    paymentDate: { type: Number },
                    VAT: { type: String },
                    email: { type: String },
                    phone: { type: String },
                    workingHourMin: { type: Number },
                    workingHourMax: { type: Number },
                },
                price: { type: Number },
                quantityMin: { type: Number },
                quantityMax: { type: Number },
                delivery: [{
                    deliveryType: { type: String,
                                        enum: [ 'Odbiór osobisty', 'Dostawa busem', 'Dostawa ciężarówką (TIR)', 'Dostawa kurierska' ]
                    },
                    deliveryTimeMin: { type: Number },
                    deliveryTimeMax: { type: Number },
                    deliveryPrice: { type: Number }
                }],
                image1: { type: String },
                image2: { type: String },
                description: { type: String },
                offerStatus: { type: String,
                               enum:  [ 'Aktywna', 'Na moderacji', 'Zakończone' ]
                },
                rating: { type: Number },
                isTop: { type: Boolean }
            },
            quantity: { type: Number },
            delivery: {
                deliveryType: { type: String,
                                    enum:  [ 'Odbiór osobisty', 'Dostawa busem', 'Dostawa ciężarówką (TIR)', 'Dostawa kurierska' ]
                },
                deliveryTimeMin: { type: Number },
                deliveryTimeMax: { type: Number },
                deliveryPrice: { type: Number }
            }
        }],
    },
    status: { type: String,
              enum: [ 'Utworzone', 'Moderacja', 'Oczekujące', 'Przyjęte', 'Wyslane', 'Dostarczone', 'Zwrócone', 'Zamknięte' ]
    },
    payment: { type: String,
               enum: [ 'Gotówka', 'Na fakturę', 'Płatność kartą' ]
    },
    paymentStatus: { type: Boolean }
});

export default mongoose.model('Order', Order);
