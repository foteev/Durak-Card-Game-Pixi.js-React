import Offer from '../schemas/offer.js';

class OfferService {
    async create(offer: any) {
        const newOffer = await Offer.create(offer);
        return newOffer;
    };

    async get(id: string) {
        const offer = await Offer.findById(id);
        return offer;
    };

    async update(id: string, offer: any) {
        const updatedOffer = await Offer.findByIdAndUpdate(id, offer, { new: true });
        return updatedOffer;
    };

    async delete(id: string) {
        const deletedOffer = await Offer.findByIdAndDelete(id);
        return deletedOffer;
    };

    async sortByStatus(offerStatus: string) {
        const offers = await Offer.find({'offerStatus': `${offerStatus}`});
        return offers;
    };

    async sortByUser(userEmail: string) {
        const offers = await Offer.find({'seller.email': `${userEmail}`});
        return offers;
    };
}

export default new OfferService();