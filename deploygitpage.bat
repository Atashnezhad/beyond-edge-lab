@echo off
REM Navigate to the project directory (if needed)
REM cd C:\Users\atash\beyond-edge-lab

REM Build the Angular app for production
ng build --base-href "https://atashnezhad.github.io/beyond-edge-lab/"

REM Deploy the app to the gh-pages branch
ngh --dir=dist/beyond-edge-lab

REM Output completion message
echo Deployment to GitHub Pages completed successfully!
pause
