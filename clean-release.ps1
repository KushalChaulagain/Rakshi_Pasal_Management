# Clean release directory before building
# This script removes all files from the release directory except .gitkeep

$releaseDir = "release"

Write-Host "Cleaning release directory..." -ForegroundColor Cyan

if (Test-Path $releaseDir) {
    try {
        Get-ChildItem -Path $releaseDir -Exclude ".gitkeep" | Remove-Item -Recurse -Force -ErrorAction Stop
        Write-Host "Release directory cleaned successfully." -ForegroundColor Green
    }
    catch {
        Write-Host "Warning: Could not clean some files. This is usually okay." -ForegroundColor Yellow
        Write-Host "Error details: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "Release directory does not exist yet. Skipping clean." -ForegroundColor Yellow
}

exit 0

