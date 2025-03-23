@echo off
echo Building Angular application...

:: Build the Angular application and redirect output to a log file
ng build --configuration production > build.log 2>&1

:: Create the zip file using PowerShell (simpler command)
echo Creating zip file...
powershell Compress-Archive -Path "dist\beyond-edge-lab\*" -DestinationPath "beyond-edge-lab.zip" -Force

echo Build and zip completed!
echo Build logs can be found in build.log
echo Zip file created as: beyond-edge-lab.zip
pause 