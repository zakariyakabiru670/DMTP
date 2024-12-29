;; Computation Token Contract

(define-fungible-token computation-token)

(define-constant contract-owner tx-sender)

(define-data-var token-uri (string-utf8 256) u"")

(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ft-mint? computation-token amount recipient)
  )
)

(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (ft-transfer? computation-token amount sender recipient)
  )
)

(define-public (burn (amount uint) (owner principal))
  (begin
    (asserts! (is-eq tx-sender owner) (err u403))
    (ft-burn? computation-token amount owner)
  )
)

(define-read-only (get-balance (account principal))
  (ok (ft-get-balance computation-token account))
)

(define-public (set-token-uri (new-uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ok (var-set token-uri new-uri))
  )
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

