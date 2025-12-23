module nft_nexus::nft_nexus {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// An NFT that represents a digital asset in the Nexus AI Marketplace
    public struct NexusNFT has key, store {
        id: UID,
        name: string::String,
        description: string::String,
        url: Url,
        ai_score: u64,
    }

    // ===== Events =====

    public struct NFTMinted has copy, drop {
        object_id: ID,
        creator: address,
        name: string::String,
    }

    // ===== Public view functions =====

    public fun name(nft: &NexusNFT): &string::String {
        &nft.name
    }

    public fun description(nft: &NexusNFT): &string::String {
        &nft.description
    }

    public fun url(nft: &NexusNFT): &Url {
        &nft.url
    }

    public fun ai_score(nft: &NexusNFT): u64 {
        nft.ai_score
    }

    // ===== Entrypoints =====

    /// Create a new NexusNFT
    public entry fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ai_score: u64,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let nft = NexusNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            ai_score,
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
        });

        transfer::public_transfer(nft, sender);
    }

    /// Transfer an NFT to a new recipient
    public entry fun transfer(
        nft: NexusNFT,
        recipient: address,
        _: &mut TxContext
    ) {
        transfer::public_transfer(nft, recipient)
    }

    /// Permanently delete an NFT
    public entry fun burn(nft: NexusNFT, _: &mut TxContext) {
        let NexusNFT { id, name: _, description: _, url: _, ai_score: _ } = nft;
        object::delete(id)
    }
}
