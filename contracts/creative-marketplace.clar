;; Creative Marketplace Contract

(define-non-fungible-token creative-work uint)

(define-data-var last-work-id uint u0)

(define-map creative-works
  { work-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    description: (string-utf8 500),
    work-type: (string-ascii 20),
    price: uint,
    royalty-percentage: uint
  }
)

(define-public (create-work (title (string-ascii 100)) (description (string-utf8 500)) (work-type (string-ascii 20)) (price uint) (royalty-percentage uint))
  (let
    (
      (new-id (+ (var-get last-work-id) u1))
    )
    (asserts! (<= royalty-percentage u100) (err u400))
    (try! (nft-mint? creative-work new-id tx-sender))
    (map-set creative-works
      { work-id: new-id }
      {
        creator: tx-sender,
        title: title,
        description: description,
        work-type: work-type,
        price: price,
        royalty-percentage: royalty-percentage
      }
    )
    (var-set last-work-id new-id)
    (ok new-id)
  )
)

(define-public (purchase-work (work-id uint))
  (let
    (
      (work (unwrap! (map-get? creative-works { work-id: work-id }) (err u404)))
      (owner (unwrap! (nft-get-owner? creative-work work-id) (err u404)))
    )
    (try! (stx-transfer? (get price work) tx-sender owner))
    (try! (nft-transfer? creative-work work-id owner tx-sender))
    (ok true)
  )
)

(define-read-only (get-work (work-id uint))
  (ok (map-get? creative-works { work-id: work-id }))
)

(define-read-only (get-work-owner (work-id uint))
  (ok (nft-get-owner? creative-work work-id))
)

