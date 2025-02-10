# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "../public/images/properties"
New-Item -ItemType Directory -Force -Path "../public/images/projects"
New-Item -ItemType Directory -Force -Path "../public/images/about"
New-Item -ItemType Directory -Force -Path "../public/images/partners"

# Sample image URLs (replace with actual image URLs)
$imageUrls = @{
    "../public/images/properties/property1.jpg" = "https://example.com/property1.jpg"
    "../public/images/properties/property2.jpg" = "https://example.com/property2.jpg"
    "../public/images/properties/property3.jpg" = "https://example.com/property3.jpg"
    "../public/images/projects/tech-hub.jpg" = "https://example.com/tech-hub.jpg"
    "../public/images/projects/green-park.jpg" = "https://example.com/green-park.jpg"
    "../public/images/about/team.jpg" = "https://example.com/team.jpg"
    "../public/images/partners/maharashtra-gov.png" = "https://example.com/maharashtra-gov.png"
    "../public/images/partners/midc.png" = "https://example.com/midc.png"
    "../public/images/partners/bank-of-maharashtra.png" = "https://example.com/bank-of-maharashtra.png"
}

# Download images
foreach ($image in $imageUrls.GetEnumerator()) {
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $image.Key
}
