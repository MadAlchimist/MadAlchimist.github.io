<#
.SYNOPSIS
  Bereitet Fotos fuer die Website auf: verkleinern, EXIF/GPS entfernen, als JPEG speichern.

.EXAMPLE
  .\scripts\Optimize-Photos.ps1 -Source "Quelle_Infos_Fotos\Fotos\2026-05-26\PXL_x.jpg" -Dest assets\lernkurve\calmag
  .\scripts\Optimize-Photos.ps1 -Source "D:\Scans\2019" -Dest assets\archiv\2019 -MaxEdge 2400
#>
param(
  [Parameter(Mandatory)][string[]]$Source,   # Dateien und/oder Ordner
  [Parameter(Mandatory)][string]$Dest,       # Zielordner (wird angelegt)
  [int]$MaxEdge = 1600,                      # laengste Kante in px (Scans: 2400)
  [int]$Quality = 82,
  [switch]$Thumbs                            # zusaetzlich kleine Vorschaubilder (480 px) in <Dest>\thumbs
)
Add-Type -AssemblyName System.Drawing

$files = foreach ($s in $Source) {
  if (Test-Path $s -PathType Container) { Get-ChildItem $s -Recurse -File -Include *.jpg, *.jpeg, *.png }
  else { Get-Item $s }
}
New-Item -ItemType Directory -Force $Dest | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)

foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  try {
    # EXIF-Drehung einrechnen, weil sie mit den Metadaten verloren geht
    if ($img.PropertyIdList -contains 0x0112) {
      switch ($img.GetPropertyItem(0x0112).Value[0]) {
        3 { $img.RotateFlip('Rotate180FlipNone') }
        6 { $img.RotateFlip('Rotate90FlipNone') }
        8 { $img.RotateFlip('Rotate270FlipNone') }
      }
    }
    $scale = [math]::Min(1.0, $MaxEdge / [math]::Max($img.Width, $img.Height))
    $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
    $bmp = New-Object System.Drawing.Bitmap $w, $h      # frische Bitmap = keine EXIF-/GPS-Tags
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $out = Join-Path $Dest (([IO.Path]::GetFileNameWithoutExtension($f.Name)) + '.jpg')
    $bmp.Save($out, $codec, $params)
    $bmp.Dispose()
    '{0} -> {1} ({2}x{3}, {4} KB)' -f $f.Name, $out, $w, $h, [int]((Get-Item $out).Length / 1KB)

    if ($Thumbs) {
      $tdir = Join-Path $Dest 'thumbs'
      New-Item -ItemType Directory -Force $tdir | Out-Null
      $ts = [math]::Min(1.0, 480 / [math]::Max($img.Width, $img.Height))
      $tw = [int]($img.Width * $ts); $th = [int]($img.Height * $ts)
      $tb = New-Object System.Drawing.Bitmap $tw, $th
      $tg = [System.Drawing.Graphics]::FromImage($tb)
      $tg.InterpolationMode = 'HighQualityBicubic'
      $tg.DrawImage($img, 0, 0, $tw, $th)
      $tg.Dispose()
      $tb.Save((Join-Path $tdir ([IO.Path]::GetFileNameWithoutExtension($f.Name) + '.jpg')), $codec, $params)
      $tb.Dispose()
    }
  } finally { $img.Dispose() }
}
