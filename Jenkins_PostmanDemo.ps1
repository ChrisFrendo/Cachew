#Windows Batch Command in Jenkins
#powershell.exe -executionpolicy bypass -command "& '%WORKSPACE%\Jenkins_PostmanDemo.ps1'"

echo "You are in the powershell script now..."

newman run .\Cachew.postman_collection.json


exit $LASTEXITCODE