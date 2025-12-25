module nft_marketplace::nft_marketplace {
    use sui::object;
    use sui::object::{ID, UID};
    use sui::tx_context;
    use sui::tx_context::{TxContext};
    use sui::transfer;
    use sui::coin::{Coin, value};
    use sui::sui::SUI;
    use sui::event;

    /// NFT object stored on-chain for this simple marketplace
    struct NFT has key, store {
        id: UID,
        name: vector<u8>,
        url: vector<u8>,
        owner: address,
        price: u64,
    }

    /// Events emitted for transparency
    struct NFTMinted has copy, drop, store {
        object_id: ID,
        creator: address,
        price: u64,
    }

    struct NFTListed has copy, drop, store {
        object_id: ID,
        owner: address,
        price: u64,
    }

    struct NFTSold has copy, drop, store {
        object_id: ID,
        seller: address,
        buyer: address,
        price: u64,
    }

    /// Mint a new NFT and emit `NFTMinted`
    public entry fun mint_nft(
        name: vector<u8>,
        url: vector<u8>,
        price: u64,
        ctx: &mut TxContext
    ) {
        let owner = tx_context::sender(ctx);
        let nft = NFT { id: object::new(ctx), name, url, owner, price };
        // capture object id before transferring (moving) the object
        let object_id = object::id(&nft);
        // transfer back to owner (object is created and placed under owner's address)
        transfer::public_transfer(nft, owner);
        event::emit<NFTMinted>(NFTMinted { object_id, creator: owner, price });
    }

    /// List NFT for sale (emit event). This sets the on-chain price and emits NFTListed.
    public entry fun list_nft(
        nft: &mut NFT,
        price: u64,
        ctx: &mut TxContext
    ) {
        let owner = tx_context::sender(ctx);
        // require the signer is the owner
        assert!(nft.owner == owner, 1);
        nft.price = price;
        event::emit<NFTListed>(NFTListed { object_id: object::id(nft), owner, price });
    }

    /// Buy NFT: buyer supplies a Coin<SUI> payment; payment is sent to seller and ownership updated.
    public entry fun buy_nft(
        nft: &mut NFT,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        let price = nft.price;
        let seller = nft.owner;
        assert!(price > 0, 2);
        assert!(value(&payment) >= price, 3);
        // transfer payment coin to seller address
        transfer::public_transfer(payment, seller);
        // transfer ownership on the NFT object
        nft.owner = buyer;
        event::emit<NFTSold>(NFTSold { object_id: object::id(nft), seller, buyer, price });
    }

}
