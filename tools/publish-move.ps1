<#
Simple PowerShell helper to build & publish a Move package using Sui CLI.
Usage: from repository root
  pwsh .\tools\publish-move.ps1 -PackagePath "contracts/nft_marketplace"

Requires `sui` CLI in PATH and an unlocked key/wallet.
#>

param(
  [string]$PackagePath = "contracts/nft_marketplace",
  [int]$GasBudget = 100000000
)

if (-not (Get-Command sui -ErrorAction SilentlyContinue)) {
  Write-Error "sui CLI not found in PATH. Install and try again."; exit 1
}

Push-Location $PackagePath
try {
  Write-Host "Building Move package in $PackagePath..."
  & sui move build

  Write-Host "Publishing package (gasBudget=$GasBudget)..."
  $output = & sui client publish --path . --gas-budget $GasBudget 2>&1
  Write-Host $output

  # Attempt to extract package id from output
  $pkgLine = $output | Select-String -Pattern "package object id" -SimpleMatch -ErrorAction SilentlyContinue
  if (-not $pkgLine) {
    # try alternate pattern
    $pkgLine = $output | Select-String -Pattern "package id" -SimpleMatch -ErrorAction SilentlyContinue
  }
  if ($pkgLine) {
    $line = $pkgLine.ToString()
    $match = [regex]::Match($line, "0x[0-9a-fA-F]+")
    if ($match.Success) {
      $pkg = $match.Value
      Write-Host "Detected package id: $pkg"
      Write-Host "Update SuiNFT/.env.local or SuiNFT/src/utils/sui-constants.js with this package id:"
      Write-Host "VITE_NFT_MARKETPLACE_PACKAGE_ID=$pkg"
    }
  } else {
    Write-Warning "Could not auto-detect package id. Inspect publish output above to find package id."
  }
} finally {
  Pop-Location
}
