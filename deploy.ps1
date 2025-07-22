Write-Host "Introduce el mensaje de commit:"
$message = Read-Host

git add .
git commit -m "$message"
git push origin main
npm run deploy
